interface String extends string {
	toTitleCase(sep?: string | String): string;
	toCodeBlock(lang?: string | String): string;
	OwOIfy(): string;
};
interface string extends String {
	
};