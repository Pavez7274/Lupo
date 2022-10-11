// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [ 'skip' ],
	desc: 'jump to the next track', 
	type: 'default',
	voiceRequired: true, 
	run: async (d: Data): Promise<any> => {
		let q = d.lappy.music.getQueue(d.gd);
		if (!q)
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		if (!q.songs?.[1] || !q.autoplay)
			return d.lappy.sendError(d, d.msg, 'No Queue', 'No songs on hold')
		return d.lappy.music.skip(d.gd);
	}
};