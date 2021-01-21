"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _sequelize2 = _interopRequireDefault(require("./sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Cache = _sequelize2.default.define('cache', {
  id: {
    // cache ID
    type: _sequelize.default.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  key: {
    // cache key
    type: _sequelize.default.STRING
  },
  value: {
    // cache value
    type: _sequelize.default.JSON
  }
});

var _default = Cache;
exports.default = _default;
//# sourceMappingURL=Cache.js.map