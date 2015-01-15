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
