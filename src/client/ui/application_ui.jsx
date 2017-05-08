/** @jsx React.DOM */

(function() {

"use strict";

var ConfigurationPanel = require("./configuration_panel.js");
var StockMarketTable = require("./stock_market_table.js");

var ApplicationUi = React.createClass({
  render: function() {
    return <div>
      <ConfigurationPanel />
      <hr />
      <StockMarketTable />
    </div>;
  }
});

module.exports = ApplicationUi;

}());
