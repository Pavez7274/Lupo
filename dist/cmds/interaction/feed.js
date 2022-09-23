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
    desc: "feed",
    type: "default",
    run: async e => {
        if (!(t = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        if (t.id === e.lappy?.user?.id) return e.msg.reply(["you can't feed me", "I'd rather starve to deaths", "no.", "of course, when communism works"].random());
        if (t.id === e.author.id) return e.msg.reply("don't you've someone to do it for you?");
        var r = await e.lappy.neko.img("feed"),
            t = e.lappy.makeEmbeds(e, {
                image: {
                    url: r.url
                },
                title: `${e.memb.displayName} feeds ${t.displayName} ` + e.lappy.emotes.food,
                footer: {
                    text: "anime: " + r.anime_name
                }
            });
        return e.msg.reply({
            embeds: t
        })
    }
};