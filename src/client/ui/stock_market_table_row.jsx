/** @jsx React.DOM */

(function() {

"use strict";

  var StockMarketTableRow = React.createClass({displayName: 'StockMarketTableRow',
    render: function() {
      return React.DOM.tr(null,
          React.DOM.td(null, this.props.year),
          React.DOM.td(null, "$10,000"),
          React.DOM.td(null, "$7,000"),
          React.DOM.td(null, "($695)"),
          React.DOM.td(null, "($232)"),
          React.DOM.td(null, "$9,905"),
          React.DOM.td(null, "$108,981")
      );
    }
  });

module.exports = StockMarketTableRow;

}());
