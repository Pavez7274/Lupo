"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["song_thumbnail"],
    type: "button",
    run: async e => {
        var t = e.lappy.makeEmbeds(e, {
            image: e.track.album.images[0]
        });
        return e.int.reply({
            embeds: t,
            ephemeral: !0
        })
    }
};