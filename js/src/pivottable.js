var widgets = require('jupyter-js-widgets');
// oy, jquery
var $ = window.$;

var _ = require('underscore');
var d3 = require('d3');
var c3 = require('c3');

var pivottable = require('pivottable');
var pivottable = require('pivottable/dist/d3_renderers');

var pivottable = require('pivottable/dist/c3_renderers');

require("c3/c3.css");
require("pivottable/dist/pivot.css");
require("./pivottable.css");


var PivotTableModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
    _model_name : 'PivotTableModel',
    _view_name : 'PivotTableView',
    _model_module : 'jupyter-widget-pivottable',
    _view_module : 'jupyter-widget-pivottable',
    records : [],
    rows: [],
    cols: [],
    vals: [],
    aggregator: null,
    renderer: null,
    menu_limit: 200,
    sort_unused: false,
    hidden: []
  })
});


// Custom View. Renders the widget model.
var PivotTableView = widgets.DOMWidgetView.extend({
  className: "widget-pivottable",
  render: function() {
    var that = this;
    this.$wrapper = $("<div/>", {"class": "widget-pivottable-wrapper"})
      .appendTo(this.el);
    this.listenTo(this.model, 'change', this.value_changed);
    this.displayed.then(function(){
      that.traitlets_changed();
    });
  },

  events: {
    "change": "input_changed"
  },

  on_refresh: function(opts){
    var new_vals = {
      cols: opts.cols,
      rows: opts.rows,
      aggregator: opts.aggregatorName,
      renderer: opts.rendererName,
      hidden: opts.hiddenAttributes
    };

    this.model.set(new_vals);

    this.touch();
  },

  traitlets_changed: function() {
    var that = this;
    var output_width = $(".output").width(),
      wrapper_width = (output_width - 87) + "px";

    this.$wrapper.css({
      width: wrapper_width,
      "max-width": wrapper_width
    });

    this.$wrapper.pivotUI(this.model.get("records"),
      {
        rows: this.model.get("rows"),
        cols: this.model.get("cols"),
        vals: this.model.get("vals"),
        // hiddenAttributes: this.model.get("hidden"),
        aggregatorName: this.model.get("aggregator") || null,
        rendererName: this.model.get("renderer") || null,
        autoSortUnusedAttrs: this.model.get("sort_unused"),
        menuLimit: this.model.get("menu_limit"),
        renderers: $.extend(
          $.pivotUtilities.renderers,
          $.pivotUtilities.c3_renderers,
          $.pivotUtilities.d3_renderers,
          $.pivotUtilities.export_renderers
        ),
        onRefresh: _.bind(this.on_refresh, this)
      })
      .show();
  }
});


module.exports = {
  PivotTableModel : PivotTableModel,
  PivotTableView : PivotTableView
};
