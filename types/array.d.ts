interface Array extends array {
	addAt(position: number, ...items: any): any;
	chunk(limit: number): any[];
	random(): any;
};
interface array extends Array {
	
};