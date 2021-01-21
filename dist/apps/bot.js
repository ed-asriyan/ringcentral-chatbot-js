"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _models = require("../models");

var _handlers = require("../handlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createApp = (handle, options) => {
  const app = (0, _express.default)();
  app.all('/oauth', async (req, res) => {
    res.send('');
    const bot = await _models.Bot.init({
      code: req.query.code,
      token: req.body,
      ...options
    });
    bot.set(options);
    await bot.setupWebHook(); // this might take a while, depends on when the bot user is ready

    await handle({
      type: 'BotAdded',
      bot
    });
  });
  app.post('/webhook', async (req, res) => {
    res.header('Validation-Token', req.header('Validation-Token'));
    res.send('');
    const message = req.body;
    console.log('WebHook payload:', JSON.stringify(message));
    const body = message.body;

    if (body) {
      switch (body.eventType) {
        case 'Delete':
          {
            const deleteBot = await (0, _handlers.botDeleted)(message);
            await handle({
              type: 'BotRemoved',
              bot: deleteBot
            });
            break;
          }

        case 'PostAdded':
          {
            const result = await (0, _handlers.postAdded)(message);

            if (result) {
              await handle({
                type: 'Message4Bot',
                ...result
              });
            }

            break;
          }

        case 'GroupLeft':
          await (0, _handlers.groupLeft)(message);
          break;

        case 'GroupJoined':
          {
            const botId = message.ownerId;
            const joinGroupBot = await _models.Bot.findByPk(botId);
            const groupId = message.body.id;
            await handle({
              type: 'BotJoinGroup',
              bot: joinGroupBot,
              group: {
                id: groupId
              }
            });
            break;
          }

        default:
          break;
      }

      await handle({
        type: body.eventType,
        message
      });
    }
  });
  return app;
};

var _default = createApp;
exports.default = _default;
//# sourceMappingURL=bot.js.map