/** @odoo-module */

import {FormLabel} from "@web/views/form/form_label";
import {patch} from "@web/core/utils/patch";

patch(FormLabel.prototype, "teclib_digitalportage_ported_employee.FormLabel", {
    get className() {
        let className = this._super(...arguments);
        if (this.props.record.fields[this.props.fieldName].highlight_compute) {
            className += " o_field_compute";
        }
        if (this.props.record.fields[this.props.fieldName].highlight_related) {
            className += " o_field_related";
        }
        return className;
    }
});
