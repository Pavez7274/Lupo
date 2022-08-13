"use strict";

function run() {
    var e = new Date(Date.now()).toLocaleString("en-gb", {
        timeZone: "America/Mendoza"
    });
    console.log("* [client] :: Ready at", e)
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.run = exports.once = exports.type = exports.name = void 0, exports.name = "ready", exports.type = "dsc", exports.once = !0, exports.run = run;