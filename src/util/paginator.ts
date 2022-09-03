// imports
import { Message, ActionRowBuilder, ButtonBuilder, ButtonInteraction } from 'discord.js';
import { Lupo } from '../structures/Lupo';

// exports
export async function paginator (data: any, ins: Message | Interaction, pages: any[], time: number = 6e4, ephemeral = false) {
	let components = [new ActionRowBuilder()], actual = 0;
	components[0].setComponents(
		new ButtonBuilder().setCustomId('back').setLabel('<<').setStyle(1).setDisabled(true),
		new ButtonBuilder().setCustomId('next').setLabel('>>').setStyle(1).setDisabled(pages.length === 1)
	)
	if (!(ins instanceof Message) && !ins.deferred)
		await ins.deferReply({ ephemeral });
	const $ = await ins?.[ins instanceof Message ? 'edit' : 'editReply']({
		embeds: data.lappy.makeEmbeds(data, pages[actual]), 
		fetchReply: true, 
		components
	})
	function filter (i: ButtonInteraction) {
		return ['back', 'next'].includes(i.customId);
	};
	const col = await $.createMessageComponentCollector({
		type: 2, filter, time
	});
	col.on('collect', (i: ButtonInteraction) => {
		if (i.customId === 'back')
			actual = actual > 0
				? actual - 1
				: 0;
		else if (i.customId === 'next')
			actual = pages.length - 1 > actual
				? actual + 1
				: pages.length - 1;
		components[0].components[0].setDisabled(actual <= 0);
		components[0].components[1].setDisabled(actual >= pages.length - 1)
		i.update({
			embeds: data.lappy.makeEmbeds(data, pages[actual]), 
			components
		});
		col.resetTimer();
	}).on('end', (nya: any, r: string) => {
		if (r === 'messageDelete')
			return;
		components[0].components[0].setDisabled(true);
		components[0].components[1].setDisabled(true);
		ins?.[ins instanceof Message ? 'edit' : 'editReply']({
			embeds: data.lappy.makeEmbeds(data, pages[actual]), 
			components
		});
	});
};
export default paginator;