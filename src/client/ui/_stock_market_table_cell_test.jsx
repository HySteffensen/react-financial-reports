/** @jsx React.DOM */

(function() {
  "use strict";

	var TestUtils = React.addons.TestUtils;
  var Year = require("../values/year.js");
	var StockMarketTableCell = require("./stock_market_table_cell.js");
  var ValidDollars = require("../values/valid_dollars.js");
  var InvalidDollars = require("../values/invalid_dollars.js");

	describe("StockMarket Table Cell", function() {

		it("renders to HTML", function() {
      var rendered = React.renderComponentToStaticMarkup(<StockMarketTableCell value={new Year(1989)} />);
      expect(rendered).to.equal("<td>1989</td>");
    });

    it("renders text of value", function() {
      expect(textOf(domNodeFor(new Year(1989)))).to.equal("1989");
      expect(textOf(domNodeFor(new ValidDollars(-10)))).to.equal("($10)");
    });

    it("renders negative values with CSS class", function() {
      expect(domNodeFor(new ValidDollars(-10)).className).to.equal("negative");
      expect(domNodeFor(new ValidDollars(10)).className).to.equal("");
    });

    it("renders invalid values with 'invalid' icon", function() {
      // var node = domNodeFor(new InvalidDollars());
      var rendered = React.renderComponentToStaticMarkup(<StockMarketTableCell value={new InvalidDollars()} />);
      expect(rendered).to.equal('<td title="Invalid dollar amount"><img src="/invalid_dollars.png"></td>');

    });

    function domNodeFor(value) {
      var table = TestUtils.renderIntoDocument(
        <table><tbody><tr>
          <StockMarketTableCell value={ value } />
        </tr></tbody></table>
      );
      var cell = TestUtils.findRenderedDOMComponentWithTag(table, "td");
      return cell.getDOMNode();
    }

    function textOf(cell) {
      return cell.textContent;
    }

	});

}());
