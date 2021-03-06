/* jshint -W097 */

"use strict";

var GrowthRate = require("./growth_rate.js");
var ValidDollars = require("./valid_dollars.js");

describe("GrowthRate", function() {
  var rate = new GrowthRate(10);

  it("calculates growth", function() {
    expect(rate.growthFor(new ValidDollars(1000))).to.eql(new ValidDollars(100));
  });

  it("converts to string", function() {
    expect(rate.toString()).to.equal("10%");
  });
});
