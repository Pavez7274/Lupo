"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["ping"],
    desc: "returns my latency",
    type: "default",
    run: e => {
        e.msg.reply(`${e.lappy.ws.ping??"WS_ERROR"}m/s`)
    }
};