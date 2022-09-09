"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'play',
        'p'
    ],
    fields: [{
            name: 'song',
            type: 'string',
            req: true
        }],
    voiceRequired: true,
    type: 'default',
    run: async (d) => {
        d.lappy.music.play(d.memb.voice.channel, d.args.string(), {
            textChannel: d.ch,
            member: d.memb,
            message: d.msg,
            metadata: d
        });
    }
};
//# sourceMappingURL=play.js.map