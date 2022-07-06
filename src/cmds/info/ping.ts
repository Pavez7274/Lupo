export const names = [
	'ping'
];
export const type = 'default';
export function run (d: any): void {
	d.msg.reply(`${d.lappy.ws.ping ?? 'WS_ERROR'}Ms`);
};