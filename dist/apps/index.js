"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bot = _interopRequireDefault(require("./bot"));

var _admin = _interopRequireDefault(require("./admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createApp = (handle, options, skills = []) => {
  const mergedHandle = async event => {
    let handled = false;

    if (handle) {
      handled = await handle(event, handled);
    }

    for (const skill of skills) {
      if (skill.handle) {
        const result = await skill.handle(event, handled);
        handled = handled || result;
      }
    }
  };

  const app = (0, _express.default)();
  app.use((0, _morgan.default)('tiny'));
  app.use(_express.default.json());
  app.use(_express.default.urlencoded({
    extended: true
  }));
  app.use('/admin', (0, _admin.default)(mergedHandle, options));
  app.use('/bot', (0, _bot.default)(mergedHandle, options));

  for (const skill of skills) {
    if (skill.app) {
      app.use('/', skill.app);
    }
  }

  app.mergedHandle = mergedHandle; // for unit testing

  const listen = app.listen.bind(app);

  app.listen = (port, callback) => {
    console.log(`Bot service listening on port ${port}
Please set your RingCentral app redirect URI to ${options.host}/bot/oauth`);
    listen(port, callback);
  };

  return app;
};

var _default = createApp;
exports.default = _default;
//# sourceMappingURL=index.js.map