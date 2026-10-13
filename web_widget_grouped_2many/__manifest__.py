# Copyright 2026 Scalizer (<https://www.scalizer.fr>)
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl-3.0.html).
{
    "name": "Web Widget - Grouped X2Many",
    "version": "18.0.2.0.0",
    "author": "Scalizer",
    "website": "https://www.scalizer.fr",
    "summary": "Display one2many/many2many fields as a grouped list view in form views",
    "sequence": 0,
    "license": "LGPL-3",
    "depends": ["web"],
    "category": "Technical",
    "complexity": "easy",
    "qweb": [],
    "demo": [],
    "images": [],
    "data": [],
    "assets": {
        "web.assets_backend": [
            "web_widget_grouped_2many/static/src/js/grouped_2many.js",
            "web_widget_grouped_2many/static/src/xml/grouped_2many.xml",
            "web_widget_grouped_2many/static/src/scss/grouped_2many.scss",
        ],
    },
    "auto_install": False,
    "installable": True,
    "application": False,
}
