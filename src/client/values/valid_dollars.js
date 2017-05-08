(function() {
  "use strict";

  var failFast = require("../util/fail_fast.js");
  var InvalidDollars = require("./invalid_dollars.js");

  var ValidDollars = module.exports = function ValidDollars(amount) {
    failFast.unlessDefined(amount, "amount");
    if (!inRange(amount)) return new InvalidDollars();

    this._amount = amount;
  };

  ValidDollars.MAX_VALUE = 1000000000;
  ValidDollars.MIN_VALUE = -1000000000;

  ValidDollars.prototype.isValid = function isValid() {
    return true;
  };

  ValidDollars.prototype._toCoreDataType = function _toCoreDataType() {
    return this._amount;
  };

  ValidDollars.prototype.plus = function plus(operand) {
    return arithmetic(this, operand, function(left, right) {
      return left + right;
    });
  };

  ValidDollars.prototype.minus = function minus(operand) {
    return arithmetic(this, operand, function(left, right) {
      return left - right;
    });
  };

  ValidDollars.prototype.subtractToZero = function subtractToZero(operand) {
    return arithmetic(this, operand, function(left, right) {
      return Math.max(0, left - right);
    });
  };

  ValidDollars.prototype.flipSign = function flipSign(operand) {
    return new ValidDollars(this._amount * -1);
  };

  ValidDollars.prototype.percentage = function percentage(operand) {
    return new ValidDollars(this._amount * operand / 100);
  };

  ValidDollars.prototype.min = function min(operand) {
    return arithmetic(this, operand, function(left, right) {
      return Math.min(left, right);
    });
  };

  function arithmetic(self, operand, fn) {
    failFast.unlessDefined(operand, "operand");
    if (!operand.isValid()) return new InvalidDollars();

    return new ValidDollars(fn(self._amount, operand._toCoreDataType()));
  }

  function inRange(value) {
    failFast.unlessDefined(value, "value");
    return (value >= ValidDollars.MIN_VALUE) && (value <= ValidDollars.MAX_VALUE);
  }

}());