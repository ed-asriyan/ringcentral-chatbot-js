"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.botDeleted = void 0;

var _models = require("../models");

const botDeleted = async message => {
  const botId = message.body.extensionId;
  console.log(`Event: bot user ${botId} has been deleted`);
  const bot = await _models.Bot.findByPk(botId);
  await bot.remove();
  return bot;
};

exports.botDeleted = botDeleted;
//# sourceMappingURL=botDeleted.js.map