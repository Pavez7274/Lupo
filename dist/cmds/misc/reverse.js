"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["reverse", "invert"],
    fields: [{
        name: "text",
        type: "string",
        req: !0
    }],
    desc: "invert a text",
    type: "default",
    run: e => {
        e.msg.reply(e.args.string().split("").reverse().join(""))
    }
};