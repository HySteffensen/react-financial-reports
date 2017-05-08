/** @jsx React.DOM */

(function() {

"use strict";

var ConfigurationPanel = require("./configuration_panel.js");
var StockMarketTable = require("./stock_market_table.js");

var ApplicationUi = React.createClass({
  render: function() {
    return <div>
      <h1>Financial Projector</h1>
      <ConfigurationPanel />
      <hr />
      <StockMarketTable />
      <div className="footer">
        <p>See important disclosure information in this report.</p>
      </div>
    </div>;
  }
});

module.exports = ApplicationUi;

}());
