"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'feed',
    ],
    fields: [{
            name: 'target',
            type: 'memberResolvable',
            req: true
        }],
    desc: 'feed',
    type: 'default',
    run: async (d) => {
        let snowy = await d.lappy.util.findMember(d.gd, d.args.string());
        if (!snowy)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
        if (snowy.id === d.lappy?.user?.id) {
            return d.msg.reply([
                "you can't feed me",
                "I'd rather starve to deaths",
                'no.',
                'of course, when communism works'
            ].random());
        }
        else if (snowy.id === d.author.id) {
            return d.msg.reply(`don't you've someone to do it for you?`);
        }
        ;
        let result = await d.lappy.neko.img('feed'), embeds = d.lappy.makeEmbeds(d, {
            image: { url: result.url },
            title: `${d.memb.displayName} feeds ${snowy.displayName} ${d.lappy.emotes.food}`,
            footer: { text: `anime: ${result.anime_name}` }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=feed.js.map