// imports 
import { Guild, GuildMember } from 'discord.js';
import { isSnowflake, resolveSnowflake } from './resolveSnowflake'

// exports 
export async function findMember (guild: Guild, resolvable: string, flags?: string): Promise<GuildMember | undefined> {
	await guild.members.fetch();
	let reg = new RegExp(resolvable, flags ?? 'gi');
	resolvable = resolvable.toLowerCase().trim();
	if (resolvable === '')
		return;
	if (isSnowflake(resolveSnowflake(resolvable))) {
		return guild.members.cache.get(resolveSnowflake(resolvable));
	};
	return guild.members.cache.find((member: GuildMember) => {
		let displayTag = member.displayName + member.user.discriminator;
		return resolvable === member.user.username.toLowerCase() ||
			resolvable === member.displayName ||
			resolvable === member.user.tag ||
			resolvable === displayTag ||
			reg.test(member.displayName) ||
			reg.test(displayTag) ||
			reg.test(member.user.tag) ||
			resolvable === member.toString() ||
			resolveSnowflake(resolvable) === member.user.id
	});
};
export async function findMembers (guild: Guild, resolvable: string, limit: number = Infinity, flags?: string): Promise<GuildMember[] | undefined> {
	await guild.members.fetch();
	let reg = new RegExp(resolvable, flags ?? 'gi');
	resolvable = resolvable.toLowerCase().trim();
	if (resolvable === '')
		return;
	return guild.members.cache.filter((member: GuildMember) => {
		let displayTag = member.displayName + member.user.discriminator;
		return resolvable === member.user.username.toLowerCase() ||
			resolvable === member.displayName ||
			resolvable === member.user.tag ||
			resolvable === displayTag ||
			reg.test(member.displayName) ||
			reg.test(displayTag) ||
			reg.test(member.user.tag) ||
			resolvable === member.toString() ||
			resolveSnowflake(resolvable) === member.user.id
	}).first(limit);
};
export default findMember;