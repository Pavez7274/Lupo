import { Guild, GuildMember } from 'discord.js';
import { isSnowflake, resolveSnowflake} from './resolveSnowflake'

export async function findMember (guild: Guild, resolvable: string, tags?: string): Promise<GuildMember | undefined> {
	await guild.members.fetch();
	let reg = new RegExp(resolvable, tags ?? 'gi');
	resolvable = resolvable.toLowerCase();
	if (isSnowflake(resolvable)) {
		return guild.members.cache.get(resolvable);
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

export default findMember;