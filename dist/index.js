"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lupo_1 = require("./structures/Lupo");
require("./util/protos");
require("dotenv");
const client = new Lupo_1.Lupo();
client.start();
const promises_1 = require("fs/promises");
const marked_1 = require("marked");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app
    .get('/', (req, res) => {
    res.send('Just /owoify?text=STRING for now');
})
    .get('/doc/:cmd', (req, res) => {
    (0, promises_1.readFile)(process.cwd() + `/docs/${req.params.cmd}.md`, 'utf8')
        .then((data) => res.send((0, marked_1.marked)(data.toString())))
        .catch(() => res.send('File Not Found'));
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
    console.log(`[${'Server'.color('red')} -> ${'Status'.color('yellow')}] ${'Ready'.color('green')}`);
});
setInterval(async () => {
    try {
        (await Promise.resolve().then(() => __importStar(require('axios')))).get('https://pavez.ml/');
    }
    catch { }
    ;
}, 2e4);
//# sourceMappingURL=index.js.map