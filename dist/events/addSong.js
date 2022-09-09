"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.name = void 0;
exports.name = 'addSong';
exports.type = 'music';
function run(lappy, queue, song) {
    song.metadata.msg.reply({
        embeds: lappy.makeEmbeds(song.metadata, {
            title: `${lappy.emotes.feli} | Song Added -> ${song.source}`,
            description: `**[ Song ]** -> [${song.name}](${song.url})${song.playlist ? `**[ PlayList ]** -> [${song.playlist.name}](${song.playlist.url})\n` : ''} 
**[ Uploader ]** -> [${song.uploader.name}](${song.uploader.url})
**[ Duration ]** -> \`${song.formattedDuration}\`
**[ Added By ]** -> ${song.member.toString()} ||${song.user.id}||
**[ Explicit ]** -> \`${song.age_restricted ? 'Yes' : 'No'}\`
**[ Views ]** -> \`${song.views?.toLocaleString() ?? 0}\``,
            thumbnail: { url: song.thumbail }
        })
    });
}
exports.run = run;
;
//# sourceMappingURL=addSong.js.map