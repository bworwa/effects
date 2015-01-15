var effects = {

    utils: {},

    defaults: {},

    css: {},

    effects: {}

};

/*global effects */

effects.css.prefixes = {
    common: ['', 'webkit', 'moz', 'ms', 'o'],
    keyframes: ['@', '@-webkit-', '@-moz-', '@-ms-', '@-o-']
};

/*global effects */

effects.defaults.callbackFunction = function () {
    'use strict';

    return;
};

/*global effects */

effects.utils.isValidElement = function (element) {
    'use strict';

    var isValid = element && element.nodeType === 1;

    if (!isValid) {
        window.console.error('Element ' + element + ' is not a valid element.');
    }

    return isValid || false;
};

/*global effects */

effects.utils.isValidCallbackFunction = function (callback) {
    'use strict';

    var isValid = (typeof callback === 'function');

    if (!isValid) {
        window.console.error('Invalid callback function.');
    }

    return isValid;
};

/*global effects */

effects.utils.matrixToDegrees = function (matrix) {
    'use strict';

    matrix += '';

    var values, radians, i;

    values = matrix.split('(')[1] || '';
    values = values.split(')')[0] || '';
    values = values.split(',');

    if (values.length !== 6) {
        return NaN;
    }

    for (i = 0; i < values.length; i += 1) {
        values[i] = parseFloat(values[i]);
    }

    if (!values[0] || !values[1]) {
        return NaN;
    }

    radians = Math.atan2(values[1], values[0]);

    if (radians < 0) {
        radians += (2 * Math.PI);
    }

    return radians * (180 / Math.PI);
};

/*global effects */

effects.effects.hide = function (element, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    element.style.display = 'none';

    callbackFunction();
};

/*global effects */

effects.effects.show = function (element, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var elementComputedStyle = window.getComputedStyle(element),
        initialDisplay       = elementComputedStyle.display || '';

    if (initialDisplay === 'none') {
        element.style.display = '';
    }

    // Fix to the 'display none & transform' bug.
    setTimeout(callbackFunction, 50);
};

/*global effects */

effects.effects.fadeIn = function (element, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var elementComputedStyle = window.getComputedStyle(element),
        initialTransition    = elementComputedStyle.transition || 'initial',
        initialDisplay       = elementComputedStyle.display || '',
        terminate            = function () {
            element.removeEventListener('transitionend', terminate, false);
            element.style.transition = initialTransition;
            callbackFunction();
        };

    duration = parseFloat(duration) || 2.5;

    effects.effects.show(element, function () {
        element.style.transition = 'opacity ' + duration + 's linear';
        element.style.opacity = 1;
    });

    element.addEventListener('transitionend', terminate, false);
};

/*global effects */

effects.effects.fadeOut = function (element, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var elementComputedStyle = window.getComputedStyle(element),
        initialTransition    = elementComputedStyle.transition || 'initial',
        terminate            = function () {
            element.removeEventListener('transitionend', terminate, false);
            element.style.transition = initialTransition;
            effects.effects.hide(element);
            callbackFunction();
        };

    duration = parseFloat(duration) || 2.5;

    element.style.transition = 'opacity ' + duration + 's linear';
    element.style.opacity = 0;

    element.addEventListener('transitionend', terminate, false);
};

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

/*global effects */

effects.effects.rotateZ = function (element, degrees, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var elementComputedStyle = window.getComputedStyle(element),
        initialTransition    = elementComputedStyle.transition || 'initial',
        initialDegrees       = effects.utils.matrixToDegrees(elementComputedStyle.transform) || 0,
        finalDegrees         = initialDegrees + (parseFloat(degrees, 10) || 360),
        terminate            = function () {
            element.removeEventListener('transitionend', terminate, false);
            element.style.transition = initialTransition;
            callbackFunction();
        };

    duration = parseFloat(duration) || 2.5;

    element.style.transition = 'transform ' + duration + 's linear';
    element.style.transform = 'rotate(' + finalDegrees + 'deg)';

    element.addEventListener('transitionend', terminate, false);
};
