import { patch } from "@web/core/utils/patch";
import { FormLabel } from "@web/views/form/form_label";
import { fieldVisualFeedback } from "@web/views/fields/field";

patch(FormLabel.prototype, {
    get isRequired() {
        const { required, empty } = fieldVisualFeedback(
            this.props.fieldInfo.field,
            this.props.record,
            this.props.fieldName,
            this.props.fieldInfo
        );
        return required && empty;
    },
});
