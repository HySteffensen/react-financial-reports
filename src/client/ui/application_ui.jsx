/** @jsx React.DOM */

(function() {

"use strict";

var ConfigurationPanel = require("./configuration_panel.js");
var StockMarketTable = require("./stock_market_table.js");

var ApplicationUi = React.createClass({ displayName: 'ApplicationUi',
  render: function() {
    return React.DOM.div(null,
      ConfigurationPanel(null),
      React.DOM.hr(null),
      StockMarketTable(null)
    );
  }
});

module.exports = ApplicationUi;

}());
