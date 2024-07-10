# Copyright 2024 Scalizer (<https://www.scalizer.fr>)
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl-3.0.html).
{
    'name': 'Scalizer Visible Compute',
    'version': '16.0.1.0.0',
    'author': 'Scalizer',
    'website': 'https://www.scalizer.fr',
    'summary': "Add class on computed fields",
    'sequence': 0,
    'certificate': '',
    'license': 'LGPL-3',
    'depends': [
        'base',
        'web'
    ],
    'category': 'Generic Modules/Scalizer',
    'complexity': 'easy',
    'description': '''
Add class on computed fields
    ''',
    'qweb': [
    ],
    'demo': [
    ],
    'images': [
    ],
    'data': [
    ],
    'assets': {
        'web.assets_backend': [
            's6r_visible_compute/static/src/views/**/*',
        ],
    },
    'auto_install': False,
    'installable': True,
    'application': False,
}
