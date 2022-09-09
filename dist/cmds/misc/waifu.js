"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const wanakana_1 = require("wanakana");
exports.default = {
    names: [
        'waifu'
    ],
    type: 'default',
    run: async (d) => {
        let neko = await d.lappy.neko.img('waifu'), embeds = d.lappy.makeEmbeds(d, {
            author: {
                name: `${neko.artist_name} (${(0, wanakana_1.toRomaji)(neko.artist_name)})`,
                url: neko.artist_href
            },
            image: {
                url: neko.url
            }
        }), components = [];
        components.push(new discord_js_1.ActionRowBuilder().setComponents(new discord_js_1.ButtonBuilder()
            .setCustomId(String(discord_js_1.SnowflakeUtil.generate()))
            .setLabel('regenerate')
            .setStyle(4)));
        d.msg.reply({ embeds, components }).then((m) => {
            m.createMessageComponentCollector({
                filter: (i) => i.customId === components[0].components[0].data.custom_id,
                componentType: 2,
                time: 6e4
            })
                .on('collect', async (i) => {
                neko = await d.lappy.neko.img('waifu');
                embeds[0].author = {
                    name: `${neko.artist_name} (${(0, wanakana_1.toRomaji)(neko.artist_name)})`,
                    url: neko.artist_href
                };
                embeds[0].image = { url: neko.url };
                i.update({ embeds, components });
            })
                .on('end', () => {
                components[0].components[0].setDisabled(true);
                m.edit({ components });
            });
        });
    }
};
//# sourceMappingURL=waifu.js.map