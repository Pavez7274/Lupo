require("./dist/util/protos");
const fs = require("fs"),
    minify = require("uglify-js")["minify"];
async function nya(i) {
    const e = fs.readdirSync(i, {
            withFileTypes: !0
        }).map(e => (e.name = i + "/" + e.name, e)),
        r = e.filter(e => e.isFile() && e.name.endsWith(".js")),
        n = e.filter(e => e.isDirectory());
    for (var a of n) {
        a = await nya(a.name);
        r.push(...a)
    }
    for (var i of r) {
        var x = fs.readFileSync(i.name).toString();
        fs.writeFileSync(i.name, require("js-beautify")(minify(x)?.code), "utf8");
        console.log(`* [${"compiler"?.color("red")}] ${i.name?.color("red")} ${"is now unreadable shit"?.color("green")}`)
    };
	return r;
};
module.exports = nya;