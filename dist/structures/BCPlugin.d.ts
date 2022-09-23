import { CustomPlugin } from 'distube';
import type { VoiceBasedChannel } from 'discord.js';
import type { PlayOptions } from 'distube';
export declare class BandcampPlugin extends CustomPlugin {
    constructor();
    validate(url: string): Promise<boolean>;
    play(channel: VoiceBasedChannel, url: string, opt: PlayOptions): Promise<void>;
}
//# sourceMappingURL=BCPlugin.d.ts.map