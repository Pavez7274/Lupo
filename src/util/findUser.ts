// imports 
import { isSnowflake, resolveSnowflake } from './resolveSnowflake';
import { Lupo } from '../structures/Lupo';
import { User } from 'discord.js';

// exports 
export async function findUser (client: Lupo, resolvable: string, flags?: string): Promise<User | undefined> {
	resolvable = resolvable.toLowerCase();
	if (isSnowflake(resolvable)) {
		return await client.users.fetch(resolvable).catch(() => void 0);
	};
	let reg = new RegExp(resolvable, flags ?? 'gi');
	return client.users.cache.find((user: User) => {
		return resolvable === user.username.toLowerCase() ||
			resolvable === user.tag ||
			reg.test(user.username) ||
			reg.test(user.tag) ||
			resolvable === user.toString() ||
			resolveSnowflake(resolvable) === user.id
	});
};
export async function findUsers (client: Lupo, resolvable: string, limit: number = Infinity, flags?: string): Promise<User[] | undefined> {
	resolvable = resolvable.toLowerCase();
	let reg = new RegExp(resolvable, flags ?? 'gi');
	// @ts-ignore
	return client.users.cache.filter((user: User) => {
		return resolvable === user.username.toLowerCase() ||
			resolvable === user.tag ||
			reg.test(user.username) ||
			reg.test(user.tag) ||
			resolvable === user.toString() ||
			resolveSnowflake(resolvable) === user.id
	}).first(limit);
};
export default findUser;