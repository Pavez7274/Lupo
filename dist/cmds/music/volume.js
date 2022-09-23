"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["volume", "vol"],
    type: "default",
    fields: [{
        name: "new",
        type: "NUMBER",
        req: !1
    }],
    run: async e => {
        let r = e.lappy.music.getQueue(e.gd);
        return r ? e.args.len ? e.msg.reply(`The current volume is \`${r.volume}%\``) : (s = Number(e.args.get(0)), isNaN(s) || Math.floor(s) != s ? e.lappy.sendError(e, e.msg, "Field -> Type", "The field 1 ['new'] must be of type NUMBER") : (r.setVolume(200 < s ? 200 : s < 0 ? 0 : s), void e.msg.reply("Made It."))) : e.lappy.sendError(e, e.msg, "No Music", "I'm not in a voice chat");
        var s
    }
};