"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'help'
    ],
    type: 'default',
    run: (d) => {
        const embeds = d.lappy.makeEmbeds(d, {
            title: 'Help/Ayuda'
        });
        d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=help.js.map