"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["queue", "list", "q"],
    type: "default",
    run: async a => {
        let e = a.lappy.music.getQueue(a.gd);
        if (!e) return a.lappy.sendError(a, a.msg, "No Music", "I'm not in a voice chat");
        let r = e.songs.slice(1);
        if (!r?.length) return a.lappy.sendError(a, a.msg, "No Queue", "No songs on hold");
        r = r.map((e, r) => `**${r+1}. [${e.name}](${e.url})**
*[${e.uploader.name}](${e.uploader.url}) - ${e.member?.toString()}*`).chunk(10).map((e, r, t) => ({
            title: ":notes: | Track listing",
            description: "" + e.join("\n") + `

**Page ${r+1} of ${t.length}**`,
            thumbnail: {
                url: a.memb.displayAvatarURL()
            }
        })), r = a.lappy.makeEmbeds(a, ...r);
        var t = await a.msg.reply({
            embeds: [r[0]]
        });
        return a.paginator(a, t, r, 6e4)
    }
};