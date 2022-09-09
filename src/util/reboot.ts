// imports
import { spawn } from 'child_process';

// exports
export function reboot () {
	console.clear();
	console.log(`${'='.repeat(40)}\n\t\t\t\tStarting Reboot\n${'='.repeat(40)}`.color('blue'))
	process.on('exit', () => spawn(process.argv.shift() as string, process.argv, {
		cwd: process.cwd(),
		detached: true,
		stdio: 'inherit'
	}));
	process.exit();
};
export default reboot;