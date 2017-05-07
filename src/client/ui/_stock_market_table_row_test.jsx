/** @jsx React.DOM */

(function() {
  "use strict";

	var TestUtils = React.addons.TestUtils;
	var StockMarketTableRow = require("./stock_market_table_row.js");

	describe("StockMarket Table Row", function() {
		it("renders static HTML with year", function() {
      var rendered = React.renderComponentToStaticMarkup(<StockMarketTableRow year="1989" />);
      dump(rendered);
    });
	});

}());
