Many2many Tags Custom Widget
===============

Generic many2many_tags widget with custom display field


## Usage

In your XML views, use the widget with the `display_field` option:

```xml
<field name="partner_ids" widget="many2many_tags_custom"
       options="{'display_field': 'ref'}"/>
```

### Examples

Display partner reference instead of name:
```xml
<field name="hotel_ids" widget="many2many_tags_custom"
       options="{'display_field': 'ref'}"/>
```

Display product code instead of name:
```xml
<field name="product_ids" widget="many2many_tags_custom"
       options="{'display_field': 'default_code'}"/>
```

Default behavior (display_name):
```xml
<field name="category_ids" widget="many2many_tags_custom"/>
```


## Authors

* Scalizer


## Maintainers

This module is maintained by [Scalizer](https://www.scalizer.fr).

![Scalizer](./static/description/logo.png)
