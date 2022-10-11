// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [ 'shuffle' ],
	desc: 'shuffle the tracks', 
	type: 'default',
	voiceRequired: true, 
	run: async (d: Data): Promise<any> => {
		if (!d.lappy.music.getQueue(d.gd))
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		d.msg.reply('Made It');
		return d.lappy.music.shuffle(d.gd);
	}
};