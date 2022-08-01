import { Lupo } from '../structures/Lupo';
import { User } from 'discord.js';
export declare function findUser(client: Lupo, resolvable: string, flags?: string): Promise<User | undefined>;
export declare function findUsers(client: Lupo, resolvable: string, limit?: number, flags?: string): Promise<User[] | undefined>;
export default findUser;
//# sourceMappingURL=findUser.d.ts.map