// imports 
import { ActionRowBuilder, ButtonBuilder, SnowflakeUtil, Message } from 'discord.js';
import { Data } from '../../../types/data';
import { toRomaji } from 'wanakana';

// exports 
export default {
	names: [
		'neko'
	],
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let neko = await d.lappy.neko.img('neko'), 
			embeds = d.lappy.makeEmbeds(d, {
				title: `Nek${'o'.repeat(d.random(4, 1))}!`,
				author: {
					name: `${neko.artist_name} (${toRomaji(neko.artist_name)})`,
					url: neko.artist_href
				}, 
				image: {
					url: neko.url
				}
			}),
			components = [];
			components.push(new ActionRowBuilder().setComponents(
				new ButtonBuilder()
					.setCustomId(String(SnowflakeUtil.generate()))
					.setLabel('regenerate')
					.setStyle(4)
			));
		d.msg.reply({ embeds, components }).then((m: Message) => {
			m.createMessageComponentCollector({
				filter: (i: any) => i.customId === components[0].components[0].data.custom_id,
				componentType: 2,
				time: 6e4
			})
				.on('collect', async (i) => {
					neko = await d.lappy.neko.img('neko');
					embeds[0].author = {
						name: `${neko.artist_name} (${toRomaji(neko.artist_name)})`,
						url: neko.artist_href
					};
					embeds[0].image = { url: neko.url };
					i.update({ embeds, components })
				})
				.on('end', () => {
					components[0].components[0].setDisabled(true);
					m.edit({ components })
				})
		});
	}
};