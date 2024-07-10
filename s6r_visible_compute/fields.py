# Copyright 2024 Scalizer (<https://www.scalizer.fr>)
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl-3.0.html).

from odoo import fields
from odoo.tools import config


@property
def _description_highlight_compute(self):
    return bool(self.compute)


@property
def _description_highlight_related(self):
    return bool(self.related)


set_name_origin = fields.Field.__set_name__
fields.Field._description_highlight_compute = _description_highlight_compute
fields.Field._description_highlight_related = _description_highlight_related


def set_name(self, owner, name):
    set_name_origin(self, owner, name)
    self.description_attrs.append(("highlight_compute", "_description_highlight_compute"))
    self.description_attrs.append(("highlight_related", "_description_highlight_related"))


if not config['test_enable']:
    fields.Field.__set_name__ = set_name
