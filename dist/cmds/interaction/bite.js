"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["bite"],
    fields: [{
        name: "target",
        type: "memberResolvable",
        req: !0
    }],
    desc: "Bite someone",
    type: "default",
    run: async e => {
        if (!(t = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        if (t.id === e.lappy?.user?.id) return e.msg.reply(["ew, no.", "no."].random());
        if (t.id === e.author.id) return e.msg.reply(`that's s${"o".repeat(e.lappy.util.random(5,1))} pathetic`);
        var r = await e.lappy.neko.img("bite"),
            t = e.lappy.makeEmbeds(e, {
                image: {
                    url: r.url
                },
                title: e.memb.displayName + " muerde a " + t.displayName,
                footer: {
                    text: "anime: " + r.anime_name
                }
            });
        return e.msg.reply({
            embeds: t
        })
    }
};