import { patch } from "@web/core/utils/patch";
import { FormLabel } from "@web/views/form/form_label";
import { fieldVisualFeedback } from "@web/views/fields/field";

patch(FormLabel.prototype, {
    get isRequired() {
        const { required } = fieldVisualFeedback(
            this.props.fieldInfo.field,
            this.props.record,
            this.props.fieldName,
            this.props.fieldInfo
        );
        if (!required) {
            return false;
        }
        const field = this.props.fieldInfo.field;
        const record = this.props.record;
        const fieldName = this.props.fieldName;
        return "isEmpty" in field
            ? field.isEmpty(record, fieldName)
            : !record.data[fieldName];
    },
});
