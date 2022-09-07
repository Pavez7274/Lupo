"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["dance"],
    type: "default",
    desc: "",
    run: async e => {
        var a = e.memb.displayName + " está bailando " + e.lappy.emotes.facha,
            t = await e.lappy.neko.img("dance"),
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