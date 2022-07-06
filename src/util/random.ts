// exports
export function random (max: number, min: number = 0, decimals: boolean = false) {
	return decimals
		? Math.random() * (max - min) + min
		: Math.floor(Math.random() * (max - min) + min);
};

export default random;