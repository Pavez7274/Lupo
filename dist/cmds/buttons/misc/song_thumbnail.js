"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'song_thumbnail'
    ],
    type: 'button',
    run: async (d) => {
        const embeds = d.lappy.makeEmbeds(d, {
            image: d.track.album.images[0]
        });
        return d.int.reply({ embeds, ephemeral: true });
    }
};
//# sourceMappingURL=song_thumbnail.js.map