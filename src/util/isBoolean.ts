export function isBoolean (str: string): boolean {
	return [
		'false', 
		'true',
		'yes',
		'no',
		'1',
		'0'
	].includes(str);
};

export function parse (str: string): boolean {
	let r = false;
	switch (str) {
		case 'yes': r = true;
			break;
		case 'no': r = false;
			break;
		case 'true': r = true;
			break;
		case '1': r = true;
			break;
		case '0': r = false;
			break;
	};
	return r;
};

export default {
	isBoolean, 
	parse
};