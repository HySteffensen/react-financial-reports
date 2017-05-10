/** @jsx React.DOM */

(function() {

  "use strict";

  var StockMarketTableCell = React.createClass({
    render: function() {
      var value = this.props.value;

      return <td>{value}</td>;
    }
  });

  module.exports = StockMarketTableCell;
}());
