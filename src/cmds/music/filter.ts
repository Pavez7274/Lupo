// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [ 'filter' ],
	desc: 'add or remove an audio filter', 
	fields: [{
		name: 'filter', 
		type: 'STRING', 
		req: false
	}], 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let q = d.lappy.music.getQueue(d.gd);
		if (!q)
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		if (!d.args.len)
			return d.msg.reply(q.filters.size ? `\`${q.filters.names.join(' | ')}\`` : 'No filters added');
		let f = d.args.get(0).toLowerCase(), action;
		if (f == 'clean' && q.filters.size)
			return q.filters.clear();
		if (d.lappy.music.filters[f])
			return q.filters[
				action = q.filters.has(f) ? 'remove' : 'add'
			](f), d.msg.reply(`${action == 'add' ? 'Added' : 'Removed'} *${f}* filter`);
		return d.lappy.sendError(d, d.msg, 'Field -> Invalid', `The filter provided in field 1 ['Filter'] isn't valid\n\nFilters: ${Object.keys(d.lappy.music.filters).join(', ')}`);
	}
};