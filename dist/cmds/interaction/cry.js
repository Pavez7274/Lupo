"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["cry", "sob"],
    type: "default",
    desc: "",
    run: async e => {
        var a = e.memb.displayName + " llora " + e.lappy.emotes.death,
            t = await e.lappy.neko.img("cry"),
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