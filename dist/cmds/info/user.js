"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findUser_1 = require("../../util/findUser");
exports.default = {
    names: [
        'userinfo',
        'user'
    ],
    fields: [{
            name: 'target',
            type: 'userResolvable',
            req: false
        }],
    run: async (d) => {
        await d.gd.members.fetch();
        let user;
        if (d.args.len)
            user = await (0, findUser_1.findUser)(d.lappy, d.args.string());
        else
            user = d.author;
        if (!user)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
        let embeds = d.lappy.makeEmbeds(d, {
            title: user.tag + ' information',
            description: `**[IDENTIFIER]** :: \`${user.id}\`\n**[CREATION]** :: <t:${Number(user.createdAt) / 1000}>\n**[TAG]** :: \`${user.tag}\``,
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=user.js.map