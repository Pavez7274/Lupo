"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["laugh"],
    desc: "riete, riata?.",
    type: "default",
    run: async e => {
        var a = await e.lappy.neko.img("laugh"),
            a = e.lappy.makeEmbeds(e, {
                image: {
                    url: a.url
                },
                title: e.memb.displayName + " se rie",
                footer: {
                    text: "anime: " + a.anime_name
                }
            });
        return e.msg.reply({
            embeds: a
        })
    }
};