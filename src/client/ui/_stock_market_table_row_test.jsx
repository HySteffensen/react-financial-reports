/** @jsx React.DOM */

(function() {
  "use strict";

	var TestUtils = React.addons.TestUtils;
	var StockMarketTable = require("./stock_market_table.js");

	describe("StockMarket Table Row", function() {
		it("renders static HTML with year", function() {
      var table = TestUtils.renderIntoDocument(<StockMarketTable />);
      dump(table);
			dump(TestUtils.findRenderedDOMComponentWithTag(table, "table").getDOMNode().innerHTML);
      dump(React.renderComponentToStaticMarkup(<StockMarketTable />));
		});
	});

}());
