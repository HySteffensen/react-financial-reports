(function() {
  "use strict";

  var InvalidDollars = module.exports = function() {
    this._invalid = "invalid dollars";
  };

  InvalidDollars.prototype.isValid = function isValid() {
    return false;
  };


}());
