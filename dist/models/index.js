"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Bot", {
  enumerable: true,
  get: function () {
    return _Bot.default;
  }
});
Object.defineProperty(exports, "Service", {
  enumerable: true,
  get: function () {
    return _Service.default;
  }
});
Object.defineProperty(exports, "Cache", {
  enumerable: true,
  get: function () {
    return _Cache.default;
  }
});
exports.setupDatabase = void 0;

var _Bot = _interopRequireDefault(require("./Bot"));

var _Service = _interopRequireDefault(require("./Service"));

var _Cache = _interopRequireDefault(require("./Cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setupDatabase = async (force = false) => {
  await _Bot.default.sync({
    force
  });
  await _Service.default.sync({
    force
  });
  await _Cache.default.sync({
    force
  });
};

exports.setupDatabase = setupDatabase;
//# sourceMappingURL=index.js.map