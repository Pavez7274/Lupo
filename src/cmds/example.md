## Example 1
```ts
export const names = [
	'uwu'
];
export const type = 'default';
export function run (d: any): void {
	d.msg.reply('uwu');
};
```

## Example 2 `(export default)`
```ts
export default {
	names: [
		'uwu'
	],
	type: 'default',
	run: (d: any): void => {
		d.msg.reply('uwu');
	}
};
```