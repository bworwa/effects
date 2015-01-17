/*global effects */

effects.utils.isVisible = function (element) {
    'use strict';

    if (!effects.utils.isValidElement(element)) {
        return false;
    }

    var elementComputedStyle = window.getComputedStyle(element),
        visible = true;

    visible = visible && elementComputedStyle.display !== 'none';
    visible = visible && elementComputedStyle.visibility !== 'collapse';
    visible = visible && elementComputedStyle.visibility !== 'hidden';
    visible = visible && elementComputedStyle.opacity > 0;

    return visible;
};
