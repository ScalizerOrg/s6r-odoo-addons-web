/** @odoo-module **/

import { Component, useState, xml } from "@odoo/owl";
import { View } from "@web/views/view";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { useService } from "@web/core/utils/hooks";
import { FormViewDialog } from "@web/views/view_dialogs/form_view_dialog";
import { SelectCreateDialog } from "@web/views/view_dialogs/select_create_dialog";
import { patch } from "@web/core/utils/patch";
import { ListController } from "@web/views/list/list_controller";

ListController.props.activeActions = { type: Object, optional: true };

patch(ListController.prototype, {
  setup() {
    super.setup();
    if (this.props.activeActions) {
      this.activeActions = { ...this.activeActions, ...this.props.activeActions };
    }
  },
});

export class GroupedX2ManyField extends Component {
  setup() {
    this.dialog = useService("dialog");
    this.state = useState({ viewKey: 0 });
  }

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

  get allowAdd() {
    return !!(this.props.options && this.props.options.allow_add);
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
      allowSelectors: false,
      selectRecord: (resId) => this.openRecordDialog(resId),
      activeActions: {
        type: "many2many",
        unlink: true,
        onDelete: (record) => this.onRemoveRecord(record),
      },
    };
  }

  openRecordDialog(resId) {
    this.dialog.add(FormViewDialog, {
      resModel: this.resModel,
      resId,
      onRecordSaved: () => {
        this.state.viewKey++;
      },
    });
  }

  async onRemoveRecord(record) {
    const m2mList = this.props.record.data[this.props.name];
    await m2mList.addAndRemove({ remove: [record.resId] });
    await this.props.record.save();
    this.state.viewKey++;
  }

  async onAdd() {
    const m2mList = this.props.record.data[this.props.name];
    const currentIds = m2mList.resIds || [];
    this.dialog.add(SelectCreateDialog, {
      resModel: this.resModel,
      domain: [["id", "not in", currentIds]],
      onSelected: async (resIds) => {
        await m2mList.addAndRemove({ add: resIds });
        await this.props.record.save();
        this.state.viewKey++;
      },
    });
  }
}

GroupedX2ManyField.template = xml`
  <div class="o_field_grouped_2many">
    <t t-if="record.resId">
      <t t-if="viewId">
        <View t-key="state.viewKey" t-props="viewProps"/>
        <t t-if="allowAdd">
          <div class="o_field_x2many_list_row_add">
            <a href="#" t-on-click.prevent="onAdd">Add a line</a>
          </div>
        </t>
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
