"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lupo_1 = require("./structures/Lupo");
require("./util/protos");
const client = new Lupo_1.Lupo();
client.start();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', () => { });
app.listen(8080, () => {
    console.log('* [server] :: Ready');
});
//# sourceMappingURL=index.js.map