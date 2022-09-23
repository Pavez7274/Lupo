"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const discord_js_1 = require("discord.js"),
    wanakana_1 = require("wanakana");
exports.default = {
    names: ["neko"],
    type: "default",
    run: async t => {
        let a = await t.lappy.neko.img("neko"),
            n = t.lappy.makeEmbeds(t, {
                title: `Nek${"o".repeat(t.random(4,1))}!`,
                author: {
                    name: `${a.artist_name} (${(0,wanakana_1.toRomaji)(a.artist_name)})`,
                    url: a.artist_href
                },
                image: {
                    url: a.url
                }
            }),
            o = [];
        o.push((new discord_js_1.ActionRowBuilder).setComponents((new discord_js_1.ButtonBuilder).setCustomId(String(discord_js_1.SnowflakeUtil.generate())).setLabel("regenerate").setStyle(4))), t.msg.reply({
            embeds: n,
            components: o
        }).then(e => {
            e.createMessageComponentCollector({
                filter: e => e.customId === o[0].components[0].data.custom_id,
                componentType: 2,
                time: 6e4
            }).on("collect", async e => {
                a = await t.lappy.neko.img("neko"), n[0].author = {
                    name: `${a.artist_name} (${(0,wanakana_1.toRomaji)(a.artist_name)})`,
                    url: a.artist_href
                }, n[0].image = {
                    url: a.url
                }, e.update({
                    embeds: n,
                    components: o
                })
            }).on("end", () => {
                o[0].components[0].setDisabled(!0), e.edit({
                    components: o
                })
            })
        })
    }
};