"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'hug'
    ],
    fields: [{
            name: 'target',
            type: 'memberResolvable',
            req: true
        }],
    type: 'default',
    desc: 'hug someone >w<',
    run: async (d) => {
        let snowy = await d.lappy.util.findMember(d.gd, d.args.string()), title;
        if (!snowy)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
        if (snowy.id === d.lappy?.user?.id) {
            title = `${d.memb.displayName} are hugging me?! ${d.lappy.emotes.error}`;
        }
        else if (snowy.id === d.author.id) {
            title = `${d.memb.displayName} is hugging him/herself -w-`;
        }
        else {
            title = `${d.memb.displayName} is hugging ${snowy.displayName} ${d.lappy.emotes.feli}`;
        }
        ;
        let result = await d.lappy.neko.img('hug'), embeds = d.lappy.makeEmbeds(d, {
            image: { url: result.url },
            title,
            footer: { text: `anime: ${result.anime_name}` }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=hug.js.map