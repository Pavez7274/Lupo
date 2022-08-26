"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["cor"],
    type: "default",
    dev: 1,
    desc: "compile, optimize and reload",
    run: async e => {
        let t = await e.msg.reply("starting...");
        try {
            await t.edit("compiling..."), await require("child_process").execSync("tsc")
        } catch {}
        return await t.edit("optimizing dist..."), await require(process.cwd().concat("/uglifier")).optimizeDist() && e.args.endIsTrue("all") ? e.lappy.util.reboot() : e.lappy.commands(), t.edit("made it.")
    }
};