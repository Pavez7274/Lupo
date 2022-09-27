export const name = 'ready';
export const type = 'dsc';
export const once = true;
export function run (): void {
	const date = new Date(Date.now()).toLocaleString('en-gb', {
    timeZone: 'America/Mendoza'
  });
  console.log(`[${'Lupo'.color('red')} -> ${'status'.color('yellow')}] ${'Ready at'.color('green')} ${date.color('yellow')}`);
};