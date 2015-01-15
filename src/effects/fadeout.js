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
