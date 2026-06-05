/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { View } from "@web/views/view";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

export class GroupedX2ManyField extends Component {
  get record() {
    return this.props.record;
  }

  get fieldDef() {
    return this.record.fields[this.props.name];
  }

  get resModel() {
    return this.fieldDef.relation;
  }

  get viewId() {
    return (this.props.options && this.props.options.view_id) || false;
  }

  get groupBy() {
    const gb = this.props.options && this.props.options.group_by;
    if (!gb) {
      return [];
    }
    return Array.isArray(gb) ? gb : [gb];
  }

  get domain() {
    if (!this.record.resId) {
      return [["id", "=", 0]];
    }
    return [["id", "in", this.record.data[this.props.name].resIds]];
  }

  get viewContext() {
    const recordCtx = this.record.getContext
      ? this.record.getContext()
      : this.props.context || {};
    const fieldCtx = this.props.context || {};
    const optCtx = (this.props.options && this.props.options.context) || {};

    const ctx = {
      ...recordCtx,
      ...fieldCtx,
      ...optCtx,
      create: false,
    };

    if (this.groupBy.length) {
      ctx.group_by = this.groupBy;
    }

    return ctx;
  }

  get viewProps() {
    const views = [[this.viewId, "list"]];
    const searchViewId =
      (this.props.options && this.props.options.search_view_id) || null;

    if (searchViewId) {
      views.push([searchViewId, "search"]);
    }

    return {
      type: "list",
      resModel: this.resModel,
      views,
      domain: this.domain,
      context: this.viewContext,
      groupBy: this.groupBy,
    };
  }
}

GroupedX2ManyField.template = xml`
  <div class="o_field_grouped_2many">
    <t t-if="record.resId">
      <t t-if="viewId">
        <View t-props="viewProps"/>
      </t>
      <t t-else="">
        <div class="alert alert-warning m-2">
          View not found (check view_id in options).
        </div>
      </t>
    </t>
    <t t-else="">
      <div class="alert alert-info m-2">
        Save the record first to display related records.
      </div>
    </t>
  </div>
`;

GroupedX2ManyField.components = { View };

GroupedX2ManyField.props = {
  ...standardFieldProps,
  options: { type: Object, optional: true },
};

registry.category("fields").add("grouped_2many", {
  component: GroupedX2ManyField,
  supportedTypes: ["one2many", "many2many"],
  extractProps: ({ options }) => ({ options: options || {} }),
});
