{
    'name': 'S6R - Numeric Date Format (DD/MM/YYYY)',
    'version': '19.0.1.0.0',
    'summary': 'Force numeric date format DD/MM/YYYY on all date fields',
    'category': 'Technical',
    'author': 'Scalizer',
    'depends': ['web'],
    'assets': {
        'web.assets_backend': [
            's6r_numeric_date_format/static/src/js/date_format_patch.js',
        ],
    },
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
