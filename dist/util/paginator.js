"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const discord_js_1 = require("discord.js");
async function paginator(data, ins, pages, time = 6e4, ephemeral = false) {
    let components = [new discord_js_1.ActionRowBuilder()], actual = 0;
    components[0].setComponents(new discord_js_1.ButtonBuilder().setCustomId('back').setLabel('<<').setStyle(1).setDisabled(true), new discord_js_1.ButtonBuilder().setCustomId('next').setLabel('>>').setStyle(1).setDisabled(pages.length === 1));
    if (!(ins instanceof discord_js_1.Message) && !ins.deferred)
        await ins.deferReply({ ephemeral });
    const $ = await ins?.[ins instanceof discord_js_1.Message ? 'edit' : 'editReply']({
        embeds: data.lappy.makeEmbeds(data, pages[actual]),
        fetchReply: true,
        components
    });
    function filter(i) {
        return ['back', 'next'].includes(i.customId);
    }
    ;
    const col = await $.createMessageComponentCollector({
        type: 2, filter, time
    });
    col.on('collect', (i) => {
        if (i.customId === 'back')
            actual = actual > 0
                ? actual - 1
                : 0;
        else if (i.customId === 'next')
            actual = pages.length - 1 > actual
                ? actual + 1
                : pages.length - 1;
        components[0].components[0].setDisabled(actual <= 0);
        components[0].components[1].setDisabled(actual >= pages.length - 1);
        i.update({
            embeds: data.lappy.makeEmbeds(data, pages[actual]),
            components
        });
        col.resetTimer();
    }).on('end', (nya, r) => {
        if (r === 'messageDelete')
            return;
        components[0].components[0].setDisabled(true);
        components[0].components[1].setDisabled(true);
        ins?.[ins instanceof discord_js_1.Message ? 'edit' : 'editReply']({
            embeds: data.lappy.makeEmbeds(data, pages[actual]),
            components
        });
    });
}
exports.paginator = paginator;
;
exports.default = paginator;
//# sourceMappingURL=paginator.js.map