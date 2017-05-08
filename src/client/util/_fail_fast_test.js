(function() {
  "use strict";

  var failFast = require("./fail_fast.js");
  var FailFastException = failFast.FailFastException;

  describe("FailFastException", function() {

    it("looks like this", function() {
      try {
        throw new FailFastException(function() {}, "foo");
      }
      catch(e) {
        expect(e.name).to.equal("FailFastException");
        expect(e.constructor).to.equal(FailFastException);
        expect("" + e).to.equal("FailFastException: foo");
      }
    });
  });

  describe("FailFast", function() {

    it("checks if variable is defined", function() {
      expect(unlessDefined("foo")).to.not.throwException();
      expect(unlessDefined(null)).to.not.throwException();
      expect(unlessDefined(undefined)).to.throwException(/Required variable was not defined/);
      expect(unlessDefined(undefined, "myVariable")).to.throwException(/Required variable \[myVariable\] was not defined/);

      function unlessDefined(variable, variableName) {
        return function() {
          failFast.unlessDefined(variable, variableName);
        };
      }
    });

    it("fails when unreachable code is executed", function() {
      expect(unreachable()).to.throwException(/Unreachable code executed/);
      expect(unreachable("foo")).to.throwException(/foo/);

      function unreachable(message) {
        return function() {
          failFast.unreachable(message);
        };
      }
    });
  });

}());
