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
    desc: "muerde a alguien",
    type: "default",
    run: async e => {
        if (!(r = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        if (r.id === e.lappy?.user?.id) return e.msg.reply(["ew, no.", "no."].random());
        if (r.id === e.author.id) return e.msg.reply(`that's s${"o".repeat(e.lappy.util.random(5,1))} pathetic`);
        var a = await e.lappy.neko.img("bite"),
            r = e.lappy.makeEmbeds(e, {
                image: {
                    url: a.url
                },
                title: e.memb.displayName + " muerde a " + r.displayName,
                footer: {
                    text: "anime: " + a.anime_name
                }
            });
        return e.msg.reply({
            embeds: r
        })
    }
};