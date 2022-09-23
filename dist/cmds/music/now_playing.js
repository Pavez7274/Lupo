"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["nowplaying", "np"],
    type: "default",
    run: async e => {
        var r = e.lappy.music.getQueue(e.gd);
        if (!r) return e.lappy.sendError(e, e.msg, "No Queue", "I'm not in a voice chat");
        if (!r.songs?.[0]) return e.lappy.sendError(e, e.msg, "No Song", "NO_PLAYING_ERROR");
        const t = r.songs[0];
        e.msg.reply({
            embeds: e.lappy.makeEmbeds(e, {
                title: e.lappy.emotes.feli + " | Song Info -> " + t.source,
                description: `**[ Name ]** -> [${t.name}](${t.url})${t.playlist?`
**[ PlayList ]** -> [${t.playlist.name}](${t.playlist.url})`:""} 
**[ Uploader ]** -> [${t.uploader.name}](${t.uploader.url})
**[ Duration ]** -> \`${t.formattedDuration}\`
**[ Added By ]** -> ${t.member?.toString()} ||${t.user?.id}||
**[ Explicit ]** -> \`${t.age_restricted?"Yes":"No"}\`
**[ Views ]** -> \`${t.views?.toLocaleString()??0}\``,
                thumbnail: {
                    url: t.thumbnail
                }
            })
        })
    }
};