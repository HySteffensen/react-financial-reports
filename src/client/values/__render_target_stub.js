/*jshint -W097 */

  "use strict";

  var __RenderTargetStub = module.exports = function() {
    this.reset();
  };

  __RenderTargetStub.prototype.setText = function setText(text) {
    this.text = text;
  };

  __RenderTargetStub.prototype.setNegative = function setNegative() {
    this.negative = true;
  };

  __RenderTargetStub.prototype.setInvalid = function setInvalid(tooltip) {
    this.invalid = true;
    this.tooltip = tooltip;
  };

  __RenderTargetStub.prototype.reset = function reset() {
    this.text = undefined;
    this.negative = false;
    this.invalid = false;
    this.tooltip = undefined;
  };
