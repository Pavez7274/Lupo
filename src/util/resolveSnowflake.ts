export function isSnowflake (resolvable: string | number): boolean {
	const typeof_0 = typeof resolvable;
	if(!['number', 'string'].includes(typeof_0) || isNaN(resolvable as number))
		return false;
  typeof_0 === 'number' && (resolvable = resolvable.toString());
    return /\d{17,19}/.test(resolvable as string);
};

export function resolveSnowflake (resolvable: string): string | boolean {
	const _0 = resolvable.replace(/[<!@#:&a-z>]/gim, '');
  return isNaN(Number(_0)) && _0;
};

export default {
	isSnowflake,
	resolveSnowflake
};