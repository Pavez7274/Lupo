## Example 1
```ts
// imports 
import { Data } from '../../../types/data';

// exports 
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
// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'uwu'
	],
	type: 'default',
	run: async (d: Data): Promise<any> => {
		d.msg.reply('uwu');
	}
};
```