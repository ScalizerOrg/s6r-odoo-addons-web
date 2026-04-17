/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { DateTimeField, dateTimeField } from "@web/views/fields/datetime/datetime_field";
import { formatDate } from "@web/views/fields/formatters";
import { exprToBoolean } from "@web/core/utils/strings";

patch(DateTimeField, {
    defaultProps: {
        ...DateTimeField.defaultProps,
        showSeconds: false,
        showTime: true,
        numeric: true,   // force the numeric format by default
    },
});

patch(dateTimeField, {
    extractProps({ attrs, options, placeholder, type }, dynamicInfo) {
        options.numeric = options.numeric ?? true;
        return super.extractProps(...arguments);
    },
});


patch(formatDate, {
    extractOptions: ({ options }) => ({
        numeric: exprToBoolean(options.numeric ?? true),
    }),
});
