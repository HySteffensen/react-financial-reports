/** @jsx React.DOM */

(function() {

"use strict";

var StockMarketRow = require("./stock_market_table_row");
var Year = require("../values/year.js");

var StockMarketTable = React.createClass({
  render: function() {
    return <table className="stockmarket">
      <thead>
        <tr>
          <th>Year</th>
          <th>Starting Balance</th>
          <th>Cost Basis</th>
          <th>Sell Orders</th>
          <th>Taxes</th>
          <th>Growth</th>
          <th>Ending Balance</th>
        </tr>
      </thead>
      <tbody>
        <StockMarketRow year={new Year(2010)} />
        <StockMarketRow year={new Year(2011)} />
        <StockMarketRow year={new Year(2012)} />
        <StockMarketRow year={new Year(2013)} />
      </tbody>
    </table>;
  }
});

  module.exports = StockMarketTable;
}());
