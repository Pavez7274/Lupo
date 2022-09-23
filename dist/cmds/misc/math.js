"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, a, r) {
        void 0 === r && (r = a), Object.defineProperty(e, r, {
            enumerable: !0,
            get: function() {
                return t[a]
            }
        })
    } : function(e, t, a, r) {
        e[r = void 0 === r ? a : r] = t[a]
    }),
    __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        })
    } : function(e, t) {
        e.default = t
    }),
    __importStar = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var a in e) "default" !== a && Object.prototype.hasOwnProperty.call(e, a) && __createBinding(t, e, a);
        return __setModuleDefault(t, e), t
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const math = __importStar(require("math-expression-evaluator"));
exports.default = {
    names: ["calculate", "calc", "math"],
    fields: [{
        name: "operation",
        type: "any",
        req: !0
    }],
    desc: "a simple calculator",
    type: "default",
    run: async e => {
        let t;
        try {
            t = math.eval(e.args.string())
        } catch (t) {
            return e.lappy.sendError(e, e.msg, void 0, "Invalid mathematical calculation: " + t?.message)
        }
        var a = e.lappy.makeEmbeds(e, {
            title: e.lappy.emotes.tofu + " | Math",
            fields: [{
                name: "📬 | Input",
                value: e.args.string().toCodeBlock()
            }, {
                name: "📭 | Output",
                value: String(t).toCodeBlock("js")
            }]
        });
        return e.msg.reply({
            embeds: a
        })
    }
};