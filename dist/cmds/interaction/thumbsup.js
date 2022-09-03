"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["thumbsup", "like"],
    type: "default",
    desc: "",
    run: async e => {
        var a = e.memb.displayName + " likes it " + e.lappy.emotes.facha,
            t = await e.lappy.neko.img("thumbsup"),
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