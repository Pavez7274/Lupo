require("./dist/util/protos");
const fs     = require("fs"),
    minify   = require("uglify-js")["minify"],
		beautify = require("js-beautify");
		spinnies = new (require('spinnies'))();
async function optimizePath (i) {
		await spinnies.add('ugly', { text: 'Optimizing The Code/Path Provided' });
    const e = await fs.readdirSync(i, {
            withFileTypes: !0
        }).map(e => (e.name = i + "/" + e.name, e)),
        r   = e.filter(e => e.isFile() && e.name.endsWith(".js")),
        n   = e.filter(e => e.isDirectory());
    for (var a of n) {
        a = await optimizePath(a.name);
        r.push(...a)
    }
    for (var i of r) {
				var x = fs.readFileSync(i.name).toString(),
					ifyed = beautify(minify(x)?.code);
				if (ifyed == x) continue;
        fs.writeFileSync(i.name, ifyed, "utf8");
        // console.log(`* [${"compiler"?.color("red")}] ${i.name?.color("red")} ${"is now unreadable shit"?.color("green")}`)
    };
	try {
		spinnies.succeed('ugly', { text: 'Ended Optimization' });
	} catch {};
	return r;
};
module.exports = {
	optimizeCode (str, options) {
		return beautify(minify(str)?.code, options)
	},
	async optimizeDist () {
		return await optimizePath(process.cwd().concat('/dist/'))
	},
	optimizePath
};