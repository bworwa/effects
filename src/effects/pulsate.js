/*global effects */

effects.effects.pulsate = function (element, times, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var elementComputedStyle   = window.getComputedStyle(element),
        initialAnimation       = elementComputedStyle.animation ||
                                 elementComputedStyle.webkitAnimation ||
                                 elementComputedStyle.mozAnimation ||
                                 elementComputedStyle.msAnimation ||
                                 elementComputedStyle.oAnimation ||
                                 'initial',
        initialOpacity         = elementComputedStyle.opacity || 1,
        keyframes              = ' pulsate { from { opacity: 0; } to { opacity: ' + initialOpacity + '; } } ',
        head                   = document.head || document.getElementsByTagName('head')[0],
        style                  = document.createElement('style'),
        css                    = document.createTextNode(''),
        terminate              = function () {
            effects.css.prefixes.common.forEach(function (prefix) {
                var animationSuffix = (!prefix) ? 'animation' : 'Animation',
                    animationEndSuffix = (!prefix) ? 'animationend' : 'AnimationEnd';

                element.style[prefix + animationSuffix] = initialAnimation;
                element.removeEventListener(prefix + animationEndSuffix, terminate, false);
            });
            head.removeChild(style);
            callbackFunction();
        },
        animation,
        animationSuffix,
        animationEndSuffix;

    effects.css.prefixes.keyframes.forEach(function (prefix) {
        css.textContent += (prefix + 'keyframes' + keyframes);
    });

    style.appendChild(css);
    head.appendChild(style);

    times = parseInt(times, 10) || 3;
    duration = parseFloat(duration) || 0.5;

    animation = 'pulsate ' + duration + 's ease-in-out 0s ' + times;

    // TODO: avoid code redundancy (terminate function)
    effects.css.prefixes.common.forEach(function (prefix) {
        animationSuffix = (!prefix) ? 'animation' : 'Animation';
        animationEndSuffix = (!prefix) ? 'animationend' : 'AnimationEnd';

        element.style[prefix + animationSuffix] = animation;
        element.addEventListener(prefix + animationEndSuffix, terminate, false);
    });
};
