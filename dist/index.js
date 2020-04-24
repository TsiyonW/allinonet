"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var express_1 = __importDefault(require("express"));
var schema_1 = require("./utils/schema");
var user_resolver_1 = __importDefault(require("./types/user/user.resolver"));
var ecommerceaccount_resolver_1 = __importDefault(require("./types/ecommerceaccount/ecommerceaccount.resolver"));
var cart_resolver_1 = __importDefault(require("./types/cart/cart.resolver"));
var lodash_1 = require("lodash");
require('dotenv').config();
var bodyParser = require('body-parser');
// let bot = require('./utils/common')
var app = express_1.default();
app.use(bodyParser.json());
// let bot = new BotService();
//   BotService.startBot();
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.schemas,
    resolvers: lodash_1.merge({}, user_resolver_1.default, cart_resolver_1.default, ecommerceaccount_resolver_1.default)
});
server.applyMiddleware({ app: app });
app.get('/', function (req, res) {
    res.send({
        name: "Tsiyon",
        age: 22
    });
});
app.listen({ process: process, : .env.PORT } || { port: 3000 }, function () {
    console.log("Server ready at http://localhost:3000" + server.graphqlPath);
});
//   app.post('/' + bot.token, function (req, res) {
//     console.log(bot.token)
//     bot.processUpdate(req.body);
//     res.sendStatus(200);
//   });
