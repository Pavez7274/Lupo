"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'laugh'
    ],
    desc: 'riete, riata?.',
    type: 'default',
    run: async (d) => {
        let result = await d.lappy.neko.img('laugh'), embeds = d.lappy.makeEmbeds(d, {
            image: { url: result.url },
            title: `${d.memb.displayName} se rie`,
            footer: { text: `anime: ${result.anime_name}` }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=laugh.js.map