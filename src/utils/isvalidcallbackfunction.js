/*global effects */

effects.utils.isValidCallbackFunction = function (callback) {
    'use strict';

    var isValid = (typeof callback === 'function');

    if (!isValid) {
        window.console.error('Invalid callback function.');
    }

    return isValid;
};
