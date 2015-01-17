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
