"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, r, i) {
        void 0 === i && (i = r), Object.defineProperty(e, i, {
            enumerable: !0,
            get: function() {
                return t[r]
            }
        })
    } : function(e, t, r, i) {
        e[i = void 0 === i ? r : i] = t[r]
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
            for (var r in e) "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && __createBinding(t, e, r);
        return __setModuleDefault(t, e), t
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["kiss"],
    fields: [{
        name: "target",
        type: "memberResolvable",
        req: !0
    }],
    desc: "uh, well, u know, what couples do...",
    type: "default",
    run: async e => {
        var t = await e.lappy.util.findMember(e.gd, e.args.string());
        return t ? t.id === e.lappy?.user?.id ? e.msg.reply("ew no") : t.id === e.author.id ? e.msg.reply("u're narcissistic?!?") : (t = e.lappy.makeEmbeds(e, {
            image: await e.lappy.neko.img("kiss"),
            title: `${e.memb.displayName} is kissing ${t.displayName} ${(await Promise.resolve().then(()=>__importStar(require("../../util/protos")))).faces.random()}!!`
        }), e.msg.reply({
            embeds: t
        })) : e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`)
    }
};