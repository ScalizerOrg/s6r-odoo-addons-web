# Copyright 2024 Scalizer (<https://www.scalizer.fr>)
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl-3.0.html).

from odoo import models, api, _


def notify_user(notification_type='success', message='', title='',
                reload=False, soft_reload=False, sticky=False, next_action=None, **kwargs):
    if not message:
        message = _('Success!')
    else:
        if not title:
            if notification_type == 'success':
                title = _('Success!')
            elif notification_type == 'info':
                title = ''
            elif notification_type == 'warning':
                title = _('Warning!')
            elif notification_type == 'danger':
                title = _('Danger!')
    res = {
        'type': 'ir.actions.client',
        'tag': 'display_notification',
        'params': {
            'message': message,
            'title': title,
            'type': notification_type,
            'sticky': sticky,
        }
    }
    if reload:
        res['params']['next'] = {'type': 'ir.actions.client', 'tag': 'reload'}
    if soft_reload:
        res['params']['next'] = {'type': 'ir.actions.client', 'tag': 'soft_reload'}
    if kwargs.get('window_close'):
        res['params']['next'] = {'type': 'ir.actions.act_window_close'}
    elif next_action:
        res['params']['next'] = next_action
    return res


class Model(models.AbstractModel):
    _inherit = 'base'

    @api.model
    def _notify_user(self, notification_type='success',
                     message='', title='', reload=False, soft_reload=False, sticky=False, next_action=None, **kwargs):
        action = notify_user(notification_type, message, title, reload, soft_reload, sticky, next_action, **kwargs)
        return action
