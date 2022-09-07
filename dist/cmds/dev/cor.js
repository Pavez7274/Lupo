"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["cor"],
    ends: [{
        names: ["reboot", "rt", "r"],
        type: "BOOLEAN",
        default: "no"
    }, {
        names: ["commands", "cmds", "c"],
        type: "BOOLEAN",
        default: "yes"
    }, {
        names: ["events", "evs", "e"],
        type: "BOOLEAN",
        default: "yes"
    }],
    type: "default",
    dev: 1,
    desc: "compile, optimize and reload",
    run: async e => {
        let t = await e.msg.reply("starting...");
        try {
            await t.edit("compiling..."), await require("child_process").execSync("tsc")
        } catch {}
        return await t.edit("optimizing dist..."), await require(process.cwd().concat("/uglifier")).optimizeDist(), e.args.endIsTrue("(reboot|rt|r)") ? (t.edit("rebooting..."), e.reboot()) : (e.args.endIsTrue("(commands|cmds|c)", !0) && e.lappy.commands(), e.args.endIsTrue("(events|evs|e)", !0) && e.lappy.events(), t.edit("made it."))
    }
};