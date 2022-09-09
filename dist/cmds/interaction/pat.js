"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'pat'
    ],
    fields: [{
            name: 'target',
            type: 'memberResolvable',
            req: true
        }],
    type: 'default',
    desc: 'pat someone!!',
    run: async (d) => {
        let snowy = await d.lappy.util.findMember(d.gd, d.args.string()), title;
        if (!snowy)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
        if (snowy.id === d.lappy?.user?.id) {
            title = `${d.memb.displayName} are pat me ${d.lappy.emotes.luv}`;
        }
        else if (snowy.id === d.author.id) {
            title = `${d.memb.displayName}'s pats him/herself -w-`;
        }
        else {
            title = `${d.memb.displayName}'s pats ${snowy.displayName} ${d.lappy.emotes.feli}`;
        }
        let result = await d.lappy.neko.img('pat'), embeds = d.lappy.makeEmbeds(d, {
            image: { url: result.url },
            title,
            footer: { text: `anime: ${result.anime_name}` }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=pat.js.map