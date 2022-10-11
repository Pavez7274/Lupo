"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["kick"],
    desc: "Kick someone",
    type: "default",
    run: async e => {
        if (!(a = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().cropAt(10)}']`);
        if (a.id === e.lappy?.user?.id) return e.msg.reply("*Dodge");
        if (a.id === e.author.id) return e.msg.reply("Why??");
        var r = await e.lappy.neko.img("kick"),
            a = e.lappy.makeEmbeds(e, {
                image: {
                    url: r.url
                },
                title: e.memb.displayName + " kicked " + a.displayName,
                footer: {
                    text: "anime: " + r.anime_name
                }
            });
        return e.msg.reply({
            embeds: a
        })
    }
};