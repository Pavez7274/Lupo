"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["userinfo", "user"],
    fields: [{
        name: "target",
        type: "USER",
        req: !1
    }],
    desc: "view a user's public information",
    type: "default",
    run: async e => {
        await e.gd.members.fetch();
        let t, a;
        if (!(t = e.args.len ? await e.lappy.util.findUser(e.lappy, e.args.string()) ?? await (await e.lappy.util.findMember(e.gd, e.args.string()))?.user : await e.author.fetch())) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        a = await e.gd.members.fetch(t.id).catch(() => {});
        let i = `**[ Snowflake ]** -> \`${t.id??"unknown"}\`
**[ Type ]** -> \`${t.system?"System":t.bot?"Bot":"User"}\`
${t.accentColor?`**[ Color ]** -> \`#${t.accentColor.toString(16)}\`
`:""}**[ Creation ]** -> <t:${Math.round(Number(t.createdAt)/1e3)}>
` + (a?.joinedAt ? `**[ Joined ]** -> <t:${Math.round(Number(a.joinedAt)/1e3)}>
` : "") + (a?.nickname ? `**[ Nickname ]** -> \`${a.nickname}\`
` : "");
        a?.presence?.activities && (i += a.presence.activities.map(e => 0 === e.type ? "**[ Playing ]** -> " + e.name : 2 === e.type ? `**[ Listening ]** -> ${e.name.toTitleCase()} -> \`${e.details}\` by **${e.state??"unknow"}**` : `**[ ${e.name} ]** -> ` + (e.emoji ? e.emoji.toString() + " " : "") + (e.details ?? e.state ?? "unknow")).join("\n"));
        var n = e.lappy.makeEmbeds(e, {
            title: `${e.lappy.emotes.tofu} | ${t.tag} Information`,
            description: i,
            thumbnail: {
                url: t.displayAvatarURL({
                    size: 1024,
                    dynamic: !0
                })
            }
        });
        return e.msg.reply({
            embeds: n
        })
    }
};