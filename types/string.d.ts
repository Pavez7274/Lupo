interface String extends string {
	toTitleCase(sep?: string | String): string;
	toCodeBlock(lang?: string | String): string;
	cropAt(at: number): string;
	color(resolvable: string | number): string;
	OwOIfy(): string;
};
interface string extends String {
	
};