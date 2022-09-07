// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'cor'
	],
	ends: [{
		names: ['reboot', 'rt', 'r'] , 
		type: 'BOOLEAN',
		default: 'no'
	}, {
		names: ['commands', 'cmds', 'c'], 
		type: 'BOOLEAN', 
		default: 'yes'
	}, {
		names: ['events', 'evs', 'e'], 
		type: 'BOOLEAN', 
		default: 'yes'
	}], 
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
		await require(process.cwd().concat('/uglifier')).optimizeDist();
		if (d.args.endIsTrue('(reboot|rt|r)'))
			return nya.edit('rebooting...'), d.reboot();
		if (d.args.endIsTrue('(commands|cmds|c)', true))
			d.lappy.commands();
		if (d.args.endIsTrue('(events|evs|e)', true))
			d.lappy.events();
		return nya.edit('made it.');
	}
};