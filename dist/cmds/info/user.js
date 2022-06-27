"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findUser_1 = require("../../util/findUser");
exports.default = {
    names: [
        'userinfo',
        'user'
    ],
    type: 'default',
    fields: [{
            name: 'target',
            type: 'userResolvable',
            req: false
        }],
    run: async (d) => {
        await d.gd.members.fetch();
        let user, member;
        if (d.args.len)
            user = await (0, findUser_1.findUser)(d.lappy, d.args.string());
        else
            user = await d.author.fetch();
        if (!user)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
        member = await d.gd.members.fetch(user.id).catch(() => { });
        let msg = [
            `**[TAG]** :: \`${user.tag}\``,
            `**[IDENTIFIER]** :: \`${user.id}\``,
            `**[TYPE]** :: \`${user.bot ? 'Bot' : user.system ? 'System' : 'User'}\``,
            `**[COLOR]** :: \`${user.accentColor ? '#' + user.accentColor.toString(16) : 'None'}\``,
            `**[CREATION]** :: <t:${Math.round(Number(user.createdAt) / 1000)}>`,
        ];
        if (member) {
            member.joinedAt && msg.push(`**[JOINED]** :: <t:${Math.round(Number(member.joinedAt) / 1000)}>`);
            member.nickname && msg.unshift(`**[NICK]** :: \`${member.nickname}\``);
        }
        ;
        let embeds = d.lappy.makeEmbeds(d, {
            title: user.tag + ' information',
            description: msg.join('\n')
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=user.js.map