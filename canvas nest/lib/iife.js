'use strict';

var _CanvasNest = require('./CanvasNest');

var _CanvasNest2 = _interopRequireDefault(_CanvasNest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getScriptConfig = function getScriptConfig() {
  var scripts = document.getElementsByTagName('script');
  var len = scripts.length;
  var script = scripts[len - 1]; 
  return {
    zIndex: script.getAttribute('zIndex'),
    opacity: script.getAttribute('opacity'),
    color: script.getAttribute('color'),
    pointColor: script.getAttribute('pointColor'),
    count: Number(script.getAttribute('count')) || 99
  };
}; 
new _CanvasNest2.default(document.body, getScriptConfig());