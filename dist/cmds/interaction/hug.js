"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["hug"],
    fields: [{
        name: "target",
        type: "memberResolvable",
        req: !0
    }],
    type: "default",
    desc: "hug someone >w<",
    run: async e => {
        if (!(a = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        var a = a.id === e.lappy?.user?.id ? e.memb.displayName + " are hugging me?! " + e.lappy.emotes.error : a.id === e.author.id ? e.memb.displayName + " is hugging him/herself -w-" : `${e.memb.displayName} is hugging ${a.displayName} ` + e.lappy.emotes.feli,
            r = await e.lappy.neko.img("hug"),
            r = e.lappy.makeEmbeds(e, {
                image: {
                    url: r.url
                },
                title: a,
                footer: {
                    text: "anime: " + r.anime_name
                }
            });
        return e.msg.reply({
            embeds: r
        })
    }
};