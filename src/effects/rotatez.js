/*global effects */

effects.effects.rotateZ = function (element, degrees, duration, callbackFunction) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return;
    }

    if (element.classList.contains(effects.css.classes.rotating)) {
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
            element.classList.remove(effects.css.classes.rotating);
            callbackFunction();
        };

    if (!effects.utils.isVisible(element)) {
        terminate();
        return;
    }

    element.classList.add(effects.css.classes.rotating);

    element.addEventListener('transitionend', terminate, false);

    duration = parseFloat(duration) || 2.5;

    element.style.transition = 'transform ' + duration + 's linear';
    setTimeout(function () {
        element.style.transform = 'rotate(' + finalDegrees + 'deg)';
    }, 10);
};
