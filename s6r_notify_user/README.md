Scalizer Notify User
===============

This module add a function to easily notify backend users

<br>
<br>

## Usage

the method _notify_user can be call from every model.

Parameters are :
notification_type : 'success' by default. Other values available : 'info', 'warning', 'danger'
message : the message to display
title (optional): the title of the notification
reload (optional): boolean to reload the page after the notification
soft_reload (optional): boolean to refresh record values after the notification
sticky (optional): boolean to set a sticky notification
next_action (optional): dictionary with next action to do after the notification

```python

def do_something(self):
    # do something
    if success:
        return self._notify_user(message=_('Something done!'))
    else:
        return self._notify_user('danger', _('Something failed!'))

```

## Requirements

No requirements.

## Authors

* Scalizer

## Contributors

* Michel Perrocheau ([GitHub](https://github.com/myrrkel))

## Maintainers

This module is maintained by [Scalizer](https://www.scalizer.fr).

![Scalizer](./static/description/logo.png)
