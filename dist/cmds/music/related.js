"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["addrelated", "related", "ar"],
    desc: "adds a related song to the one that is playing",
    type: "default",
    voiceRequired: !0,
    run: async e => {
        let a = e.lappy.music.getQueue(e.gd);
        if (!a) return e.lappy.sendError(e, e.msg, "No Music", "I'm not in a voice chat");
        if (!a.playing && !a.paused) return e.lappy.sendError(e, e.msg, "No Music", "I'm not playing anything");
        let t = await a.addRelatedSong();
        (t.metadata = e).lappy.music.emit("addSong", a, t)
    }
};