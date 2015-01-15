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
