"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["say", "owoify"],
    fields: [{
        name: "message",
        type: "string",
        req: !0
    }],
    bot_perms: ["ManageMessages"],
    desc: "make me say something!!",
    run: async s => {
        if (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi.test(s.args.string())) return await s.lappy.sendError(s, s.msg, "Restriction -> URLs", "One or More URLs Were Detected In Your Message"), s.msg.delete().catch(() => {});
        let e, t = s.args.endIsTrue("owoify") || "owoify" === s.cmd;
        try {
            e = JSON.parse(s.args.string())
        } catch {
            e = s.args.string()
        }
        var r = typeof e;
        return "object" == r && "embeds" in e && 5 < e.embeds.length ? s.lappy.sendError(s, s.msg, "length", "the maximum of embeds is 5") : ("number" == r && (e += ""), !["string", "object"].includes(r) || Array.isArray(e) ? s.lappy.sendError(s, s.msg, "type", "you can only send `strings` or `objects/arrays`") : (t && ("object" == r && "embeds" in e ? e.embeds = e.embeds.map(e => (e.title && (e.title = e.title.OwOIfy()), e.description && (e.description = e.description.OwOIfy()), e.fields && (e.fields = e.fields.map(e => (e.value = e.value.OwOIfy(), e))), e.footer && (e.footer.text = e.footer.text.OwOIfy()), e)) : e = e.OwOIfy()), await s.ch.send(e).catch(e => s.lappy.sendError(s, s.msg, e.name, e.stack)), s.msg.delete().catch(() => {})))
    }
};