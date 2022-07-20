## Example 1
```ts
import { Data } from '../../../types/data';

export const names = [
	'uwu'
];
export const type = 'default';
export function run (d: Data): void {
	d.msg.reply('uwu');
};
```

## Example 2 `(export default)`
```ts
import { Data } from '../../../types/data';

export default {
	names: [
		'uwu'
	],
	type: 'default',
	run: (d: Data): void => {
		d.msg.reply('uwu');
	}
};
```