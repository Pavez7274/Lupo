"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, r, a) {
        void 0 === a && (a = r), Object.defineProperty(e, a, {
            enumerable: !0,
            get: function() {
                return t[r]
            }
        })
    } : function(e, t, r, a) {
        e[a = void 0 === a ? r : a] = t[r]
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
    names: ["handhold", "takehand"],
    fields: [{
        name: "target",
        type: "memberResolvable",
        req: !0
    }],
    desc: "hold someone's hand",
    type: "default",
    run: async e => {
        if (!(r = await e.lappy.util.findMember(e.gd, e.args.string()))) return e.lappy.sendError(e, e.msg, "not found", `No Matches Were Found With ['${e.args.string().slice(0,10)}']`);
        if (r.id === e.lappy?.user?.id) return e.msg.reply(["ew, no.", "wash ur hand", "no.", "of course, when communism works"].random());
        if (r.id === e.author.id) return e.msg.reply(`that's s${"o".repeat(e.lappy.util.random(5,1))} pathetic`);
        var t = await e.lappy.neko.img("handhold"),
            r = e.lappy.makeEmbeds(e, {
                image: {
                    url: t.url
                },
                title: `${e.memb.displayName} is holding hands with ${r.displayName} ` + (await Promise.resolve().then(() => __importStar(require("../../util/protos")))).faces.random(),
                footer: {
                    text: "anime: " + t.anime_name
                }
            });
        return e.msg.reply({
            embeds: r
        })
    }
};