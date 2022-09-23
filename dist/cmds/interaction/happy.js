"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["happy"],
    type: "default",
    desc: "",
    run: async e => {
        var a = e.memb.displayName + " is happy " + e.lappy.emotes.feli,
            p = await e.lappy.neko.img("happy"),
            a = e.lappy.makeEmbeds(e, {
                image: {
                    url: p.url
                },
                title: a,
                footer: {
                    text: "anime: " + p.anime_name
                }
            });
        return e.msg.reply({
            embeds: a
        })
    }
};