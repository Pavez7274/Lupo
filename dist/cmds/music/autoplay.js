"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["autoplay", "auto", "ap"],
    desc: "turn on/off autoplay mode",
    type: "default",
    voiceRequired: !0,
    run: async e => {
        let t = e.lappy.music.getQueue(e.gd);
        if (!t) return e.lappy.sendError(e, e.msg, "No Music", "I'm not in a voice chat");
        e.msg.reply("Autoplay turned " + (t.toggleAutoplay() ? "on" : "off"))
    }
};