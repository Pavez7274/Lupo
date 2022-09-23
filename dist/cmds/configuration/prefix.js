"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const discord_js_1 = require("discord.js");
exports.default = {
    names: ["setprefix", "prefix"],
    fields: [{
        name: "new",
        type: "STRING",
        req: !1
    }],
    desc: "see or change my prefix on this server",
    type: "default",
    run: async e => e.args.len ? e.memb.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator) ? e.lappy.permsError(e, e.msg, ["administrator"]) : (e.lappy.db.set("guild_prefix", e.gd.id, e.args.get(0)), e.msg.reply(`the prefix is \`${e.args.get(0)}\` rn, but you can still mention me or say \`lappy\` to use my commands`)) : e.msg.reply(`my prefix here is \`${await e.lappy.db.get("guild_prefix",e.gd.id,"?")}\``)
};