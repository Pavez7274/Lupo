"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["shuffle"],
    desc: "shuffle the tracks",
    type: "default",
    voiceRequired: !0,
    run: async e => e.lappy.music.getQueue(e.gd) ? (e.msg.reply("Made It"), e.lappy.music.shuffle(e.gd)) : e.lappy.sendError(e, e.msg, "No Music", "I'm not in a voice chat")
};