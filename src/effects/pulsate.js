/*global effects */

effects.effects.pulsate = function (element, times, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    if (typeof times === 'function') {
        callbackFunction = times;
        times = duration = undefined;
    }

    if (typeof duration === 'function') {
        callbackFunction = duration;
        duration = undefined;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var keyframes     = ' pulsate { from { opacity: 0; } to { opacity: ; } } ',
        documentHead  = document.head || document.getElementsByTagName('head')[0],
        style         = document.createElement('style'),
        css           = document.createTextNode(''),
        terminate     = function () {
            effects.css.prefixes.common.forEach(function (prefix) {
                element.style[prefix + ((!prefix) ? 'animation' : 'Animation')] = '';
                element.removeEventListener(prefix + ((!prefix) ? 'animationend' : 'AnimationEnd'), terminate, false);
            });

            documentHead.removeChild(style);
            callbackFunction();
        },
        animation;

    times = parseInt(times, 10) || 3;
    duration = parseFloat(duration) || 0.25;
    animation = 'pulsate ' + duration + 's linear 0s ' + times;

    effects.css.prefixes.keyframes.forEach(function (prefix) {
        css.textContent += (prefix + 'keyframes' + keyframes);
    });

    style.appendChild(css);
    documentHead.appendChild(style);

    effects.css.prefixes.common.forEach(function (prefix) {
        element.style[prefix + ((!prefix) ? 'animation' : 'Animation')] = animation;
        element.addEventListener(prefix + ((!prefix) ? 'animationend' : 'AnimationEnd'), terminate, false);
    });
};
