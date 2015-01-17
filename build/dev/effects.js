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

effects.css.classes = {
    fading: 'effects-fading'
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

effects.utils.isVisible = function (element) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return false;
    }

    var elementComputedStyle = window.getComputedStyle(element),
        visible = true;

    visible = visible && elementComputedStyle.display !== 'none';
    visible = visible && elementComputedStyle.visibility !== 'collapse';
    visible = visible && elementComputedStyle.visibility !== 'hidden';
    visible = visible && elementComputedStyle.opacity > 0;

    return visible;
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

    setTimeout(callbackFunction, 10);
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

    element.style.display = '';

    setTimeout(callbackFunction, 10);
};

/*global effects */

effects.effects.fadeIn = function (element, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    if (element.classList.contains(effects.css.classes.fading)) {
        return;
    }

    if (typeof duration === 'function') {
        callbackFunction = duration;
        duration = undefined;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var terminate = function () {
            element.removeEventListener('transitionend', terminate, false);
            element.style.transition = '';
            element.classList.remove(effects.css.classes.fading);
            callbackFunction();

            return;
        };

    if (effects.utils.isVisible(element)) {
        terminate();
        return;
    }

    element.classList.add(effects.css.classes.fading);

    element.addEventListener('transitionend', terminate, false);

    duration = parseFloat(duration) || 1;

    element.style.opacity = 0;

    element.style.transition = 'opacity ' + duration + 's linear';

    effects.effects.show(element, function () {
        element.style.opacity = '';
    });

    return;
};

/*global effects */

effects.effects.fadeOut = function (element, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    if (element.classList.contains(effects.css.classes.fading)) {
        return;
    }

    if (typeof duration === 'function') {
        callbackFunction = duration;
        duration = undefined;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var terminate = function () {
            element.removeEventListener('transitionend', terminate, false);
            element.style.transition = '';
            element.classList.remove(effects.css.classes.fading);
            effects.effects.hide(element, function () {
                element.style.opacity = '';
                callbackFunction();
            });

            return;
        };

    if (!effects.utils.isVisible(element)) {
        terminate();
        return;
    }

    element.classList.add(effects.css.classes.fading);

    element.addEventListener('transitionend', terminate, false);

    duration = parseFloat(duration) || 1;

    element.style.transition = 'opacity ' + duration + 's linear';
    element.style.opacity = 0;

    return;
};

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

/*global effects */

effects.effects.rotateZ = function (element, degrees, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    if (typeof degrees === 'function') {
        callbackFunction = degrees;
        degrees = duration = undefined;
    }

    if (typeof duration === 'function') {
        callbackFunction = duration;
        duration = undefined;
    }

    callbackFunction = callbackFunction || effects.defaults.callbackFunction;

    if (!effects.utils.isValidCallbackFunction(callbackFunction)) {
        return;
    }

    var elementComputedStyle = window.getComputedStyle(element),
        initialDegrees       = effects.utils.matrixToDegrees(elementComputedStyle.transform) || 0,
        finalDegrees         = initialDegrees + (parseFloat(degrees, 10) || 360),
        terminate            = function () {
            element.removeEventListener('transitionend', terminate, false);
            element.style.transition = '';
            callbackFunction();
        };

    element.addEventListener('transitionend', terminate, false);

    duration = parseFloat(duration) || 2.5;

    element.style.transition = 'transform ' + duration + 's linear';
    setTimeout(function () {
        element.style.transform = 'rotate(' + finalDegrees + 'deg)';
    }, 10);
};
