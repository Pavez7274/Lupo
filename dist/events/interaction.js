"use strict";
async function run(t, n) {
    if (2 == n.type) {
        let e = await t.cmds.default.find(e => e.names.includes(n.commandName.split(/_/g)[0]) || e?.context === n.commandName);
        return e && e.contextRun ? e.contextRun({
            lappy: t,
            int: n
        }) : n.deferReply()
    }
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.run = exports.type = exports.name = void 0, exports.name = "interactionCreate", exports.type = "dsc", exports.run = run;