"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["play", "p"],
    desc: "add a track",
    fields: [{
        name: "song",
        type: "string",
        req: !0
    }],
    voiceRequired: !0,
    type: "default",
    run: async e => {
        e.lappy.music.play(e.memb.voice.channel, e.args.string(), {
            textChannel: e.ch,
            member: e.memb,
            message: e.msg,
            metadata: e
        })
    }
};