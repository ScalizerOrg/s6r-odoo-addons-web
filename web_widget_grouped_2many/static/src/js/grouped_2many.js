/** @odoo-module **/

import { X2ManyField, x2ManyField } from "@web/views/fields/x2many/x2many_field";
import { ListRenderer } from "@web/views/list/list_renderer";
import { registry } from "@web/core/registry";
import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

/**
 * List renderer that displays the already-loaded x2many records grouped
 * client-side by a single field, without any server ``read_group`` call.
 *
 * It only overrides the rows template: each line is still rendered through the
 * standard ``recordRowTemplate``, so inline editing, widgets, optional fields
 * and active actions behave exactly like the native x2many list.
 */
export class GroupedListRenderer extends ListRenderer {
    static props = [...ListRenderer.props, "groupBy?", "groupOrder?"];
    static rowsTemplate = "web_widget_grouped_2many.GroupedRows";

    setup() {
        super.setup();
        // Client-side fold state, keyed by the group value. Folded by default = false.
        this.folded = useState({});
        this.orm = useService("orm");
        // Cache of {group_id: order_value} fetched from the comodel, with a
        // signature of the id-set it was built for (refetch guard).
        this.groupOrder = useState({ map: {}, sig: "" });
        this._fetchingSig = null;
    }

    /**
     * Name of the field used to group the records.
     *
     * :return: the group-by field name, or an empty string when not configured.
     * :rtype: str
     */
    get groupByField() {
        return this.props.groupBy || "";
    }

    /**
     * Name of the comodel field used to order the groups (``group_order``
     * option). Only relevant when the group-by field is a many2one.
     *
     * :return: the order field name, or an empty string when not configured.
     * :rtype: str
     */
    get groupOrderField() {
        return this.props.groupOrder || "";
    }

    /**
     * Comodel (relation) of the group-by field, when it is relational.
     *
     * :return: the comodel name, or a falsy value for non-relational fields.
     * :rtype: str
     */
    get groupByRelation() {
        const def = this.list.fields[this.groupByField];
        return def && def.relation;
    }

    /**
     * Build the client-side groups from the records currently in the list.
     *
     * Each group exposes a stable ``key`` (used for folding and as ``t-key``),
     * a human-readable ``name`` and the list of records it contains. Order of
     * first appearance is preserved.
     *
     * :return: the ordered list of groups.
     * :rtype: Array
     */
    get groupedList() {
        const field = this.groupByField;
        const grouped = {};
        for (const record of this.list.records) {
            const raw = field ? record.data[field] : false;
            let key;
            let name;
            if (raw && typeof raw === "object" && "id" in raw) {
                // many2one: { id, display_name }
                key = raw.id;
                name = raw.display_name || _t("None");
            } else if (raw === false || raw === undefined || raw === "") {
                key = false;
                name = _t("None");
            } else {
                // selection / char / number / boolean ...
                key = raw;
                name = String(raw);
            }
            if (!grouped[key]) {
                grouped[key] = { key, name, records: [] };
            }
            grouped[key].records.push(record);
        }
        const groups = Object.values(grouped);

        if (this.groupOrderField && this.groupByRelation) {
            this._ensureGroupOrder(groups);
            const map = this.groupOrder.map;
            const rank = (g) =>
                g.key === false || !(g.key in map) ? Infinity : map[g.key];
            return groups.slice().sort((a, b) => {
                const va = rank(a);
                const vb = rank(b);
                if (va < vb) {
                    return -1;
                }
                if (va > vb) {
                    return 1;
                }
                return 0;
            });
        }

        return groups;
    }

    /**
     * Fetch (once per id-set) the ``group_order`` field on the comodel for the
     * given groups and store it in :attr:`groupOrder`. Guarded so it triggers a
     * single re-render and never loops.
     *
     * :param groups: the groups built by :meth:`groupedList`.
     */
    _ensureGroupOrder(groups) {
        const ids = groups
            .map((g) => g.key)
            .filter((k) => typeof k === "number");
        const sig = ids.join(",");
        if (sig === this.groupOrder.sig || sig === this._fetchingSig) {
            return;
        }
        this._fetchingSig = sig;
        this.orm
            .read(this.groupByRelation, ids, [this.groupOrderField])
            .then((records) => {
                const map = {};
                for (const record of records) {
                    map[record.id] = record[this.groupOrderField];
                }
                this.groupOrder.map = map;
                this.groupOrder.sig = sig;
                this._fetchingSig = null;
            });
    }

    /**
     * Toggle the folded state of a group.
     *
     * :param key: the group key as exposed by :meth:`groupedList`.
     */
    toggleGroup(key) {
        this.folded[key] = !this.folded[key];
    }
}

/**
 * X2many field that renders its list grouped client-side.
 *
 * It is a thin wrapper around the standard :class:`X2ManyField`: it only swaps
 * the list renderer and forwards the ``group_by`` option to it. Everything else
 * (command protocol, onchange propagation, atomic save, active actions) is
 * inherited unchanged.
 */
export class GroupedX2ManyField extends X2ManyField {
    static components = {
        ...X2ManyField.components,
        ListRenderer: GroupedListRenderer,
    };

    /**
     * Forward the ``group_by`` option (carried by ``crudOptions``) to the
     * renderer, on top of the standard renderer props.
     *
     * :return: the props passed to the list renderer.
     * :rtype: Object
     */
    get rendererProps() {
        const props = super.rendererProps;
        const opts = this.props.crudOptions || {};
        props.groupBy = opts.group_by;
        props.groupOrder = opts.group_order;
        return props;
    }
}

export const groupedX2ManyField = {
    ...x2ManyField,
    component: GroupedX2ManyField,
    supportedOptions: [
        ...(x2ManyField.supportedOptions || []),
        {
            label: _t("Group by"),
            name: "group_by",
            type: "string",
        },
        {
            label: _t("Group order field"),
            name: "group_order",
            type: "string",
        },
    ],
};

registry.category("fields").add("grouped_x2many", groupedX2ManyField);
