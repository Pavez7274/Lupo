"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["filter"],
    desc: "add or remove an audio filter",
    fields: [{
        name: "filter",
        type: "STRING",
        req: !1
    }],
    type: "default",
    run: async e => {
        let r = e.lappy.music.getQueue(e.gd);
        if (!r) return e.lappy.sendError(e, e.msg, "No Music", "I'm not in a voice chat");
        if (!e.args.len) return e.msg.reply(r.filters.size ? `\`${r.filters.names.join(" | ")}\`` : "No filters added");
        var i, s = e.args.get(0).toLowerCase();
        return "clean" == s && r.filters.size ? r.filters.clear() : e.lappy.music.filters[s] ? (r.filters[i = r.filters.has(s) ? "remove" : "add"](s), e.msg.reply(`${"add"==i?"Added":"Removed"} *${s}* filter`)) : e.lappy.sendError(e, e.msg, "Field -> Invalid", `The filter provided in field 1 ['Filter'] isn't valid

Filters: ` + Object.keys(e.lappy.music.filters).join(", "))
    }
};