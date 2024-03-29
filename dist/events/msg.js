"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.run = exports.type = exports.name = void 0;
const discord_js_1 = require("discord.js"),
    Arguments_1 = require("../structures/Arguments");
async function run(o, a) {
    if (!a.author.bot && a.channel.permissionsFor(await a.guild.members.fetchMe()).has(discord_js_1.PermissionFlagsBits.SendMessages) && !(await a.guild.members.fetchMe()).isCommunicationDisabled()) {
        await a.guild.members.fetch()?.catch(() => {});
        const d = [await o.db.get("guild_prefix", a.guild.id, "?"), `<@${o?.user?.id}>`, `<@!${o?.user?.id}>`, "lappy"],
            r = await d.find(e => a.content.toLowerCase().startsWith(e)) || "";
        let {
            channel: s,
            guild: t,
            author: i,
            member: n
        } = a, e = new Arguments_1.Arguments(a, r);
        if (i = await i.fetch() ?? i, d.slice(1).includes(a.content.trim())) return a.reply("my prefix here is `".concat(d[0].concat("`")));
        if (r) {
            let r = e.shift()?.replace(/-/g, "");
            const c = o.cmds.default.find(e => e.names.includes(r?.toLowerCase()));
            if (c) {
                if (c.dev && !o.owners.includes(i.id) || o.owners.includes(i.id) && e.endIsTrue("--dev-error")) return o.permsError({
                    author: i
                }, a, ["developer"]);
                if ("perms" in c && c.perms?.map(e => n.permissionsIn(s).has(discord_js_1.PermissionFlagsBits[e]))?.some(e => !e)) return o.permsError({
                    author: i
                }, a, c.perms);
                if (c.voiceRequired && !n.voice?.channel) return o.sendError({
                    author: i
                }, a, "Voice Required", "You must be on a voice channel to use this command");
                if ("bot_perms" in c && c.bot_perms?.map(async e => (await t.members.fetchMe())?.permissionsIn(s)?.has(discord_js_1.PermissionFlagsBits[e]))?.some(e => !e)) return o.permsError({
                    author: o.user
                }, a, c.bot_perms);
                var u, m = c?.fields?.filter(e => e.req) || [];
                if (m.length > e.len) return u = m.length - e.len, o.sendError({
                    author: i
                }, a, "Field", `Field ${u} ['${m[u-1]?.name||"unknown"}'] Cannot Be Empty
Correct use: '${e.prefix}${c.names[0]} ${c.parsedFields}'`);
                try {
                    return await c.run({
                        ...o.util,
                        command: c,
                        prefixes: d,
                        lappy: o,
                        author: i,
                        memb: n,
                        args: e,
                        cmd: r,
                        msg: a,
                        ch: s,
                        gd: t
                    })
                } catch (e) {
                    return console.log(e), o.sendError({
                        author: i
                    }, a, e.name, e.stack)
                }
            }
        }
    }
}
exports.name = "messageCreate", exports.type = "dsc", exports.run = run;