/** @odoo-module **/

import { Many2ManyTagsField, many2ManyTagsField } from "@web/views/fields/many2many_tags/many2many_tags_field";
import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";

export class Many2ManyTagsCustomField extends Many2ManyTagsField {
    static props = {
        ...Many2ManyTagsField.props,
        displayField: { type: String, optional: true },
    };

    /**
     * Override getTagProps to display custom field instead of 'display_name'
     */
    getTagProps(record) {
        const props = super.getTagProps(record);
        // Use custom display field if specified, otherwise fallback to display_name
        const displayField = this.props.displayField || "display_name";
        props.text = record.data[displayField] || record.data.display_name;
        return props;
    }
}

export const many2ManyTagsCustomField = {
    ...many2ManyTagsField,
    component: Many2ManyTagsCustomField,
    supportedOptions: [
        ...many2ManyTagsField.supportedOptions,
        {
            label: _t("Display field"),
            name: "display_field",
            type: "string",
            help: _t("Field to display in tags (default: display_name)"),
        },
    ],
    relatedFields: ({ options }) => {
        const relatedFields = [{ name: "display_name", type: "char" }];

        // Add the custom display field if specified
        if (options.display_field) {
            relatedFields.push({ name: options.display_field, type: "char" });
        }

        // Add color field if specified
        if (options.color_field) {
            relatedFields.push({ name: options.color_field, type: "integer", readonly: false });
        }

        return relatedFields;
    },
    extractProps({ attrs, options, string }, dynamicInfo) {
        const props = many2ManyTagsField.extractProps(...arguments);
        props.displayField = options.display_field;
        return props;
    },
};

registry.category("fields").add("many2many_tags_custom", many2ManyTagsCustomField);
