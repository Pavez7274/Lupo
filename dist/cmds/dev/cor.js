"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["cor"],
    type: "default",
    dev: 1,
    desc: "compile, optimize and reload",
    run: async e => {
        try {
            await require("child_process").execSync("tsc")
        } catch {}
        return await require(process.cwd().concat("/uglifier")).optimizeDist() && e.args.endIsTrue("all") ? e.lappy.util.reboot() : e.lappy.commands(), e.msg.reply("made it.")
    }
};