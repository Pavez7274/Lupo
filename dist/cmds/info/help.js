"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const Table = require("ascii-table"),
    table = (new Table).removeBorder();
exports.default = {
    names: ["help"],
    fields: [{
        name: "command",
        type: "string",
        req: !1
    }],
    desc: "get help on a specific command",
    type: "default",
    run: l => {
        let s = l.lappy.cmds.default.map(({
                names: e
            }) => e[0]).sort((e, l) => e.localeCompare(l)),
            a = [];
        for (let l = 0; l < s.length; l += 2) {
            let e = [];
            s[l] && e.push(s[l]), s[++l] && e.push(s[l]), s[++l] && e.push(s[l]), a.push(e)
        }
        var e;
        if (table.addRowMatrix(a), l.args.ends.includes("--all") || !l.args.len) return e = l.lappy.makeEmbeds(l, {
            title: l.lappy.emotes.feli + " | help -> All Commands",
            description: table.toString().split("\n").map(e => e.trim()).join("\n").cropAt(4e3).toCodeBlock()
        }), l.msg.reply({
            embeds: e
        });
        let t = l.lappy.cmds.default.find(e => e.names.includes(l.args.get(0)));
        if (!t) return l.lappy.sendError(l, l.msg, "Not Found", `Command ['${l.args.get(0)}'] Not Found`);
        let o = l.lappy.makeEmbeds(l, {
            title: (l.lappy.emotes.tofu + " | help -> " + t.names[0]).toTitleCase(),
            fields: [{
                name: "Name/Alias",
                value: t.names.join(", ").toTitleCase().toCodeBlock(),
                fields: []
            }]
        });
        return t.desc && o[0].fields?.push({
            name: "Description",
            value: ("**" + t.desc + "**").toTitleCase()
        }), t.parsedFields && o[0].fields?.push({
            name: "Usage",
            value: (t.names[0] + " " + t.parsedFields).toTitleCase().toCodeBlock()
        }), t.fields && o[0].fields?.push({
            name: "Fields",
            value: t.fields.map(e => e.name.concat(e.req ? "" : "?") + " -> " + e.type).join("\n").toTitleCase().toCodeBlock()
        }), t.dev && o[0].fields?.push({
            name: "Important!",
            value: "This Command Can Only Be Executed By My Developers".toCodeBlock()
        }), l.msg.reply({
            embeds: o
        })
    }
};