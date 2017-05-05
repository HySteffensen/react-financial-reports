/** @jsx React.DOM */

(function() {
  "use strict";

  var TestUtils = React.addons.TestUtils;
  var StockMarketTable = require("./stock_market_table.js");

  describe("StockMarket Table", function() {
    it("output hardcoded data", function() {
      var table = TestUtils.renderIntoDocument(<StockMarketTable />);
      dump(table);
    });
  });
}());
