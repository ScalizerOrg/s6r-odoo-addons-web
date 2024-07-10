# Copyright 2024 Scalizer (<https://www.scalizer.fr>)
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl-3.0.html).

from odoo import models, api


class Model(models.AbstractModel):
    _inherit = 'base'

    @api.model
    def _get_view_field_attributes(self):
        res = super()._get_view_field_attributes()
        if self.user_has_groups('base.group_no_one'):
            return res + ['highlight_compute', 'highlight_related']
        return res
