// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'play', 
		'p'
	],
	fields: [{
		name: 'song', 
		type: 'string', 
		req: true
	}],
	voiceRequired: true, 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		d.lappy.music.play(d.memb.voice.channel, d.args.string(), {
			textChannel: d.ch,
			member: d.memb,
			message: d.msg,
			metadata: d
		});
	}
};