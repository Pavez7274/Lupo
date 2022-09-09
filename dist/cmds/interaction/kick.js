"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'kick'
    ],
    desc: 'patea a quien quieras.',
    type: 'default',
    run: async (d) => {
        let snowy = await d.lappy.util.findMember(d.gd, d.args.string());
        if (!snowy)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
        if (snowy.id === d.lappy?.user?.id) {
            return d.msg.reply('*lo esquiva');
        }
        else if (snowy.id === d.author.id) {
            return d.msg.reply('pq te quieres golpear a ti mismo');
        }
        ;
        let result = await d.lappy.neko.img('kick'), embeds = d.lappy.makeEmbeds(d, {
            image: { url: result.url },
            title: `${d.memb.displayName} patea a ${snowy.displayName}`,
            footer: { text: `anime: ${result.anime_name}` }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=kick.js.map