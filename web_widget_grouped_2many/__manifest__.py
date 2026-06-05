{
    'name': 'Web Widget - Grouped X2Many',
    'version': '19.0.1.0.0',
    'summary': 'Display one2many/many2many fields as a grouped list view in form views',
    'category': 'Technical',
    'author': 'Scalizer',
    'website': 'https://www.scalizer.fr',
    'license': 'LGPL-3',
    'depends': ['web'],
    'assets': {
        'web.assets_backend': [
            'web_widget_grouped_2many/static/src/js/grouped_2many.js',
            'web_widget_grouped_2many/static/src/scss/grouped_2many.scss',
        ],
    },
    'installable': True,
    'auto_install': False,
}
