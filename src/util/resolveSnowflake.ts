export function isSnowflake (resolvable: string | number): boolean {
	const typeof_0 = typeof resolvable;
	if(!['number', 'string'].includes(typeof_0) || isNaN(resolvable as number))
		return false;
  typeof_0 === 'number' && (resolvable = resolvable.toString());
    return /\d{17,20}/.test(resolvable as string);
};

export function resolveSnowflake (resolvable: string): string | boolean {
	resolvable = resolvable.replace(/[&#@!:<>]/gim, '');
  return !!Number(resolvable) && resolvable;
};

export default {
	isSnowflake,
	resolveSnowflake
};