"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, r, o) {
        void 0 === o && (o = r), Object.defineProperty(e, o, {
            enumerable: !0,
            get: function() {
                return t[r]
            }
        })
    } : function(e, t, r, o) {
        e[o = void 0 === o ? r : o] = t[r]
    }),
    __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        })
    } : function(e, t) {
        e.default = t
    }),
    __importStar = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && __createBinding(t, e, r);
        return __setModuleDefault(t, e), t
    },
    __importDefault = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const Lupo_1 = require("./structures/Lupo"),
    client = (require("./util/protos"), require("dotenv"), new Lupo_1.Lupo),
    promises_1 = (client.start(), require("fs/promises")),
    marked_1 = require("marked"),
    express_1 = __importDefault(require("express")),
    app = (0, express_1.default)();
app.get("/", (e, t) => {
    t.send("Just /owoify?text=STRING for now")
}).get("/doc/:cmd", (e, t) => {
    (0, promises_1.readFile)(process.cwd() + `/docs/${e.params.cmd}.md`, "utf8").then(e => t.send((0, marked_1.marked)(e.toString()))).catch(() => t.send("File Not Found"))
}).get("/owoify", (e, t) => {
    e.query.text || t.json({
        msg: "hey shitty dev, you forgot to provide a text".OwOIfy()
    }), t.json({
        msg: e.query.text.OwOIfy()
    })
}), app.listen(8080, () => {
    console.log(`[${"Server".color("red")} -> ${"Status".color("yellow")}] ` + "Ready".color("green"))
}), setInterval(async () => {
    try {
        (await Promise.resolve().then(() => __importStar(require("axios")))).get("https://pavez.ml/")
    } catch {}
}, 2e4);