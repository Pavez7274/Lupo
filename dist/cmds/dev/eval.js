"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.fields = exports.type = exports.desc = exports.dev = exports.names = void 0;
const discord_js_1 = require("discord.js");
const child_process_1 = require("child_process");
const typescript_1 = require("typescript");
const coffeescript_1 = require("coffeescript");
const inspect_1 = __importDefault(require("../../util/inspect"));
const util_1 = require("util");
exports.names = [
    'coffee',
    'eval',
    'js',
    'ts',
    'bash'
];
exports.dev = 1;
exports.desc = 'evaluate javascript, typescript or coffeescript code via `eval()`, `typescript.transpile()`, `coffee.compile()` or `child_process execSync()`';
exports.type = 'default';
exports.fields = [{
        name: 'code',
        type: 'string',
        req: true
    }];
async function run(d) {
    let start = Date.now(), asynchorus = 0, compiled = [false, 'JavaScript'], evaled = '', depth = 0, code;
    d.args.get(0)?.toLowerCase() === 'async' &&
        (asynchorus = 1) &&
        d.args.args.shift();
    try {
        if (d.args.endIsTrue('(javascript|js)') || d.cmd === 'js') {
            code = d.args.string();
        }
        else if (d.args.endIsTrue('(coffee|cs)') || d.cmd === 'coffee') {
            code = (0, child_process_1.execSync)(d.args.string()).toString();
            compiled = [true, 'CoffeeScript'];
        }
        else if (d.args.endIsTrue('(bash|exec)') || ['bash', 'exec'].includes(d.cmd)) {
            code = (0, coffeescript_1.compile)(d.args.string());
            compiled = [false, 'Bash'];
        }
        else {
            code = (0, typescript_1.transpile)(d.args.string());
            compiled = [true, 'TypeScript'];
        }
        ;
        evaled = await eval(asynchorus ? `(async (d) => {${code}} )(d)` : code);
    }
    catch (_err) {
        let button_0 = new discord_js_1.MessageButton()
            .setLabel('View Stack')
            .setStyle('DANGER')
            .setCustomId(discord_js_1.SnowflakeUtil.generate()), button_1 = new discord_js_1.MessageButton()
            .setLabel('View Transpiled/Compiled')
            .setStyle('DANGER')
            .setCustomId(discord_js_1.SnowflakeUtil.generate())
            .setDisabled(!compiled[0]), row_0 = new discord_js_1.MessageActionRow().setComponents(button_0, button_1), msg_0 = await d.lappy.sendError(d, d.msg, _err.name, _err.message, void 0, [row_0.toJSON()]);
        await msg_0.createMessageComponentCollector({
            filter: (i) => [button_0.customId, button_1.customId].includes(i.customId),
            componentType: 2,
            time: 6e4
        })
            .on('collect', (i) => i.reply({
            content: (i.customId === button_0.customId ? _err?.stack?.toCodeBlock('bash') || 'Failed To Display Error' : code.toCodeBlock('js')),
            ephemeral: true
        }))
            .on('end', async () => {
            button_0.setDisabled(true);
            button_1.setDisabled(true);
            row_0.setComponents(button_0, button_1);
            return msg_0.edit({ components: [row_0.toJSON()] });
        });
        return;
    }
    ;
    let typeof_0 = typeof evaled, typeof_1 = (0, inspect_1.default)(evaled), result = evaled;
    if (typeof_0 !== 'string') {
        result = typeof_0 === 'function' ? evaled.toString() : (0, util_1.inspect)(evaled, { depth });
    }
    ;
    if (evaled && typeof_1 === 'date') {
        const time = Math.floor(Number(evaled) / 1000);
        result = `<t:${time}>\n\`${evaled}\``;
    }
    else {
        if (result.length > 1000)
            result = result
                .slice(0, 1000) + '\n...';
        result = `${result}`.toCodeBlock('js');
    }
    ;
    if (d.args.endIsFalse('embed')) {
        return d.msg.reply(result ?? 'unknown');
    }
    else {
        const embeds = d.lappy.makeEmbeds(d, { title: `${d.lappy.emotes.tofu} | Eval -> ${compiled[1]}` });
        embeds[0]
            .addField(':incoming_envelope: | Input', code.toCodeBlock('js'))
            .addField(':page_facing_up: | Output', result ?? 'unknown')
            .addField(':card_box: | Type', typeof_1.toCodeBlock('js'))
            .addField(':stopwatch: | Execution time', (Date.now() - start + 'Ms').toCodeBlock('js'));
        return await d.msg.reply({ embeds });
    }
    ;
}
exports.run = run;
;
//# sourceMappingURL=eval.js.map