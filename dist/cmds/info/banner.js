"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["banner"],
    fields: [{
        name: "target",
        type: "userResolvable",
        req: !1
    }],
    desc: "see the banner of some user",
    type: "default",
    run: async e => {
        await e.gd.members.fetch();
        let t;
        if (!(t = e.args.len ? await e.lappy.util.findUser(e.lappy, e.args.string()) ?? (await e.lappy.util.findMember(e.gd, e.args.string()))?.user : await e.author.fetch())) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        var a = (a = t.bannerURL({
            size: 4096
        })) ? e.lappy.makeEmbeds(e, {
            title: e.lappy.emotes.tofu + " | " + t.tag,
            image: {
                url: a
            },
            url: a
        }) : e.lappy.makeEmbeds(e, {
            title: e.lappy.emotes.tofu + " | " + t.tag,
            description: t.accentColor ? `The user in question does not own an image in his banner, but the accent color he/she uses is **\`${"#"+t.accentColor.toString(16)}\`**` : "The user in question doesn't have a banner or accent color"
        });
        return e.msg.reply({
            embeds: a
        })
    }
};