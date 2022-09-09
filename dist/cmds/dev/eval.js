"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.fields = exports.type = exports.desc = exports.dev = exports.names = void 0;
const discord_js_1 = require("discord.js");
const typescript_1 = require("typescript");
const coffeescript_1 = require("coffeescript");
const uglify_js_1 = require("uglify-js");
const util_1 = require("util");
const axios_1 = __importDefault(require("axios"));
exports.names = [
    'eval',
    'coffee',
    'js',
    'ts',
    'bash',
    'exec'
];
exports.dev = 1;
exports.desc = 'evaluate javascript, typescript, coffeescript or bash code via `eval()`, `typescript.transpile()`, `coffee.compile()` or `child_process.execSync()`';
exports.type = 'default';
exports.fields = [{
        name: 'code',
        type: 'string',
        req: true
    }];
async function run(d) {
    let start = Date.now(), asynchorus = 0, compiled = [false, 'JavaScript'], evaled = '', depth = 0, code;
    d.args.get(0)?.toLowerCase() === 'async' &&
        (asynchorus = 1) && d.args.args.shift();
    try {
        if (d.args.endIsTrue('(javascript|js)') || d.cmd === 'js') {
            code = d.args.string();
        }
        else if (d.args.endIsTrue('(coffee|cs)') || d.cmd === 'coffee') {
            code = (0, coffeescript_1.compile)(d.args.string());
            compiled = [true, 'CoffeeScript'];
        }
        else if (d.args.endIsTrue('(bash|exec)') || ['bash', 'exec'].includes(d.cmd)) {
            code = `require('child_process').execSync('${d.args.string()}').toString()`;
            compiled = [false, 'Bash'];
        }
        else {
            code = (0, typescript_1.transpile)(d.args.string());
            compiled = [true, 'TypeScript'];
        }
        ;
        code = await (0, uglify_js_1.minify)(code)?.code ?? code;
        evaled = await eval(asynchorus ? `(async (d) => {${code}} )(d)` : code);
    }
    catch (_err) {
        let button_0 = new discord_js_1.ButtonBuilder()
            .setLabel('View Stack')
            .setStyle(4)
            .setCustomId(String(discord_js_1.SnowflakeUtil.generate())), button_1 = new discord_js_1.ButtonBuilder()
            .setLabel('View Transpiled/Compiled')
            .setStyle(4)
            .setCustomId(String(discord_js_1.SnowflakeUtil.generate()))
            .setDisabled(!compiled[0]), row_0 = new discord_js_1.ActionRowBuilder().setComponents(button_0, button_1), msg_0 = await d.lappy.sendError(d, d.msg, _err?.name, _err?.message, void 0, [row_0.toJSON()]);
        msg_0.createMessageComponentCollector({
            filter: (i) => [button_0.data.custom_id, button_1.data.custom_id].includes(i.customId),
            componentType: 2,
            time: 6e4
        })
            .on('collect', (i) => {
            i.reply({
                content: (i.customId === button_0.data.custom_id ? _err?.stack?.toCodeBlock('bash') || 'Failed To Display Error' : code.toCodeBlock('js')),
                ephemeral: true
            });
        })
            .on('end', () => {
            button_0.setDisabled(true);
            button_1.setDisabled(true);
            row_0.setComponents(button_0, button_1);
            msg_0.edit({ components: [row_0.toJSON()] });
        });
        return;
    }
    ;
    if (d.args.endIsTrue('(noreturn|nosend|n[rs])'))
        return void 0;
    let typeof_0 = typeof evaled, typeof_1 = d.lappy.util.getType(evaled), result = evaled;
    if (typeof_0 !== 'string') {
        result = typeof_0 === 'function' ? evaled.toString() : (0, util_1.inspect)(evaled, { depth });
    }
    ;
    if (evaled && typeof_1 === 'date') {
        const time = Math.floor(Number(evaled) / 1000);
        result = `<t:${time}>\n\`${evaled}\``;
    }
    else
        result = result.cropAt(1000).toCodeBlock('js');
    if (d.args.endIsFalse('embed')) {
        return d.msg.reply(result.cropAt(2000) ?? 'unknown');
    }
    else {
        const embeds = d.lappy.makeEmbeds(d, {
            title: `${d.lappy.emotes.tofu} | Eval -> ${compiled[1]}`,
            fields: [{
                    name: '✉️ | code provided',
                    value: code.cropAt(1000).toCodeBlock('js')
                }, {
                    name: '📃 | answer',
                    value: result ?? '```ts\nunknown```'
                }, {
                    name: '📖 | extra',
                    value: `**[ Type ]** -> \`${typeof_1}\`\n**[ Time ]** -> \`${Date.now() - start ?? 0}Ms\``
                }]
        });
        if (typeof_0 == 'string' && evaled?.startsWith('https://') && axios_1.default.get(result).then(({ headers }) => headers?.['content-type']?.includes('image')).catch(() => false))
            embeds[0].image = { url: evaled };
        return await d.msg.reply({ embeds });
    }
    ;
}
exports.run = run;
;
//# sourceMappingURL=eval.js.map