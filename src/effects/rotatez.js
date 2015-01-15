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
