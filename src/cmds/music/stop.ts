// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [ 'stop' ],
	type: 'default',
	run: async (d: Data): Promise<any> => {
		if (!d.lappy.music.getQueue(d.gd))
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		d.msg.reply('Stopping the music and leaving the voice channel...');
		return d.lappy.music.stop(d.gd);
	}
};