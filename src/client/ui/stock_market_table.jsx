/** @jsx React.DOM */

(function() {

"use strict";

var StockMarketRow = require("./stock_market_table_row");

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
        <StockMarketRow year="2010" />
        <StockMarketRow year="2011" />
        <StockMarketRow year="2012" />
        <StockMarketRow year="2013" />
      </tbody>
    </table>; 
  }
});

  module.exports = StockMarketTable;
}());
