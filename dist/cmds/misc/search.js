"use strict";

function pad(e, t = 2) {
    return ("00" + e).slice(-t)
}

function parse(e) {
    return pad(e % 36e5 / 6e4 | 0) + ":" + pad(e % 6e4 / 1e3 | 0)
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["search", "song", "track", "playlist"],
    fields: [{
        name: "name",
        req: !0,
        type: "string"
    }],
    type: "default",
    run: async e => {
        let t = (await e.lappy.spotify.search({
            q: e.args.string()
        })).tracks;
        if (!t?.items) return e.lappy.sendError(e, e.msg, "not found", `I couldn't find the song ['${e.args.string().cropAt(10)??"unknown"}']`);
        if (e.args.endIsTrue("list") || e.args.endIsTrue("l")) return r = e.lappy.makeEmbeds(e, {
            title: e.lappy.emotes.spotify + " | Search on Spotify",
            description: t.items.map((e, t) => `\`${t+1}.\` **[${e.name}](${e.external_urls.spotify}) by [${e.artists[0].name}](${e.artists[0].external_urls.spotify})**`).join("\n")
        }), e.msg.reply({
            embeds: r
        });
        var r = Number(e.args.getEndValue("index") || 1) - 1;
        if (isNaN(r) || Math.floor(r) != r || r < 0 || t.items.length - 1 < r) return e.lappy.sendError(e, e.msg, "invalid type", "[--index] must be a valid number");
        let s = t.items[r];
        return r = e.lappy.makeEmbeds(e, {
            title: e.lappy.emotes.spotify + " | Search on Spotify",
            description: `**Song** :: [${s.name}](${s.external_urls.spotify})
**Artists** :: ${s.artists.map(e=>`[${e.name}](${e.external_urls.spotify})`).join(" | ")}
**${s.album.type.toTitleCase()}** :: [${s.album.name}](${s.album.external_urls.spotify})
**Duration** :: ${parse(s.duration_ms)}
**Explicit** :: ${s.explicit?"Yes":"No"}

[Click here to listen a preview](${s.preview_url})`,
            thumbnail: {
                url: s.album.images[0].url
            }
        }), e.msg.reply({
            embeds: r
        })
    }
};