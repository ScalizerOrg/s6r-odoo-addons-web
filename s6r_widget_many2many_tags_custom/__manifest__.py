# Copyright 2025 Scalizer (<https://www.scalizer.fr>)
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
{
    'name': 'Many2many Tags Custom Widget',
    'version': '18.0.1.0.0',
    'author': 'Scalizer',
    'website': 'https://www.scalizer.fr',
    'summary': "Generic many2many_tags widget with custom display field",
    'sequence': 0,
    'license': 'LGPL-3',
    'depends': [
        'web',
    ],
    'category': 'Technical/Widgets',
    'complexity': 'easy',
    'description': '''
This module provides a generic many2many_tags widget that allows you to display
any field instead of display_name.

Usage:
    <field name="partner_ids" widget="many2many_tags_custom"
           options="{'display_field': 'ref'}"/>
    ''',
    'images': [
        'static/description/logo.png',
    ],
    'assets': {
        'web.assets_backend': [
            's6r_widget_many2many_tags_custom/static/src/fields/many2many_tags_custom/many2many_tags_custom.js',
            's6r_widget_many2many_tags_custom/static/src/fields/many2many_tags_custom/many2many_tags_custom.xml',
        ],
    },
    'auto_install': False,
    'installable': True,
    'application': False,
}
