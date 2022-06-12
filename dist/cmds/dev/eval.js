"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.fields = exports.type = exports.desc = exports.dev = exports.names = void 0;
const discord_js_1 = require("discord.js");
const inspect_1 = __importDefault(require("../../util/inspect"));
const typescript_1 = require("typescript");
const coffeescript_1 = require("coffeescript");
const util_1 = require("util");
exports.names = ['eval', 'ev', 'js'];
exports.dev = 1;
exports.desc = 'Evaluate JavaScript/TypeScript Code Via `eval`';
exports.type = 'default';
exports.fields = [{ name: 'code', req: 1 }];
async function run(d) {
    let start = Date.now(), asynchorus = 0, compiled = 0, evaled = '', depth = 0, code;
    d.args.get(0)?.toLowerCase() === 'async' &&
        (asynchorus = 1) &&
        d.args.args.shift();
    try {
        if (d.args.ends.includes('--js')) {
            code = d.args.string();
        }
        else if (d.args.includes('--coffee')) {
            code = (0, coffeescript_1.compile)(d.args.string());
            compiled = 2;
        }
        else {
            code = (0, typescript_1.transpile)(d.args.string());
            compiled = 1;
        }
        ;
        evaled = await eval(asynchorus ? `(async (d) => ${code} )(d)` : code);
    }
    catch (_err) {
        let button_0 = new discord_js_1.MessageButton().setLabel('View Stack').setStyle('DANGER').setCustomId(discord_js_1.SnowflakeUtil.generate()), button_1 = new discord_js_1.MessageButton().setLabel('View Transpiled').setStyle('DANGER').setCustomId(discord_js_1.SnowflakeUtil.generate()).setDisabled(!compiled), row_0 = new discord_js_1.MessageActionRow().setComponents(button_0, button_1), msg_0 = await d.lappy.sendError(d, d.msg, _err.name, _err.message, void 0, [row_0.toJSON()]);
        await msg_0.createMessageComponentCollector({
            filter: (i) => [button_0.customId, button_1.customId].includes(i.customId),
            componentType: 2,
            time: 6e4
        })
            .on('collect', (i) => i.reply({
            content: (i.customId === button_0.customId ? _err.stack.toCodeBlock('bash') : code.toCodeBlock('js')),
            ephemeral: true
        }))
            .on('end', async () => {
            button_0.setDisabled(!0);
            button_1.setDisabled(!0);
            row_0.setComponents(button_0, button_1);
            return msg_0.edit({ components: [row_0.toJSON()] });
        });
        return;
    }
    ;
    let typeof_0 = typeof evaled, typeof_1 = (0, inspect_1.default)(evaled);
    typeof_0 !== 'string' &&
        (evaled = typeof_0 === 'function' ? evaled.toString() : (0, util_1.inspect)(evaled, { depth }));
    if (evaled && typeof_1 === 'date') {
        const time = Math.round(evaled / 1000);
        evaled = `<t:${time}>\n||${evaled}||`;
    }
    else {
        if (evaled.length >> 1000)
            evaled = evaled
                .slice(0, 1000) + '\n...';
        evaled = `${evaled}`.toCodeBlock('js');
    }
    ;
    const embeds = d.lappy.makeEmbeds(d, { title: `${d.lappy.emotes.tofu} | Eval` });
    embeds[0]
        .addField(':incoming_envelope: | Input', code.toCodeBlock('js'))
        .addField(':page_facing_up: | Output', evaled || 'undefined')
        .addField(':scroll: | Language', ((compiled == 2 && 'coffeescript') || (compiled == 1 && 'typescript') || 'javascript').toCodeBlock())
        .addField(':card_box: | Type', typeof_1.toCodeBlock('js'))
        .addField(':stopwatch: | Execution time', (Date.now() - start + 'Ms').toCodeBlock('js'));
    return await d.msg.reply({ embeds });
}
exports.run = run;
;
//# sourceMappingURL=eval.js.map