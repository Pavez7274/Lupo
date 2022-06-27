"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findUser_1 = require("../../util/findUser");
exports.default = {
    names: [
        'avatar',
        'icon'
    ],
    type: 'default',
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
        let url = user.displayAvatarURL({ size: 4096, dynamic: true }), embeds = d.lappy.makeEmbeds(d, {
            title: user.tag,
            url,
            image: {
                url
            }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=avatar.js.map