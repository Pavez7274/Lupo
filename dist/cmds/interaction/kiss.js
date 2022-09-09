"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'kiss'
    ],
    fields: [{
            name: 'target',
            type: 'memberResolvable',
            req: true
        }],
    desc: 'uh, well, u know, what couples do...',
    type: 'default',
    run: async (d) => {
        let snowy = await d.lappy.util.findMember(d.gd, d.args.string());
        if (!snowy)
            return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
        if (snowy.id === d.lappy?.user?.id) {
            return d.msg.reply('ew no');
        }
        else if (snowy.id === d.author.id) {
            return d.msg.reply('u\'re narcissistic?!?');
        }
        ;
        let result = await d.lappy.neko.img('kiss'), embeds = d.lappy.makeEmbeds(d, {
            image: { url: result.url },
            title: `${d.memb.displayName} is kissing ${snowy.displayName} ${(await Promise.resolve().then(() => __importStar(require('../../util/protos')))).faces.random()}!!`,
            footer: { text: `anime: ${result.anime_name}` }
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=kiss.js.map