// imports
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction } from 'discord.js';
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'botinfo', 
		'bot'
	],
	desc: 'returns my information uvu', 
	type: 'default',
	run: async (d: Data): Promise<void> => {
		const embeds = d.lappy.makeEmbeds(d, {
			title: `${d.lappy.emotes.feli} | The White Wolf`, 
			fields: [{
				name: `${d.lappy.emotes.tofu} | Proyect`, 
				value: `**[ Team ]** -> ${d.lappy.owners.map((owner: string) => `<@!${owner}>`).join(' ')}
**[ Version ]** -> \`${require(process.cwd() + '/package.json').version}\`
**[ Library ]** -> \`discord.js v${require('discord.js').version}\`
*[Source Code](https://github.com/Pavez7274/Lupo)*`
			}, {
				name: `${d.lappy.emotes.error} | System`, 
				value: `**[ Ping ]** -> \`${d.lappy.ws.ping}Ms\`
**[ Turn On At ]** -> <t:${((Date.now() - (d.lappy.uptime as number || 0)) / 1000).toFixed()}>
**[ Ram ]** -> \`${(process.memoryUsage().rss / 1024 / 1024).toFixed()}Mb\`
**[ Cpu ]** -> \`${require('os').cpus().map(b => (b = b.times, b.user + b.nice + b.sys + b.irq) / b.idle).reduce((a, b) => a + b).toFixed(2)}%\`
**[ Platform ]** -> \`${process.platform.toTitleCase()}\`
**[ TypeScript ]** -> \`v${require('typescript').version}\`
**[ NodeJs ]** -> \`${process.version}\``
			}, {
				name: `${d.lappy.emotes.keyboard} | Util`, 
				value: `**[ Character ]** -> [Lappland](https://arknights.fandom.com/wiki/Lappland) from [Arknights](https://www.arknights.global/)`
			}]
		}), components = [new ActionRowBuilder()];
		components[0].setComponents(
			new ButtonBuilder().setCustomId('pavez').setLabel('About Pavez').setStyle(1),
			new ButtonBuilder().setCustomId('freysur').setLabel('About Freysur').setStyle(1).setDisabled(true),
			new ButtonBuilder().setCustomId('zlexus').setLabel('About zLexus').setStyle(1).setDisabled(true)
		);
		const m = await d.msg.reply({ embeds, components });
		m.createMessageComponentCollector({
			filter: ({ customId }) => ['pavez', 'freysur', 'zlexus'].includes(customId),
			componentType: 2 as any,
			time: 6e4
		})
			.on('collect', (i: ButtonInteraction) => {
				let data = d;
				data.int = i;
				d.lappy.cmds.button.get(i.customId).run(data);
			})
			.on('end', () => {
				components[0].components[0].setDisabled(true);
				components[0].components[1].setDisabled(true);
				components[0].components[2].setDisabled(true);
				m.edit({ components });
			});
	}
};