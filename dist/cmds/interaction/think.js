"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["think"],
    type: "default",
    desc: "",
    run: async e => {
        var t = e.memb.displayName + " is thinking " + e.lappy.emotes.death,
            a = await e.lappy.neko.img("think"),
            t = e.lappy.makeEmbeds(e, {
                image: {
                    url: a.url
                },
                title: t,
                footer: {
                    text: "anime: " + a.anime_name
                }
            });
        return e.msg.reply({
            embeds: t
        })
    }
};