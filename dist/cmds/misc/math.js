"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const math = __importStar(require("math-expression-evaluator"));
exports.default = {
    names: [
        'calculate',
        'calc',
        'math'
    ],
    fields: [{
            name: 'operation',
            type: 'any',
            req: true
        }],
    desc: 'a simple calculator',
    type: 'default',
    run: async (d) => {
        let answer;
        try {
            answer = math.eval(d.args.string());
        }
        catch (error) {
            return d.lappy.sendError(d, d.msg, undefined, 'Invalid mathematical calculation: ' + error?.message);
        }
        ;
        let embeds = d.lappy.makeEmbeds(d, {
            title: `${d.lappy.emotes.tofu} | Math`,
            fields: [{
                    name: '📬 | Input',
                    value: d.args.string().toCodeBlock()
                }, {
                    name: '📭 | Output',
                    value: String(answer).toCodeBlock('js')
                }]
        });
        return d.msg.reply({ embeds });
    }
};
//# sourceMappingURL=math.js.map