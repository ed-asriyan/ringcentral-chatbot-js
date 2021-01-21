"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = new _sequelize.default(process.env.RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI, {
  define: {
    timestamps: true
  },
  logging: false
});
var _default = sequelize;
exports.default = _default;
//# sourceMappingURL=sequelize.js.map