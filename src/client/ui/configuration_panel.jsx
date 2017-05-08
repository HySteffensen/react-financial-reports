/** @jsx React.DOM */

(function() {
  "use strict";

  var ConfigurationField = React.createClass({
    render: function() {
      return <div>
        <label>{this.props.name}: </label><input type="text" />
      </div>;
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
