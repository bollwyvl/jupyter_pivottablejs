import ipywidgets as widgets
from traitlets import (
    CBool,
    CFloat,
    Dict,
    Tuple,
    Unicode,
)


@widgets.register("widgetpivottable.PivotTable")
class PivotTable(widgets.DOMWidget):
    """"""
    _view_name = Unicode("PivotTableView").tag(sync=True)
    _model_name = Unicode("PivotTableModel").tag(sync=True)
    _view_module = Unicode("jupyter-widget-pivottable").tag(sync=True)
    _model_module = Unicode("jupyter-widget-pivottable").tag(sync=True)
    records = Tuple([]).tag(sync=True)
    rows = Tuple([]).tag(sync=True)
    cols = Tuple([]).tag(sync=True)
    vals = Tuple([]).tag(sync=True)
    hidden = Tuple([]).tag(sync=True)
    menu_limit = CFloat(200).tag(sync=True)
    sort_unused = CBool(False).tag(sync=True)
    aggregator = Unicode().tag(sync=True)
    renderer = Unicode().tag(sync=True)
    exclusions = Dict().tag(sync=True)
    inclusions = Dict().tag(sync=True)
