"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, r, t, o) {
        void 0 === o && (o = t), Object.defineProperty(e, o, {
            enumerable: !0,
            get: function() {
                return r[t]
            }
        })
    } : function(e, r, t, o) {
        e[o = void 0 === o ? t : o] = r[t]
    }),
    __exportStar = this && this.__exportStar || function(e, r) {
        for (var t in e) "default" === t || Object.prototype.hasOwnProperty.call(r, t) || __createBinding(r, e, t)
    };

function noop(e = "void") {
    if ("void" != e) return "null" == e ? null : "undefined" == e ? void 0 : "number" == e ? 0 : "boolean" == e && !1
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.noop = void 0, exports.noop = noop, __exportStar(require("./generateCommandDoc"), exports), __exportStar(require("./resolveSnowflake"), exports), __exportStar(require("./findMember"), exports), __exportStar(require("./isBoolean"), exports), __exportStar(require("./paginator"), exports), __exportStar(require("./findUser"), exports), __exportStar(require("./inspect"), exports), __exportStar(require("./random"), exports), __exportStar(require("./reboot"), exports);