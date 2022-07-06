export default {
	names: [
		'help'
	],
	type: 'default',
	run: (d: any): void => {
		const embeds = d.lappy.makeEmbeds(d, {
			title: 'Help/Ayuda'
		});
		d.msg.reply({ embeds })
  }
};