// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [ 'volume', 'vol' ],
	desc: 'change or see the volume of the music', 
	type: 'default',
	fields: [{
		name: 'new', 
		type: 'NUMBER', 
		req: false 
	}],
	voiceRequired: true, 
	run: async (d: Data): Promise<any> => {
		let q = d.lappy.music.getQueue(d.gd);
		if (!q)
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		if (!d.args.len)
			return d.msg.reply(`The current volume is \`${q.volume}%\``);
		let n = Number(d.args.get(0));
		if (isNaN(n) || Math.floor(n) != n)
			return d.lappy.sendError(d, d.msg, 'Field -> Type', `The field 1 ['new'] must be of type NUMBER`);
		q.setVolume(n > 200 ? 200 : n < 0 ? 0 : n);
		d.msg.reply('Made It.');
	}
};