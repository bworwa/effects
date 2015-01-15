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
