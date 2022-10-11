"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["laugh"],
    type: "default",
    run: async e => {
        var a = await e.lappy.neko.img("laugh"),
            a = e.lappy.makeEmbeds(e, {
                image: {
                    url: a.url
                },
                title: e.memb.displayName + " laughs " + (30 == e.random(50) ? "until a lung explodes" : ""),
                footer: {
                    text: "anime: " + a.anime_name
                }
            });
        return e.msg.reply({
            embeds: a
        })
    }
};