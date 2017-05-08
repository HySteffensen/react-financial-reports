/** @jsx React.DOM */

(function() {
  "use strict";

  var ConfigurationField = React.createClass({
    render: function() {
      return <p>{this.props.name}: _______</p>;
    }
  });

  var ConfigurationPanel = React.createClass({
    render: function() {
      return <div>
        <p>Configuration:</p>
        <ConfigurationField name="Starting Balance" />
        <ConfigurationField name="Cost Basis" />
        <ConfigurationField name="Yearly Spending" />
      </div>;
    }
  });

  module.exports = ConfigurationPanel;
}());
