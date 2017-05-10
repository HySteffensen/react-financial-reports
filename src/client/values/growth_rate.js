(function() {
  "use strict";

  var failFast = require("../util/fail_fast.js");

  var GrowthRate = module.exports = function GrowthRate(rateAsPercentage) {
    failFast.unlessNumber(rateAsPercentage, "rateAsPercentage");
    failFast.unlessTrue(rateAsPercentage >= 0, "growth rate must be positive; was " + rateAsPercentage);

    this._rate = rateAsPercentage;
  };

  GrowthRate.prototype.growthFor = function growthFor(dollars) {
    failFast.unlessObject(dollars);

    return dollars.percentage(this._rate);
  };

  GrowthRate.prototype.toString = function toString() {
    return this._rate + "%";
  };


}());
