"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["baka"],
    type: "default",
    desc: "",
    run: async e => {
        var a = e.memb.displayName + " " + e.lappy.emotes.death,
            t = await e.lappy.neko.img("baka"),
            a = e.lappy.makeEmbeds(e, {
                image: {
                    url: t.url
                },
                title: a,
                footer: {
                    text: "anime: " + t.anime_name
                }
            });
        return e.msg.reply({
            embeds: a
        })
    }
};