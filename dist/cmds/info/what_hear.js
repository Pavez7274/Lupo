"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios = __importStar(require("axios"));
function pad(n, z = 2) {
    return ('00' + n).slice(-z);
}
;
function parse(ms) {
    return pad((ms % 3.6e6) / 6e4 | 0) + ':' + pad((ms % 6e4) / 1e3 | 0);
}
;
exports.default = {
    names: [
        'whatlisten',
        'whathear',
        'wl'
    ],
    context: 'what listen',
    fields: [{
            name: 'target',
            type: 'userResolvable',
            req: false
        }],
    description: 'returns information about the song that a user hears (only supports spotify)',
    type: 'default',
    run: async (d) => {
        let memb = d.args.get(0)
            ? await d.lappy.util.findMember(d.gd, d.args.string())
            : await d.memb.fetch();
        if (!memb)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().cropAt(10)}']`);
        let activities = memb.presence?.activities;
        if (!activities || !activities?.some(({ name }) => name === 'Spotify'))
            return d.lappy.sendError(d, d.msg, 'No Music', `${memb.user.id === d.author.id ? 'u aren\'t' : 'This user isn\'t'} listening anything or I can't see it`);
        let activity = activities?.find(({ name }) => name === 'Spotify');
        let track = (await d.lappy.spotify.search({ q: activity?.details }))?.tracks.items
            .find((item) => item.name === activity?.details && (item.artists.every(({ name }) => activity?.state?.includes(name))));
        if (!track)
            return d.lappy.sendError(d, d.msg, 'not found', `I couldn't find the song ['${activity.details ?? 'unknown'}']`);
        let embeds = d.lappy.makeEmbeds(d, {
            title: `${d.lappy.emotes.spotify} | What does ${memb.user.id === d.author.id ? 'u' : memb.displayName} listen to?`,
            description: `**Song** :: [${track.name}](${track.external_urls.spotify})
**Artists** :: ${track.artists.map((art) => `[${art.name}](${art.external_urls.spotify})`).join(' | ')}
**${track.album.type.toTitleCase()}** :: [${track.album.name}](${track.album.external_urls.spotify})
**Duration** :: ${parse(Date.now() - activity?.timestamps?.start)} / ${parse(track.duration_ms)}
**Explicit** :: ${track.explicit ? 'Yes' : 'No'}

[Click here to listen a preview](${track.preview_url})`,
            thumbnail: { url: track.album.images[0].url }
        }), components = [new discord_js_1.ActionRowBuilder()], lyrics = await axios.get('https://makeitpersonal.co/lyrics', {
            params: {
                artist: track.artists[0].name,
                title: track.name
            }
        }).catch(() => { });
        lyrics &&= lyrics.data;
        components[0].setComponents(new discord_js_1.ButtonBuilder().setCustomId('songThumbnail').setLabel('Get Thumbnail').setStyle(1), new discord_js_1.ButtonBuilder().setCustomId('songLyrics').setLabel('Get Lyrics').setStyle(1).setDisabled(!lyrics));
        const msg = await d.msg.reply({ embeds, components });
        msg.createMessageComponentCollector({
            filter: ({ customId }) => ['songThumbnail', 'songLyrics'].includes(customId),
            componentType: 2,
            time: 6e4
        })
            .on('collect', (int) => {
            if (int.customId === 'songLyrics' && !!lyrics) {
                let chunkedLyrics = lyrics.trim().split(/\n/).chunk(20);
                chunkedLyrics = chunkedLyrics.map((chunk, index) => d.lappy.makeEmbeds(d, {
                    title: `:musical_score: | Lyrics - ${track.name}`,
                    description: `${chunk.join('\n').toCodeBlock()}\n\n**Page ${index + 1} of ${chunkedLyrics.length}**`,
                    thumbnail: { url: track.album.images[0].url }
                })[0]);
                return d.paginator(d, int, chunkedLyrics, 6e4, true);
            }
            ;
            let data = { int, track, ...d };
            d.lappy.cmds.button.get('song_thumbnail').run(data);
        })
            .on('end', () => {
            components[0].components[0].setDisabled(true);
            components[0].components[1].setDisabled(true);
            msg.edit({ components });
        });
    },
    contextRun: async (d) => {
        let activities = d.int.targetMember.presence?.activities;
        if (!activities || !activities?.some(({ name }) => name === 'Spotify'))
            return d.lappy.sendError({ ...d, ephemeral: true }, d.int, 'No Music', `${d.int.targetMember.user.id === d.int.user.id ? 'u aren\'t' : 'This user isn\'t'} listening anything or I can't see it`, d.int.user);
        let activity = activities?.find(({ name }) => name === 'Spotify'), track = (await d.lappy.spotify.search({ q: activity?.details, type: 'track' }))?.tracks.items
            .find((item) => item.name === activity?.details && (item.artists.every(({ name }) => activity?.state?.includes(name))));
        if (!track)
            return d.lappy.sendError({ ...d, ephemeral: true }, d.int, 'not found', `I couldn't find the song ['${activity.details ?? 'unknown'}']`, d.int.user);
        let embeds = d.lappy.makeEmbeds(d, {
            title: `${d.lappy.emotes.spotify} | What does ${d.int.targetMember.user.id === d.int.user.id ? 'u' : d.int.targetMember.displayName} listen to?`,
            description: `**Song** :: [${track.name}](${track.external_urls.spotify})
**Artists** :: ${track.artists.map((art) => `[${art.name}](${art.external_urls.spotify})`).join(' | ')}
**${track.album.type.toTitleCase()}** :: [${track.album.name}](${track.album.external_urls.spotify})
**Duration** :: ${parse(Date.now() - activity?.timestamps?.start)} / ${parse(track.duration_ms)}
**Explicit** :: ${track.explicit ? 'Yes' : 'No'}

[Click here to listen a preview](${track.preview_url})`,
            thumbnail: { url: track.album.images[0].url }
        }), components = [new discord_js_1.ActionRowBuilder()], lyrics = await axios.get('https://makeitpersonal.co/lyrics', {
            params: {
                artist: track.artists[0].name,
                title: track.name
            }
        }).catch(() => { });
        lyrics &&= lyrics.data;
        components[0].setComponents(new discord_js_1.ButtonBuilder().setCustomId('songThumbnail').setLabel('Get Thumbnail').setStyle(1), new discord_js_1.ButtonBuilder().setCustomId('songLyrics').setLabel('Get Lyrics').setStyle(1).setDisabled(!lyrics));
        const msg = await d.int.reply({ embeds, components });
        msg.createMessageComponentCollector({
            filter: ({ customId }) => ['songThumbnail', 'songLyrics'].includes(customId),
            componentType: 2,
            time: 6e4
        })
            .on('collect', (i) => {
            if (i.customId === 'songLyrics' && !!lyrics) {
                let chunkedLyrics = lyrics.trim().split(/\n/).chunk(20);
                chunkedLyrics = chunkedLyrics.map((chunk, index) => d.lappy.makeEmbeds(d, {
                    title: `:musical_score: | Lyrics - ${track.name}`,
                    description: `${chunk.join('\n').toCodeBlock()}\n\n**Page ${index + 1} of ${chunkedLyrics.length}**`,
                    thumbnail: { url: track.album.images[0].url }
                })[0]);
                return d.lappy.util.paginator(d, i, chunkedLyrics, 6e4, true);
            }
            ;
            let data = { ...d, int: i, track };
            d.lappy.cmds.button.get('song_thumbnail').run(data);
        })
            .on('end', () => {
            components[0].components[0].setDisabled(true);
            components[0].components[1].setDisabled(true);
            d.int.editReply({ embeds, components });
        });
    }
};
//# sourceMappingURL=what_hear.js.map