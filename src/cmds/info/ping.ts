import { Data } from '../../../types/data';

export default {
	names: [
		'ping'
	],
	desc: 'returns my latency', 
	type: 'default',
	run: (d: Data): void => {
		d.msg.reply(`${d.lappy.ws.ping ?? 'WS_ERROR'}m/s`);
	}
};