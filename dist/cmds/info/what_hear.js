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
    names: ["whatlisten", "whathear", "wl"],
    fields: [{
        name: "target",
        type: "userResolvable",
        req: !1
    }],
    description: "returns information about the song that a user hears (only supports spotify)",
    type: "default",
    run: async e => {
        var t = e.args.get(0) ? await e.lappy.util.findMember(e.gd, e.args.string()) : await e.memb.fetch();
        if (!t) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().cropAt(10)}']`);
        let s = t.presence?.activities;
        if (!s || !s?.some(({
                name: e
            }) => "Spotify" === e)) return e.lappy.sendError(e, e.msg, "No Music", `${t.user.id===e.author.id?"u aren't":"This user isn't"} listening anything or I can't see it`);
        let a = s?.find(({
                name: e
            }) => "Spotify" === e),
            r = (await e.lappy.spotify.search({
                q: a?.details
            }))?.tracks.items.find(e => e.name === a?.details && e.artists.every(({
                name: e
            }) => a?.state?.includes(e)));
        return r ? (t = e.lappy.makeEmbeds(e, {
            title: `${e.lappy.emotes.spotify} | What does ${t.user.id===e.author.id?"u":t.displayName} listen to?`,
            description: `**Song** :: [${r.name}](${r.external_urls.spotify})
**Artists** :: ${r.artists.map(e=>`[${e.name}](${e.external_urls.spotify})`).join(" | ")}
**${r.album.type.toTitleCase()}** :: [${r.album.name}](${r.album.external_urls.spotify})
**Duration** :: ${parse(r.duration_ms)}
**Explicit** :: ${r.explicit?"Yes":"No"}

[Click here to listen a preview](${r.preview_url})`,
            thumbnail: {
                url: r.album.images[0].url
            }
        }), e.msg.reply({
            embeds: t
        })) : e.lappy.sendError(e, e.msg, "not found", `i couldn't find the song ['${a.details??"unknown"}']`)
    }
};