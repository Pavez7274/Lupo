export function noop (type: "void" | "null" | "undefined" | "number" | "boolean" = 'void'): void | null | undefined | 0 | false {
	if (type == 'void')
		return;
	return type == 'null'
		? null
	: type == 'undefined'
		? void 0
	: type == 'number'
		? 0
	: type == 'boolean' && false 
};
export * from './generateCommandDoc';
export * from './resolveSnowflake';
export * from './findMember'; 
export * from './isBoolean';
export * from './paginator';
export * from './findUser';
export * from './inspect';
export * from './random';
export * from './reboot';