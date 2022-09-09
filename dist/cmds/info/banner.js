"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'banner',
    ],
    fields: [{
            name: 'target',
            type: 'userResolvable',
            req: false
        }],
    desc: 'see the banner of some user',
    type: 'default',
    run: async (d) => {
        await d.gd.members.fetch();
        let user;
        if (d.args.len)
            user = await d.lappy.util.findUser(d.lappy, d.args.string()) ?? (await d.lappy.util.findMember(d.gd, d.args.string()))?.user;
        else
            user = await d.author.fetch();
        if (!user)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
        let url = user.bannerURL({ size: 4096 });
        if (url) {
            var embeds = d.lappy.makeEmbeds(d, {
                title: `${d.lappy.emotes.tofu} | ${user.tag}`,
                image: { url },
                url
            });
        }
        else {
            var embeds = d.lappy.makeEmbeds(d, {
                title: `${d.lappy.emotes.tofu} | ${user.tag}`,
                description: user.accentColor
                    ? `The user in question does not own an image in his banner, but the accent color he/she uses is **\`${'#' + user.accentColor.toString(16)}\`**`
                    : 'The user in question doesn\'t have a banner or accent color'
            });
        }
        ;
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=banner.js.map