"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'baka',
    ],
    type: 'default',
    desc: '',
    run: async (d) => {
        let title = `${d.memb.displayName} ${d.lappy.emotes.death}`;
        let result = await d.lappy.neko.img('baka'), embeds = d.lappy.makeEmbeds(d, {
            image: { url: result.url },
            title,
            footer: { text: `anime: ${result.anime_name}` }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=baka.js.map