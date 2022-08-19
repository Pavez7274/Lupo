"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.run = exports.fields = exports.type = exports.desc = exports.dev = exports.names = void 0;
const discord_js_1 = require("discord.js"),
    typescript_1 = require("typescript"),
    coffeescript_1 = require("coffeescript"),
    uglify_js_1 = require("uglify-js"),
    util_1 = require("util");
async function run(d) {
    let start = Date.now(),
        asynchorus = 0,
        compiled = [!1, "JavaScript"],
        evaled = "",
        depth = 0,
        code;
    "async" === d.args.get(0)?.toLowerCase() && (asynchorus = 1) && d.args.args.shift();
    try {
        d.args.endIsTrue("(javascript|js)") || "js" === d.cmd ? code = d.args.string() : compiled = d.args.endIsTrue("(coffee|cs)") || "coffee" === d.cmd ? (code = (0, coffeescript_1.compile)(d.args.string()), [!0, "CoffeeScript"]) : d.args.endIsTrue("(bash|exec)") || ["bash", "exec"].includes(d.cmd) ? (code = `require('child_process').execSync('${d.args.string()}').toString()`, [!1, "Bash"]) : (code = (0, typescript_1.transpile)(d.args.string()), [!0, "TypeScript"]), code = await (0, uglify_js_1.minify)(code)?.code ?? code, evaled = await eval(asynchorus ? `(async (d) => {${code}} )(d)` : code)
    } catch (_err) {
        let button_0 = (new discord_js_1.ButtonBuilder).setLabel("View Stack").setStyle(4).setCustomId(String(discord_js_1.SnowflakeUtil.generate())),
            button_1 = (new discord_js_1.ButtonBuilder).setLabel("View Transpiled/Compiled").setStyle(4).setCustomId(String(discord_js_1.SnowflakeUtil.generate())).setDisabled(!compiled[0]),
            row_0 = (new discord_js_1.ActionRowBuilder).setComponents(button_0, button_1),
            msg_0 = await d.lappy.sendError(d, d.msg, _err?.name, _err?.message, void 0, [row_0.toJSON()]);
        return void msg_0.createMessageComponentCollector({
            filter: e => [button_0.data.custom_id, button_1.data.custom_id].includes(e.customId),
            componentType: 2,
            time: 6e4
        }).on("collect", e => {
            e.reply({
                content: e.customId === button_0.data.custom_id ? _err?.stack?.toCodeBlock("bash") || "Failed To Display Error" : code.toCodeBlock("js"),
                ephemeral: !0
            })
        }).on("end", () => {
            button_0.setDisabled(!0), button_1.setDisabled(!0), row_0.setComponents(button_0, button_1), msg_0.edit({
                components: [row_0.toJSON()]
            })
        })
    }
    if (!d.args.endIsTrue("(noreturn|nosend|n[rs])")) {
        let typeof_0 = typeof evaled,
            typeof_1 = d.lappy.util.getType(evaled),
            result = evaled;
        if ("string" !== typeof_0 && (result = "function" === typeof_0 ? evaled.toString() : (0, util_1.inspect)(evaled, {
                depth: depth
            })), evaled && "date" === typeof_1) {
            const time = Math.floor(Number(evaled) / 1e3);
            result = `<t:${time}>
\`${evaled}\``
        }
        if (d.args.endIsFalse("embed")) return d.msg.reply(result.cropAt(2e3) ?? "unknown"); {
            const embeds = d.lappy.makeEmbeds(d, {
                title: d.lappy.emotes.tofu + " | Eval -> " + compiled[1],
                fields: [{
                    name: "✉️ | code provided",
                    value: code.cropAt(1e3).toCodeBlock("js")
                }, {
                    name: "📃 | answer",
                    value: result.cropAt(1e3).toCodeBlock("js") ?? "```ts\nunknown```"
                }, {
                    name: "📖 | extra",
                    value: `**[ Type ]** -> \`${typeof_1}\`
**[ Time ]** -> \`${Date.now()-start??0}Ms\``
                }]
            });
            return d.msg.reply({
                embeds: embeds
            })
        }
    }
}
exports.names = ["eval", "coffee", "js", "ts", "bash", "exec"], exports.dev = 1, exports.desc = "evaluate javascript, typescript, coffeescript or bash code via `eval()`, `typescript.transpile()`, `coffee.compile()` or `child_process.execSync()`", exports.type = "default", exports.fields = [{
    name: "code",
    type: "string",
    req: !0
}], exports.run = run;