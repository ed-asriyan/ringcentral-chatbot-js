"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupLeft = void 0;

var _models = require("../models");

const groupLeft = async message => {
  const botId = message.ownerId;
  const groupId = message.body.id;
  await _models.Service.destroy({
    where: {
      botId,
      groupId
    }
  });
};

exports.groupLeft = groupLeft;
//# sourceMappingURL=groupLeft.js.map