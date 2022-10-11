"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["feed"],
    fields: [{
        name: "target",
        type: "memberResolvable",
        req: !0
    }],
    desc: "Feed someone",
    type: "default",
    run: async e => {
        if (!(r = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        if (r.id === e.lappy?.user?.id) return e.msg.reply(["I won't eat that", "I prefer to eat shit", "No.", "And how do I know that isn't poisoned?"].random());
        if (r.id === e.author.id) return e.msg.reply("don't you've someone to do it for you?");
        var t = await e.lappy.neko.img("feed"),
            r = e.lappy.makeEmbeds(e, {
                image: {
                    url: t.url
                },
                title: `${e.memb.displayName} feeds ${r.displayName} ` + e.lappy.emotes.food,
                footer: {
                    text: "anime: " + t.anime_name
                }
            });
        return e.msg.reply({
            embeds: r
        })
    }
};