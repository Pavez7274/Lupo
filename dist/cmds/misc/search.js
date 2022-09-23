"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const discord_js_1 = require("discord.js");

function pad(e, t = 2) {
    return ("00" + e).slice(-t)
}

function parse(e) {
    return pad(e % 36e5 / 6e4 | 0) + ":" + pad(e % 6e4 / 1e3 | 0)
}
exports.default = {
    names: ["search", "song", "track", "playlist"],
    fields: [{
        name: "name",
        req: !0,
        type: "string"
    }],
    type: "default",
    run: async t => {
        let e = (await t.lappy.spotify.search({
            q: t.args.string()
        })).tracks;
        if (!e?.items) return t.lappy.sendError(t, t.msg, "not found", `I couldn't find the song ['${t.args.string().cropAt(10)??"unknown"}']`);
        if (t.args.endIsTrue("list") || t.args.endIsTrue("l")) return s = t.lappy.makeEmbeds(t, {
            title: t.lappy.emotes.spotify + " | Search on Spotify",
            description: e.items.map((e, t) => `\`${t+1}.\` **[${e.name}](${e.external_urls.spotify}) by [${e.artists[0].name}](${e.artists[0].external_urls.spotify})**`).join("\n")
        }), t.msg.reply({
            embeds: s
        });
        var s = Number(t.args.getEndValue("index") || 1) - 1;
        if (isNaN(s) || Math.floor(s) != s || s < 0 || e.items.length - 1 < s) return t.lappy.sendError(t, t.msg, "invalid type", "[--index] must be a valid number");
        let n = e.items[s],
            r = t.lappy.makeEmbeds(t, {
                title: t.lappy.emotes.spotify + " | Search on Spotify",
                description: `**Song** :: [${n.name}](${n.external_urls.spotify})
**Artists** :: ${n.artists.map(e=>`[${e.name}](${e.external_urls.spotify})`).join(" | ")}
**${n.album.type.toTitleCase()}** :: [${n.album.name}](${n.album.external_urls.spotify})
**Duration** :: ${parse(n.duration_ms)}
**Explicit** :: ${n.explicit?"Yes":"No"}

[Click here to listen a preview](${n.preview_url})`,
                thumbnail: {
                    url: n.album.images[0].url
                }
            }),
            a = [new discord_js_1.ActionRowBuilder];
        a[0].setComponents((new discord_js_1.ButtonBuilder).setCustomId("songThumbnail").setLabel("Get Thumbnail").setStyle(1));
        const i = await t.msg.reply({
            embeds: r,
            components: a
        });
        i.createMessageComponentCollector({
            filter: ({
                customId: e
            }) => "songThumbnail" == e,
            componentType: 2,
            time: 6e4
        }).on("collect", e => {
            e = {
                int: e,
                track: n,
                ...t
            }, t.lappy.cmds.button.get("song_thumbnail").run(e)
        }).on("end", () => {
            a[0].components[0].setDisabled(!0), i.edit({
                components: a
            })
        })
    }
};