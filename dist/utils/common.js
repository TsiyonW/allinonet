"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot;
var BotService = /** @class */ (function () {
    function BotService() {
    }
    BotService.startBot = function () {
        //let bot;
        var TelegramBot = require('node-telegram-bot-api');
        //token given from telegram botfather
        var token = process.env.BOT_TOKEN;
        console.log(token);
        if (process.env.NODE_ENV === 'production') {
            bot = new TelegramBot(token);
            bot.setWebHook(process.env.HEROKU_URL + bot.token);
        }
        else {
            bot = new TelegramBot(token, { polling: true });
        }
    };
    return BotService;
}());
exports.BotService = BotService;
module.exports = bot;
