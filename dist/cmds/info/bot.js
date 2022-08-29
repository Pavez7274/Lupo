"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const discord_js_1 = require("discord.js");
exports.default = {
    names: ["botinfo", "bot"],
    desc: "returns my information uvu",
    type: "default",
    run: async t => {
        const e = t.lappy.makeEmbeds(t, {
                title: t.lappy.emotes.feli + " | The White Wolf",
                fields: [{
                    name: t.lappy.emotes.tofu + " | Proyect",
                    value: `**Developers** :: ${t.lappy.owners.map(e=>`<@!${e}>`).join(" ")}
**Version** :: \`${require(process.cwd()+"/package.json").version}\`
**Library** :: \`discord.js v${require("discord.js").version}\`
[Source Code](https://github.com/Pavez7274/Lupo)`
                }, {
                    name: t.lappy.emotes.error + " | System",
                    value: `**Ping** :: \`${t.lappy.ws.ping}Ms\`
**Turn On At** :: <t:${((Date.now()-(t.lappy.uptime||0))/1e3).toFixed()}>
**Ram** :: \`${(process.memoryUsage().rss/1024/1024).toFixed()}Mb\`
**Cpu** :: \`${require("os").cpus().map(e=>((e=e.times).user+e.nice+e.sys+e.irq)/e.idle).reduce((e,s)=>e+s).toFixed(2)}%\`
**Platform** :: \`${process.platform.toTitleCase()}\`
**TypeScript** :: \`v${require("typescript").version}\`
**Node** :: \`${process.version}\``
                }, {
                    name: t.lappy.emotes.keyboard + " | Util",
                    value: "**Character** :: [Lappland](https://arknights.fandom.com/wiki/Lappland) from Arknights"
                }]
            }),
            s = [new discord_js_1.ActionRowBuilder],
            o = (s[0].setComponents((new discord_js_1.ButtonBuilder).setCustomId("pavez").setLabel("About Pavez").setStyle(1), (new discord_js_1.ButtonBuilder).setCustomId("freysur").setLabel("About Freysur").setStyle(1).setDisabled(!0), (new discord_js_1.ButtonBuilder).setCustomId("zlexus").setLabel("About zLexus").setStyle(1).setDisabled(!0)), await t.msg.reply({
                embeds: e,
                components: s
            }));
        o.createMessageComponentCollector({
            filter: ({
                customId: e
            }) => ["pavez", "freysur", "zlexus"].includes(e),
            componentType: 2,
            time: 6e4
        }).on("collect", e => {
            let s = t;
            s.int = e, t.lappy.cmds.button.get(e.customId).run(s)
        }).on("end", () => {
            s[0].components[0].setDisabled(!0), s[0].components[1].setDisabled(!0), s[0].components[2].setDisabled(!0), msg_0.edit({
                components: s
            })
        })
    }
};