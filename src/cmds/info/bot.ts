// imports 
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
		d.msg.reply({
			embeds: d.lappy.makeEmbeds(d, {
				title: `${d.lappy.emotes.feli} | The White Wolf`, 
				fields: [{
					name: `${d.lappy.emotes.tofu} | Proyect`, 
					value: `**Developers** :: ${d.lappy.owners.map((owner: string) => `<@!${owner}>`).join(' ')}
**Version** :: \`${require(process.cwd() + '/package.json').version}\`
**Library** :: \`discord.js v${require('discord.js').version}\`
[Source Code](https://github.com/Pavez7274/Lupo)`
				}, {
					name: `${d.lappy.emotes.error} | System`, 
					value: `**Ping** :: \`${d.lappy.ws.ping}Ms\`
**Turn On At** :: <t:${((Date.now() - (d.lappy.uptime as number || 0)) / 1000).toFixed()}>
**Ram** :: \`${(process.memoryUsage().rss / 1024 / 1024).toFixed()}Mb\`
**Cpu** :: \`${require('os').cpus().map(b => (b = b.times, b.user + b.nice + b.sys + b.irq) / b.idle).reduce((a, b) => a + b).toFixed(2)}%\`
**Platform** :: \`${process.platform.toTitleCase()}\`
**TypeScript** :: \`v${require('typescript').version}\`
**Node** :: \`${process.version}\``
				}, {
					name: `${d.lappy.emotes.keyboard} | Util`, 
					value: `**Character** :: [Lappland](https://arknights.fandom.com/wiki/Lappland) from Arknights`
				}]
			})
		});
	}
};