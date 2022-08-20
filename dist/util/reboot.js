"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.reboot = void 0;
const child_process_1 = require("child_process");

function reboot() {
    process.on("exit", () => (0, child_process_1.spawn)(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: !0,
        stdio: "inherit"
    })), process.exit()
}
exports.reboot = reboot, exports.default = reboot;