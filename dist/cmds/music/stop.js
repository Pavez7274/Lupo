"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["stop"],
    desc: "stops all tracks",
    type: "default",
    voiceRequired: !0,
    run: async e => e.lappy.music.getQueue(e.gd) ? (e.msg.reply("Stopping the music and leaving the voice channel..."), e.lappy.music.stop(e.gd)) : e.lappy.sendError(e, e.msg, "No Music", "I'm not in a voice chat")
};