import { Guild, GuildMember } from 'discord.js';
export declare function findMember(guild: Guild, resolvable: string, flags?: string): Promise<GuildMember | undefined>;
export declare function findMembers(guild: Guild, resolvable: string, limit?: number, flags?: string): Promise<GuildMember[] | undefined>;
export default findMember;
//# sourceMappingURL=findMember.d.ts.map