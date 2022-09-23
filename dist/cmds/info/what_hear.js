"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, s, i) {
        void 0 === i && (i = s), Object.defineProperty(e, i, {
            enumerable: !0,
            get: function() {
                return t[s]
            }
        })
    } : function(e, t, s, i) {
        e[i = void 0 === i ? s : i] = t[s]
    }),
    __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        })
    } : function(e, t) {
        e.default = t
    }),
    __importStar = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var s in e) "default" !== s && Object.prototype.hasOwnProperty.call(e, s) && __createBinding(t, e, s);
        return __setModuleDefault(t, e), t
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const discord_js_1 = require("discord.js"),
    axios = __importStar(require("axios"));

function pad(e, t = 2) {
    return ("00" + e).slice(-t)
}

function parse(e) {
    return pad(e % 36e5 / 6e4 | 0) + ":" + pad(e % 6e4 / 1e3 | 0)
}
exports.default = {
    names: ["whatlisten", "whathear", "wl"],
    context: "what listen",
    fields: [{
        name: "target",
        type: "userResolvable",
        req: !1
    }],
    description: "returns information about the song that a user hears (only supports spotify)",
    type: "default",
    run: async i => {
        var e = i.args.get(0) ? await i.lappy.util.findMember(i.gd, i.args.string()) : await i.memb.fetch();
        if (!e) return i.lappy.sendError(i, i.msg, "not found", `No Matches Were Found With ['${i.args.string().cropAt(10)}']`);
        let t = e.presence?.activities;
        if (!t || !t?.some(({
                name: e
            }) => "Spotify" === e)) return i.lappy.sendError(i, i.msg, "No Music", `${e.user.id===i.author.id?"u aren't":"This user isn't"} listening anything or I can't see it`);
        let s = t?.find(({
                name: e
            }) => "Spotify" === e),
            n = (await i.lappy.spotify.search({
                q: s?.details
            }))?.tracks.items.find(e => e.name === s?.details && e.artists.every(({
                name: e
            }) => s?.state?.includes(e)));
        if (!n) return i.lappy.sendError(i, i.msg, "not found", `I couldn't find the song ['${s?.details??"unknown"}']`);
        let a = i.lappy.makeEmbeds(i, {
                title: `${i.lappy.emotes.spotify} | What does ${e.user.id===i.author.id?"u":e.displayName} listen to?`,
                description: `**Song** :: [${n.name}](${n.external_urls.spotify})
**Artists** :: ${n.artists.map(e=>`[${e.name}](${e.external_urls.spotify})`).join(" | ")}
**${n.album.type.toTitleCase()}** :: [${n.album.name}](${n.album.external_urls.spotify})
**Duration** :: ${parse(Date.now()-Number(s?.timestamps?.start))} / ${parse(n.duration_ms)}
**Explicit** :: ${n.explicit?"Yes":"No"}

[Click here to listen a preview](${n.preview_url})`,
                thumbnail: {
                    url: n.album.images[0].url
                }
            }),
            r = [new discord_js_1.ActionRowBuilder],
            o = await axios.get("https://makeitpersonal.co/lyrics", {
                params: {
                    artist: n.artists[0].name,
                    title: n.name
                }
            }).catch(() => {});
        o &&= o.data, r[0].setComponents((new discord_js_1.ButtonBuilder).setCustomId("songThumbnail").setLabel("Get Thumbnail").setStyle(1), (new discord_js_1.ButtonBuilder).setCustomId("songLyrics").setLabel("Get Lyrics").setStyle(1).setDisabled(!o));
        const l = await i.msg.reply({
            embeds: a,
            components: r
        });
        l.createMessageComponentCollector({
            filter: ({
                customId: e
            }) => ["songThumbnail", "songLyrics"].includes(e),
            componentType: 2,
            time: 6e4
        }).on("collect", e => {
            if ("songLyrics" === e.customId && o) {
                let s = o.trim().split(/\n/).chunk(20);
                return s = s.map((e, t) => i.lappy.makeEmbeds(i, {
                    title: ":musical_score: | Lyrics - " + n.name,
                    description: "" + e.join("\n").toCodeBlock() + `

**Page ${t+1} of ${s.length}**`,
                    thumbnail: {
                        url: n.album.images[0].url
                    }
                })[0]), i.paginator(i, e, s, 6e4, !0)
            }
            e = {
                int: e,
                track: n,
                ...i
            }, i.lappy.cmds.button.get("song_thumbnail").run(e)
        }).on("end", () => {
            r[0].components[0].setDisabled(!0), r[0].components[1].setDisabled(!0), l.edit({
                components: r
            })
        })
    },
    contextRun: async i => {
        let e = i.int.targetMember.presence?.activities;
        if (!e || !e?.some(({
                name: e
            }) => "Spotify" === e)) return i.lappy.sendError({
            ...i,
            ephemeral: !0
        }, i.int, "No Music", `${i.int.targetMember.user.id===i.int.user.id?"u aren't":"This user isn't"} listening anything or I can't see it`, i.int.user);
        let t = e?.find(({
                name: e
            }) => "Spotify" === e),
            n = (await i.lappy.spotify.search({
                q: t?.details,
                type: "track"
            }))?.tracks.items.find(e => e.name === t?.details && e.artists.every(({
                name: e
            }) => t?.state?.includes(e)));
        if (!n) return i.lappy.sendError({
            ...i,
            ephemeral: !0
        }, i.int, "not found", `I couldn't find the song ['${t.details??"unknown"}']`, i.int.user);
        let s = i.lappy.makeEmbeds(i, {
                title: `${i.lappy.emotes.spotify} | What does ${i.int.targetMember.user.id===i.int.user.id?"u":i.int.targetMember.displayName} listen to?`,
                description: `**Song** :: [${n.name}](${n.external_urls.spotify})
**Artists** :: ${n.artists.map(e=>`[${e.name}](${e.external_urls.spotify})`).join(" | ")}
**${n.album.type.toTitleCase()}** :: [${n.album.name}](${n.album.external_urls.spotify})
**Duration** :: ${parse(Date.now()-t?.timestamps?.start)} / ${parse(n.duration_ms)}
**Explicit** :: ${n.explicit?"Yes":"No"}

[Click here to listen a preview](${n.preview_url})`,
                thumbnail: {
                    url: n.album.images[0].url
                }
            }),
            a = [new discord_js_1.ActionRowBuilder],
            r = await axios.get("https://makeitpersonal.co/lyrics", {
                params: {
                    artist: n.artists[0].name,
                    title: n.name
                }
            }).catch(() => {});
        r &&= r.data, a[0].setComponents((new discord_js_1.ButtonBuilder).setCustomId("songThumbnail").setLabel("Get Thumbnail").setStyle(1), (new discord_js_1.ButtonBuilder).setCustomId("songLyrics").setLabel("Get Lyrics").setStyle(1).setDisabled(!r));
        const o = await i.int.reply({
            embeds: s,
            components: a
        });
        o.createMessageComponentCollector({
            filter: ({
                customId: e
            }) => ["songThumbnail", "songLyrics"].includes(e),
            componentType: 2,
            time: 6e4
        }).on("collect", e => {
            if ("songLyrics" === e.customId && r) {
                let s = r.trim().split(/\n/).chunk(20);
                return s = s.map((e, t) => i.lappy.makeEmbeds(i, {
                    title: ":musical_score: | Lyrics - " + n.name,
                    description: "" + e.join("\n").toCodeBlock() + `

**Page ${t+1} of ${s.length}**`,
                    thumbnail: {
                        url: n.album.images[0].url
                    }
                })[0]), i.lappy.util.paginator(i, e, s, 6e4, !0)
            }
            e = {
                ...i,
                int: e,
                track: n
            }, i.lappy.cmds.button.get("song_thumbnail").run(e)
        }).on("end", () => {
            a[0].components[0].setDisabled(!0), a[0].components[1].setDisabled(!0), i.int.editReply({
                embeds: s,
                components: a
            })
        })
    }
};