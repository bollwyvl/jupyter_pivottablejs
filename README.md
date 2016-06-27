jupyter-widget-pivottable
===============================

A Jupyter Pivot Table Widget

Installation
------------

To install use pip:

    $ pip install widgetpivottable
    $ jupyter nbextension enable --py --sys-prefix widgetpivottable


For a development installation (requires npm),

    $ git clone https://github.com/nicolaskruchten/jupyter-widget-pivottable.git
    $ cd jupyter-widget-pivottable
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --user widgetpivottable
    $ jupyter nbextension enable --py --user widgetpivottable
