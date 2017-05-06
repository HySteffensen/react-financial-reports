/** @jsx React.DOM */

(function() {
  "use strict";

  var ConfigurationField = React.createClass({ displayName: 'ConfigurationField',
    render: function() {
      return React.DOM.p(null, this.props.name, ": _______");
    }
  });

  var ConfigurationPanel = React.createClass({displayName: 'ConfigurationPanel',
    render: function() {
      return React.DOM.div(null,
        React.DOM.p(null, "Configuration:"),
        ConfigurationField({name: "Starting Balance"}),
        ConfigurationField({name: "Cost Basis"}),
        ConfigurationField({name: "Yearly Spending"})
      );
    }
  });

  module.exports = ConfigurationPanel;
}());
