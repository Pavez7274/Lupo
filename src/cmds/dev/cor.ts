// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'cor'
	],
	type: 'default',
	dev: 1,
	desc: 'compile, optimize and reload',
	run: async (d: Data): Promise<any> => {
		let nya = await d.msg.reply('starting...');
		try {
			await nya.edit('compiling...');
			await require('child_process').execSync('tsc');
		} catch {};
		await nya.edit('optimizing dist...');
		await require(process.cwd().concat('/uglifier')).optimizeDist() &&
			d.args.endIsTrue('all')
			? d.lappy.util.reboot() 
			: d.lappy.commands();
		return nya.edit('made it.');
	}
};