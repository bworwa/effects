/*global effects */

effects.effects.fadeOut = function (element, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
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
            effects.effects.hide(element, callbackFunction);
        };

    element.addEventListener('transitionend', terminate, false);

    duration = parseFloat(duration) || 1;

    element.style.transition = 'opacity ' + duration + 's linear';
    setTimeout(function () {
        element.style.opacity = 0;
    }, 10);
};
