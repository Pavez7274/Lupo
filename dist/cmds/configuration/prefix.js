"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    names: [
        'setprefix',
        'prefix'
    ],
    fields: [{
            name: 'new',
            type: 'string',
            req: false
        }],
    desc: 'see or change my prefix on this server',
    type: 'default',
    run: async (d) => {
        if (!d.args.len)
            return d.msg.reply(`my prefix here is \`${await d.lappy.db.get('guild_prefix', d.gd.id, '?')}\``);
        if (d.memb.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator))
            return d.lappy.permsError(d, d.msg, ['administrator']);
        d.lappy.db.set('guild_prefix', d.gd.id, d.args.get(0));
        return d.msg.reply(`the prefix is \`${d.args.get(0)}\` rn, but you can still mention me or say \`lappy\` to use my commands`);
    }
};
//# sourceMappingURL=prefix.js.map