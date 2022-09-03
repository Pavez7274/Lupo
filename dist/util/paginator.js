"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.paginator = void 0;
const discord_js_1 = require("discord.js");
async function paginator(s, o, n, e = 6e4, t = !1) {
    let d = [new discord_js_1.ActionRowBuilder],
        a = 0;
    d[0].setComponents((new discord_js_1.ButtonBuilder).setCustomId("back").setLabel("<<").setStyle(1).setDisabled(!0), (new discord_js_1.ButtonBuilder).setCustomId("next").setLabel(">>").setStyle(1).setDisabled(1 === n.length)), o instanceof discord_js_1.Message || o.deferred || await o.deferReply({
        ephemeral: t
    });
    const i = await o?.[o instanceof discord_js_1.Message ? "edit" : "editReply"]({
            embeds: s.lappy.makeEmbeds(s, n[a]),
            fetchReply: !0,
            components: d
        }),
        c = await i.createMessageComponentCollector({
            type: 2,
            filter: function(e) {
                return ["back", "next"].includes(e.customId)
            },
            time: e
        });
    c.on("collect", e => {
        "back" === e.customId ? a = 0 < a ? a - 1 : 0 : "next" === e.customId && (a = n.length - 1 > a ? a + 1 : n.length - 1), d[0].components[0].setDisabled(a <= 0), d[0].components[1].setDisabled(a >= n.length - 1), e.update({
            embeds: s.lappy.makeEmbeds(s, n[a]),
            components: d
        }), c.resetTimer()
    }).on("end", (e, t) => {
        "messageDelete" !== t && (d[0].components[0].setDisabled(!0), d[0].components[1].setDisabled(!0), o?.[o instanceof discord_js_1.Message ? "edit" : "editReply"]({
            embeds: s.lappy.makeEmbeds(s, n[a]),
            components: d
        }))
    })
}
exports.paginator = paginator, exports.default = paginator;