"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'thumbsup',
        'like'
    ],
    type: 'default',
    desc: '',
    run: async (d) => {
        let title = `${d.memb.displayName} likes it ${d.lappy.emotes.facha}`;
        let result = await d.lappy.neko.img('thumbsup'), embeds = d.lappy.makeEmbeds(d, {
            image: { url: result.url },
            title,
            footer: { text: `anime: ${result.anime_name}` }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=thumbsup.js.map