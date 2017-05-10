/* jshint -W097 */

"use strict";

var Year = require("./year.js");

describe("Year", function() {

  var _2010 = new Year(2010);
  var _2011 = new Year(2011);
  var _2050 = new Year(2050);

  it("increments year", function() {
    expect(_2010.nextYear()).to.eql(_2011);
  });

  it("counts years in range", function() {
    expect(_2010.numberOfYearsInclusive(_2050)).to.equal(41);
  });

  it("converts to string", function() {
    expect(_2010.toString()).to.equal("2010");
  });

});
