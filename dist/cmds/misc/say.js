"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'say',
        'owoify'
    ],
    fields: [{
            name: 'message',
            type: 'string',
            req: true
        }],
    bot_perms: [
        1 << 13
    ],
    run: async (d) => {
        let msg, owoify = d.args.endIsTrue('owoify') || d.cmd === 'owoify';
        try {
            msg = JSON.parse(d.args.string());
        }
        catch {
            msg = d.args.string();
        }
        ;
        let typeof_0 = typeof msg;
        if (typeof_0 === 'object' && 'embeds' in msg && msg.embeds.length > 5)
            return d.lappy.sendError(d, d.msg, 'length', 'the maximum of embeds is 5');
        typeof_0 === 'number' &&
            (msg += '');
        if (!['string', 'object'].includes(typeof_0) || Array.isArray(msg))
            return d.lappy.sendError(d, d.msg, 'type', 'you can only send `strings` or `objects/arrays`');
        if (owoify) {
            if (typeof_0 === 'object' && 'embeds' in msg) {
                msg.embeds = msg.embeds.map((embed) => {
                    embed.title &&
                        (embed.title = embed.title.OwOIfy());
                    embed.description &&
                        (embed.description = embed.description.OwOIfy());
                    embed.fields &&
                        (embed.fields = embed.fields.map((f) => {
                            f.value = f.value.OwOIfy();
                            return f;
                        }));
                    embed.footer &&
                        (embed.footer.text = embed.footer.text.OwOIfy());
                    return embed;
                });
            }
            else
                msg = msg.OwOIfy();
        }
        ;
        await d.ch.send(msg).catch((error) => d.lappy.sendError(d, d.msg, error.name, error.stack));
        return d.msg.delete();
    }
};
//# sourceMappingURL=say.js.map