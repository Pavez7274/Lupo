"use strict";

function run(e, t, s) {
    s.metadata.msg.reply({
        embeds: e.makeEmbeds(s.metadata, {
            title: e.emotes.feli + " | PlayList Added -> " + s.source,
            description: `**[ Name ]** -> [${s.name}](${s.url})
**[ Songs ]** -> ${s.songs.length}
**[ Duration ]** -> \`${s.formattedDuration}\`
**[ Added By ]** -> ${s.member?.toString()} ||${s.user?.id}||
**[ Explicit ]** -> \`${s.songs.some(e=>e.age_restricted)?"Yes":"No"}\``,
            thumbnail: {
                url: s.thumbnail
            }
        })
    })
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.run = exports.type = exports.name = void 0, exports.name = "addList", exports.type = "music", exports.run = run;