(function() {
  "use strict";

  var failFast = require("../util/fail_fast.js");

  //This is a pure superclass. It's used for type checking purposes
  var Dollars = module.exports = function Dollars() {
    failFast.unreachable("Do not construct Dollars directly; construct one of its subclasses instead");
  };

  Dollars.extend = function extend(subclass) {
    subclass.prototype = Object.create(Dollars.prototype);
    subclass.prototype.constructor = subclass;
  };


}());
