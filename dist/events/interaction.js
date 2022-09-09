"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.name = void 0;
exports.name = 'interactionCreate';
exports.type = 'dsc';
async function run(lappy, int) {
    if (int.type == 2) {
        let cmd = await lappy.cmds.default.find((cmd) => cmd.names.includes(int.commandName.split(/_/g)[0]) || cmd?.context === int.commandName);
        if (!cmd || !cmd.contextRun)
            return int.deferReply();
        return cmd.contextRun({ lappy, int });
    }
    ;
}
exports.run = run;
;
//# sourceMappingURL=interaction.js.map