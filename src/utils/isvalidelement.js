/*global effects */

effects.utils.isValidElement = function (element) {
    'use strict';

    var isValid = element && element.nodeType === 1;

    if (!isValid) {
        window.console.error('Element ' + element + ' is not a valid element.');
    }

    return isValid || false;
};
