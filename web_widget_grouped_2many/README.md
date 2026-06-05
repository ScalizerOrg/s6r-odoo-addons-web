# Web Widget - Grouped X2Many

Odoo widget that renders a `one2many` or `many2many` field as a **grouped list**
inside a form view.

It is a thin extension of the standard x2many list widget: it keeps the native
behavior (inline editing, onchange, atomic save with the parent record, optional
fields, active actions) and only adds client-side grouping of the displayed
lines by a single field. No server `read_group` is performed — the records
already loaded by the relation are grouped in the renderer.

## Usage

```xml
<field name="my_field_ids" widget="grouped_x2many" options="{'group_by': 'category_id'}">
    <list editable="bottom">
        <field name="category_id"/>
        <field name="name"/>
        <field name="amount"/>
    </list>
</field>
```

Define the list arch (columns, `editable`, etc.) inline exactly as for a normal
x2many field. The widget adds collapsible group headers based on the `group_by`
option.

## Options

| Option | Type | Description |
|--------|------|-------------|
| `group_by` | str | Required. Name of the field to group the lines by. Supports many2one, selection, char, number and boolean fields. |
| `group_order` | str | Optional. Name of a field on the **comodel** of the `group_by` many2one, used to order the groups (ascending). Only applies when `group_by` is a many2one; ignored otherwise. The empty ("None") group is always shown last. Example: `'sequence'`. |

## Notes

- Grouping is client-side only: there are no per-group server aggregates and no
  lazy/paginated group loading. All relation records are grouped in the browser.
- Groups can be collapsed/expanded by clicking the group header.
