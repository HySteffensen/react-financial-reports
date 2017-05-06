/** @jsx React.DOM */

(function() {

"use strict";

var StockMarketRow = require("./stock_market_table_row");

var StockMarketTable = React.createClass({ displayName: 'StockMarketTable',
  render: function() {
    return React.DOM.table(null,
      React.DOM.thead(null,
        React.DOM.tr(null,
          React.DOM.th(null, "Year"),
          React.DOM.th(null, "Starting Balance"),
          React.DOM.th(null, "Cost Basis"),
          React.DOM.th(null, "Sell Orders"),
          React.DOM.th(null, "Taxes"),
          React.DOM.th(null, "Growth"),
          React.DOM.th(null, "Ending Balance")
        )
      ),
      React.DOM.tbody(null,
        StockMarketRow({ year: "2010" }),
        StockMarketRow({ year: "2011 "}),
        StockMarketRow({ year: "2012 "}),
        StockMarketRow({ year: "2013 "})
      )
    );
  }
});

  module.exports = StockMarketTable;
}());
