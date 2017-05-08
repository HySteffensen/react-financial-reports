(function() {

  "use strict";

  var InvalidDollars = require("./invalid_dollars.js");

  describe("InvalidDollars", function() {

    var invalid = new InvalidDollars();

    it("is never valid", function() {
      expect(invalid.isValid()).to.be(false);
    });
  });

}());
