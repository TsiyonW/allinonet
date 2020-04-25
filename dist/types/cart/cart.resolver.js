"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cart_1 = require("../../db/models/Cart");
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });
var cheerio = require('cheerio');
// return all the items in the cart
exports.myCart = function (_, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var data, searchResult, $;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = [];
                return [4 /*yield*/, nightmare
                        .goto('https://www.amazon.com')
                        .type('#twotabsearchtextbox', 'bag')
                        .click('input.nav-input')
                        .wait('.s-desktop-content')
                        .evaluate(function () {
                        var element = document.querySelector('.s-desktop-content');
                        return element.innerHTML;
                    })
                        .end()
                    // if(searchResult){
                ];
            case 1:
                searchResult = _a.sent();
                $ = cheerio.load(searchResult);
                // var element = $('.sg-col-inner')
                $('div[data-component-type = "s-search-result"]').each(function (i, elem) { return __awaiter(void 0, void 0, void 0, function () {
                    var items, item, itemD, itemInDb;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                items = $.html(elem);
                                item = cheerio.load(items);
                                itemD = {};
                                itemD.user_id = 1;
                                itemD.site = item('h2 a.a-text-normal').get(0).attribs.href;
                                itemD.description = item('a.a-text-normal span.a-text-normal').text().trim();
                                itemD.unitPrice = item('.a-offscreen').text().trim();
                                itemD.rating = item('i span.a-icon-alt').text().trim();
                                itemD.image = item('img').get(0).attribs.src;
                                itemD.item = "some item";
                                itemD.quantity = 1;
                                itemD.measurementUnit = "peace";
                                data.push(itemD);
                                return [4 /*yield*/, Cart_1.CartDB.Cart.query().insert(__assign({}, itemD))];
                            case 1:
                                itemInDb = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Cart_1.CartDB.Cart.query().where('user_id', '=', '1')
                    // }
                    // console.log("something wrong")
                ];
            case 2: 
            // console.log($('a.a-text-normal').get(3).attribs.href)
            // console.log(data)
            return [2 /*return*/, _a.sent()
                // }
                // console.log("something wrong")
            ];
        }
    });
}); };
//get specific item in the cart using id
exports.cart = function (_, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var cartItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Cart_1.CartDB.Cart.query().findById(args.id)];
            case 1:
                cartItem = _a.sent();
                return [2 /*return*/, cartItem];
        }
    });
}); };
// add item to cart
var addToCart = function (_, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Cart_1.CartDB.Cart.query().insert(__assign(__assign({}, args.input), { user_id: ctx.user.id }))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// removes item from the cart
var removeFromCart = function (_, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Cart_1.CartDB.Cart.query().deleteById(args.id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// remove all items from the cart
var emptyCart = function (_, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Cart_1.CartDB.Cart.query().delete().where('user_id', '=', args.user_id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// update items from cart /updating the quantity of items to add to a cart/
var updateCart = function (_, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Cart_1.CartDB.Cart.query().patchAndFetchById(args.id, args.input)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.default = {
    Query: {
        myCart: exports.myCart,
        cart: exports.cart
    },
    Mutation: {
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        emptyCart: emptyCart,
        updateCart: updateCart
    }
};
