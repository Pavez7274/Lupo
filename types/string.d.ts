interface String extends string {
	insensitiveIncludes(match: string, fromIndex: number | void): boolean;
	toCodeBlock(lang?: string | String): string;
	toTitleCase(sep?: string | String): string;
	color(resolvable: string | number): string;
	cropAt(at: number): string;
	OwOIfy(): string;
};
interface string extends String {
	
};