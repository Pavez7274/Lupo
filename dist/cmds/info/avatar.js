"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["avatar", "icon"],
    fields: [{
        name: "target",
        type: "userResolvable",
        req: !1
    }],
    desc: "see the avatar of some user",
    type: "default",
    run: async e => {
        let a, t;
        if (!(a = e.args.len ? await e.lappy.util.findUser(e.lappy, e.args.string()) : e.author)) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        t = await e.gd.members.fetch(a.id).catch(() => {});
        var r = (e.args.endIsFalse("global", !0) && t || a).displayAvatarURL({
                size: 4096
            }),
            r = e.lappy.makeEmbeds(e, {
                title: e.lappy.emotes.tofu + " | " + a.tag,
                url: r,
                image: {
                    url: r
                }
            });
        return e.msg.reply({
            embeds: r
        })
    },
    contextRun: async e => {
        var a = e.int.targetMember.displayAvatarURL({
            size: 4096
        });
        return e.int.reply({
            embeds: e.lappy.makeEmbeds(e, {
                title: e.lappy.emotes.tofu + " | " + e.int.targetUser.tag,
                image: {
                    url: a
                },
                url: a
            })
        })
    }
};