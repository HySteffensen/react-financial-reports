/** @jsx React.DOM */

(function() {

  "use strict";

  var StockMarketTableCell = React.createClass({
    render: function() {
      var value = this.props.value;

      var target = new RenderTarget();
      value.renderTo(target);
      return target.createComponent();
    }
  });

  function RenderTarget() {}

  RenderTarget.prototype.render = function render(values) {
    this._rendering = values;
  };

  RenderTarget.prototype.createComponent = function createComponent() {
    if (this._rendering.invalid) {
      return <td title={this._rendering.tooltip}><img src="/invalid_dollars.png" /></td>;
    } else {
      var negativeClass = this._rendering.negative ? "negative" : null;
      return <td className={negativeClass} >{this._rendering.text}</td>;
    }
  };

  module.exports = StockMarketTableCell;
}());
