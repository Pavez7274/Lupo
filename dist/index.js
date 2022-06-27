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
app
    .get('/', (req, res) => {
    res.send('Just /owoify?text=STRING for now');
})
    .get('/owoify', (req, res) => {
    if (!req.query.text)
        res.json({
            msg: 'hey shitty dev, you forgot to provide a text'.OwOIfy()
        });
    res.json({
        msg: req.query.text.OwOIfy()
    });
});
app.listen(8080, () => {
    console.log('* [server] :: Ready');
});
//# sourceMappingURL=index.js.map