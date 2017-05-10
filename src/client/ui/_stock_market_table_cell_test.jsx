/** @jsx React.DOM */

(function() {
  "use strict";

	var TestUtils = React.addons.TestUtils;
  var Year = require("../values/year.js");
	var StockMarketTableCell = require("./stock_market_table_cell.js");

	describe("StockMarket Table Cell", function() {

		it("tests static HTML", function() {
      var rendered = React.renderComponentToStaticMarkup(<StockMarketTableCell value={new Year(1989)} />);
      expect(rendered).to.equal("<td>1989</td>");
    });

    it("renders text of value", function() {
      var value = new Year(1989);
      var cell = domNodeFor(value);

      expect(cell.textContent).to.equal("1989");
    });

    function domNodeFor(value) {
      var table = TestUtils.renderIntoDocument(
        <table><tbody><tr>
          <StockMarketTableCell value={ value }/>
        </tr></tbody></table>
      );
      var cell = TestUtils.findRenderedDOMComponentWithTag(table, "td");
      return cell.getDOMNode();
    }

	});

}());
