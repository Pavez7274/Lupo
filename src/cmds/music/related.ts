// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'addrelated', 
		'related', 
		'ar'
	],
	desc: 'adds a related song to the one that is playing', 
	type: 'default',
	voiceRequired: true, 
	run: async (d: Data): Promise<any> => {
		let q = d.lappy.music.getQueue(d.gd);
		if (!q)
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		if (!q.playing && !q.paused)
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not playing anything');
		let song = await q.addRelatedSong();
		song.metadata = d;
		d.lappy.music.emit('addSong', q, song);
	} 
};