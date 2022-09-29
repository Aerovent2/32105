"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var randChanelNum = function randChanelNum() {
  return Math.floor(Math.random() * (255 + 1));
};

var RGB = /*#__PURE__*/function () {
  function RGB() {
    _classCallCheck(this, RGB);
  }

  _createClass(RGB, [{
    key: "create",
    value: function create() {
      var color = "rgb(".concat(randChanelNum(), ",").concat(randChanelNum(), ",").concat(randChanelNum(), ")");
      return color;
    }
  }]);

  return RGB;
}();

var rgb = new RGB();
console.log(rgb.create());
