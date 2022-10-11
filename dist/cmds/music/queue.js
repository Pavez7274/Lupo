"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["queue", "list", "q"],
    desc: "returns the track list",
    type: "default",
    run: async a => {
        let e = a.lappy.music.getQueue(a.gd);
        if (!e) return a.lappy.sendError(a, a.msg, "No Music", "I'm not in a voice chat");
        let t = e.songs.slice(1);
        if (!t?.length) return a.lappy.sendError(a, a.msg, "No Queue", "No songs on hold");
        t = t.map((e, t) => `**${t+1}. [${e.name}](${e.url})**
*[${e.uploader.name}](${e.uploader.url}) - ${e.member?.toString()}*`).chunk(10).map((e, t, r) => ({
            title: ":notes: | Track listing",
            description: "" + e.join("\n") + `

**Page ${t+1} of ${r.length}**`,
            thumbnail: {
                url: a.memb.displayAvatarURL()
            }
        })), t = a.lappy.makeEmbeds(a, ...t);
        var r = await a.msg.reply({
            embeds: [t[0]]
        });
        return a.paginator(a, r, t, 6e4)
    }
};