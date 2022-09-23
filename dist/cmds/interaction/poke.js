"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["poke"],
    fields: [{
        name: "target",
        type: "memberResolvable",
        req: !0
    }],
    type: "default",
    desc: "no desc",
    run: async e => {
        if (!(a = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        var a = a.id === e.lappy?.user?.id ? e.memb.displayName + " are pat me " + e.lappy.emotes.luv : a.id === e.author.id ? e.memb.displayName + "'s pats him/herself -w-" : e.memb.displayName + " fastidia a " + a.displayName,
            s = await e.lappy.neko.img("poke"),
            s = e.lappy.makeEmbeds(e, {
                image: {
                    url: s.url
                },
                title: a,
                footer: {
                    text: "anime: " + s.anime_name
                }
            });
        return e.msg.reply({
            embeds: s
        })
    }
};