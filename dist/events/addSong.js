"use strict";

function run(e, t, r) {
    r.metadata.msg.reply({
        embeds: e.makeEmbeds(r.metadata, {
            title: e.emotes.feli + " | Song Added -> " + r.source,
            description: `**[ Name ]** -> [${r.name}](${r.url})${r.playlist?`**[ PlayList ]** -> [${r.playlist.name}](${r.playlist.url})
`:""} 
**[ Uploader ]** -> [${r.uploader.name}](${r.uploader.url})
**[ Duration ]** -> \`${r.formattedDuration}\`
**[ Added By ]** -> ${r.member?.toString()} ||${r.user?.id}||
**[ Explicit ]** -> \`${r.age_restricted?"Yes":"No"}\`
**[ Views ]** -> \`${r.views?.toLocaleString()??0}\``,
            thumbnail: {
                url: r.thumbnail
            }
        })
    })
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.run = exports.type = exports.name = void 0, exports.name = "addSong", exports.type = "music", exports.run = run;