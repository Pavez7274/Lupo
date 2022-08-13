"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["pat"],
    fields: [{
        name: "target",
        type: "memberResolvable",
        req: !0
    }],
    type: "default",
    desc: "pat someone!!",
    run: async e => {
        var a = await e.lappy.util.findMember(e.gd, e.args.string());
        return a ? (a = a.id === e.lappy?.user?.id ? e.memb.displayName + " are pat me " + e.lappy.emotes.luv : a.id === e.author.id ? e.memb.displayName + "'s pats him/herself -w-" : `${e.memb.displayName}'s pats ${a.displayName} ` + e.lappy.emotes.feli, a = e.lappy.makeEmbeds(e, {
            image: await e.lappy.neko.img("pat"),
            title: a
        }), e.msg.reply({
            embeds: a
        })) : e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`)
    }
};