# Web Widget - Grouped X2Many

Odoo widget that renders a `one2many` or `many2many` field as a grouped list view inside a form view.

## Usage

```xml
<field name="my_field_ids"
   widget="grouped_2many"
   options="{
      'group_by': 'category_id',
      'view_id': %(my_module.view_my_model_grouped_list)d,
      'search_view_id': %(my_module.view_my_model_grouped_search)d
    }"
   nolabel="1"/>
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `view_id` | int | Required. XML ID of the list view to render. |
| `group_by` | str or list | Field name(s) to group by. |
| `search_view_id` | int | Optional. XML ID of a custom search view. |
| `context` | dict | Optional. Extra context merged into the view context. |
