# Copyright 2026 Scalizer (<https://www.scalizer.fr>)
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
{
    'name': 'Required Field Highlight',
    'version': '18.0.1.0.0',
    'author': 'Scalizer',
    'website': 'https://www.scalizer.fr',
    'summary': 'Display a red asterisk next to empty required fields on form views',
    'sequence': 0,
    'license': 'LGPL-3',
    'depends': [
        'web',
    ],
    'category': 'Technical',
    'complexity': 'easy',
    'description': '''
This module makes required fields easier to spot on form views: an empty
required field gets a red asterisk next to its label, in addition to
Odoo's native (subtle) required border color.

The asterisk disappears as soon as the field is filled in.
    ''',
    'assets': {
        'web.assets_backend': [
            's6r_required_field_highlight/static/src/js/form_label.js',
            's6r_required_field_highlight/static/src/xml/form_label.xml',
        ],
    },
    'auto_install': False,
    'installable': True,
    'application': False,
}
