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
    hidden: [],
    inclusions: {},
    exclusions: {}
  })
});


// Custom View. Renders the widget model.
var PivotTableView = widgets.DOMWidgetView.extend({
  className: "widget-pivottable",
  render: function() {
    var that = this;
    this.$wrapper = $("<div/>", {"class": "widget-pivottable-wrapper"})
      .appendTo(this.el);
    this.listenTo(this.model, 'change', this.traitlets_changed);
    this.displayed.then(function(){
      that.traitlets_changed();
    });
  },

  events: {
    "change": "input_changed"
  },

  on_refresh: function(opts){
    var new_opts = {
      cols: opts.cols,
      rows: opts.rows,
      vals: opts.vals,
      aggregator: opts.aggregatorName,
      renderer: opts.rendererName
    };

    this.model.set(new_opts);

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

    var old_opts = this.$wrapper.data("pivotUIOptions");

    var opts = {
      rows: this.model.get("rows"),
      cols: this.model.get("cols"),
      vals: this.model.get("vals"),
      hiddenAttributes: this.model.get("hidden"),
      aggregatorName: this.model.get("aggregator") || null,
      rendererName: this.model.get("renderer") || null,
      autoSortUnusedAttrs: this.model.get("sort_unused"),
      menuLimit: this.model.get("menu_limit"),
      inclusions: this.model.get("inclusions"),
      exclusions: this.model.get("exclusions")
    };

    // avoid uneccessary redraw (i.e. user-created)
    if(old_opts && !_.isMatch(old_opts, opts)){
      return;
    }

    // add these
    _.extend(opts, {
      renderers: $.extend(
        {},
        $.pivotUtilities.renderers,
        $.pivotUtilities.c3_renderers,
        $.pivotUtilities.d3_renderers,
        $.pivotUtilities.export_renderers
      ),
      onRefresh: function(opts){
        _.delay(function(){
          that.on_refresh(opts);
        }, 100);
      }
    });

    this.$wrapper
      .pivotUI(
        this.model.get("records"),
        opts,
        true // overwrite!
      )
      .show();
  }
});


module.exports = {
  PivotTableModel : PivotTableModel,
  PivotTableView : PivotTableView
};
