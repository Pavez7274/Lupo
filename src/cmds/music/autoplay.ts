// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'autoplay', 
		'auto', 
		'ap'
	],
	desc: 'turn on/off autoplay mode', 
	type: 'default',
	voiceRequired: true, 
	run: async (d: Data): Promise<any> => {
		let q = d.lappy.music.getQueue(d.gd);
		if (!q)
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		d.msg.reply(`Autoplay turned ${q.toggleAutoplay() ? 'on' : 'off' }`)
	}
};