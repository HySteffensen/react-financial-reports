/** @jsx React.DOM */

(function() {

"use strict";

  var StockMarketTableRow = React.createClass({
    render: function() {
      return <tr>
        <td>{this.props.year}</td>
        <td>$10,000</td>
        <td>$7,000</td>
        <td>($695)</td>
        <td>($232)</td>
        <td>$9,905</td>
        <td>$108,981</td>
      </tr>;
    }
  });

module.exports = StockMarketTableRow;

}());
