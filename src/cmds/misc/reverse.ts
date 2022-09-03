// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'reverse', 
		'invert'
	],
	fields: [{
		name: 'text', 
		type: 'string', 
		req: true
	}], 
	desc: 'invert a text', 
	type: 'default',
	run: (d: Data): void => {
		d.msg.reply(d.args.string().split('').reverse().join(''));
	}
};