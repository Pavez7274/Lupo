"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["blush", "flush"],
    type: "default",
    desc: "",
    run: async e => {
        var a = e.memb.displayName + " se sonroja " + e.lappy.emotes.luv,
            s = await e.lappy.neko.img("blush"),
            a = e.lappy.makeEmbeds(e, {
                image: {
                    url: s.url
                },
                title: a,
                footer: {
                    text: "anime: " + s.anime_name
                }
            });
        return e.msg.reply({
            embeds: a
        })
    }
};