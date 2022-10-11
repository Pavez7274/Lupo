"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["skip"],
    desc: "jump to the next track",
    type: "default",
    voiceRequired: !0,
    run: async e => {
        var s = e.lappy.music.getQueue(e.gd);
        return s ? s.songs?.[1] && s.autoplay ? e.lappy.music.skip(e.gd) : e.lappy.sendError(e, e.msg, "No Queue", "No songs on hold") : e.lappy.sendError(e, e.msg, "No Music", "I'm not in a voice chat")
    }
};