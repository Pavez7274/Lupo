"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["kick"],
    desc: "patea a quien quieras.",
    type: "default",
    run: async e => {
        if (!(r = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        if (r.id === e.lappy?.user?.id) return e.msg.reply("*lo esquiva");
        if (r.id === e.author.id) return e.msg.reply("pq te quieres golpear a ti mismo");
        var a = await e.lappy.neko.img("kick"),
            r = e.lappy.makeEmbeds(e, {
                image: {
                    url: a.url
                },
                title: e.memb.displayName + " patea a " + r.displayName,
                footer: {
                    text: "anime: " + a.anime_name
                }
            });
        return e.msg.reply({
            embeds: r
        })
    }
};