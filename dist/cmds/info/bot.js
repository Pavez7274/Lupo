"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["botinfo", "bot"],
    desc: "returns my information uvu",
    type: "default",
    run: async e => {
        e.msg.reply({
            embeds: e.lappy.makeEmbeds(e, {
                title: e.lappy.emotes.feli + " | The White Wolf",
                fields: [{
                    name: e.lappy.emotes.tofu + " | Proyect",
                    value: `**Developers** :: ${e.lappy.owners.map(e=>`<@!${e}>`).join(" ")}
**Version** :: \`${require(process.cwd()+"/package.json").version}\`
**Library** :: \`discord.js v${require("discord.js").version}\`
[Source Code](https://github.com/Pavez7274/Lupo)`
                }, {
                    name: e.lappy.emotes.error + " | System",
                    value: `**Ping** :: \`${e.lappy.ws.ping}Ms\`
**Turn On At** :: <t:${((Date.now()-(e.lappy.uptime||0))/1e3).toFixed()}>
**Ram** :: \`${(process.memoryUsage().rss/1024/1024).toFixed()}Mb\`
**Cpu** :: \`${require("os").cpus().map(e=>((e=e.times).user+e.nice+e.sys+e.irq)/e.idle).reduce((e,s)=>e+s).toFixed(2)}%\`
**Platform** :: \`${process.platform.toTitleCase()}\`
**TypeScript** :: \`v${require("typescript").version}\`
**Node** :: \`${process.version}\``
                }, {
                    name: e.lappy.emotes.keyboard + " | Util",
                    value: "**Character** :: [Lappland](https://arknights.fandom.com/wiki/Lappland) from Arknights"
                }]
            })
        })
    }
};