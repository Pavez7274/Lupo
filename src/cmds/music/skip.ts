// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [ 'skip' ],
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let q = d.lappy.music.getQueue(d.gd);
		if (!q)
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		if (!q[1])
			return d.lappy.sendError(d, d.msg, 'No Queue', 'No songs on hold')
		return d.lappy.music.skip(d.gd);
	}
};