"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    names: ["help"],
    fields: [{
        name: "command",
        type: "string",
        req: !1
    }],
    desc: "get help on a specific command",
    type: "default",
    run: s => {
        var e;
        if (s.args.ends.includes("--all")) return e = s.lappy.makeEmbeds(s, {
            title: s.lappy.emotes.feli + " | help -> All Commands",
            description: s.lappy.cmds.default.map(({
                names: e
            }) => e[0]).sort((e, s) => e.localeCompare(s)).join(", ").cropAt(4e3).toCodeBlock()
        }), s.msg.reply({
            embeds: e
        });
        if (0 === s.args.len) return s.lappy.sendError(s, s.msg, "Field", "Field 1 ['command'] Cannot Be Empty");
        let l = s.lappy.cmds.default.find(e => e.names.includes(s.args.get(0)));
        if (!l) return s.lappy.sendError(s, s.msg, "Not Found", `Command ['${s.args.get(0)}'] Not Found`);
        let a = s.lappy.makeEmbeds(s, {
            title: (s.lappy.emotes.tofu + " | help -> " + l.names[0]).toTitleCase(),
            fields: [{
                name: "Name/Alias",
                value: l.names.join(", ").toTitleCase().toCodeBlock(),
                fields: []
            }]
        });
        return l.desc && a[0].fields?.push({
            name: "Description",
            value: ("**" + l.desc + "**").toTitleCase()
        }), l.parsedFields && a[0].fields?.push({
            name: "Usage",
            value: (l.names[0] + " " + l.parsedFields).toTitleCase().toCodeBlock()
        }), l.fields && a[0].fields?.push({
            name: "Fields",
            value: l.fields.map(e => e.name.concat(e.req ? "" : "?") + " -> " + e.type).join("\n").toTitleCase().toCodeBlock()
        }), l.dev && a[0].fields?.push({
            name: "Important!",
            value: "This Command Can Only Be Executed By My Developers".toCodeBlock()
        }), s.msg.reply({
            embeds: a
        })
    }
};