interface String extends string {
	toTitleCase(sep?: string | String): string;
	toCodeBlock(lang?: string | String): string;
};
interface string extends String {
	
};