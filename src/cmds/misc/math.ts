// imports 
import * as math from 'math-expression-evaluator';
import { Data } from '../../../types/data';

export default {
	names: [
		'calculate', 
		'calc', 
		'math'
	],
	desc: 'a simple calculator', 
	fields: [{
		name: 'operation', 
		type: 'any', 
		req: true
	}], 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let answer: any;
		try {
			answer = math.eval(d.args.string());
		} catch (error: any) {
			return d.lappy.sendError(d, d.msg, undefined, 'Invalid mathematical calculation: ' + error?.message);
		};
		let embeds = d.lappy.makeEmbeds(d, {
			title: `${d.lappy.emotes.tofu} | Math`, 
			fields: [{
				name: '📬 | Input', 
				value: d.args.string().toCodeBlock()
			}, {
				name: '📭 | Output', 
				value: String(answer).toCodeBlock('js')
			}]
		});
		/*embeds[0]
			.addField(':mailbox_with_mail: | Input', d.args.string().toCodeBlock())
			.addField(':mailbox_with_no_mail: | Output', String(answer).toCodeBlock('js'));*/
		return d.msg.reply({ embeds });
	}
};