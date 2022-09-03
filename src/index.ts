// imports
import { Lupo } from './structures/Lupo';
import './util/protos';

// declarations
const client = new Lupo();
client.start();

// express (ignore)
import { readFile } from 'fs/promises';
import { marked } from 'marked';
import express from 'express';
const app = express();
app
	.get('/', (req: any, res: any) => {
		res.send('Just /owoify?text=STRING for now');
	})
	.get('/doc/:cmd', (req: any, res: any) => {
			readFile(process.cwd() + `/docs/${req.params.cmd}.md`, 'utf8')
				.then((data: string) => res.send(marked(data.toString())))
				.catch(() => res.send('File Not Found'));
	})
	.get('/owoify', (req: any, res: any) => {
		if (!req.query.text)
			res.json({
				msg: 'hey shitty dev, you forgot to provide a text'.OwOIfy()
			});
		res.json({
			msg: req.query.text.OwOIfy()
		});
	});
app.listen(8080, () => {
	console.log('* [server] :: Ready')
});

// ignore this
setInterval(async () => {
	(await import('axios') as any).get('https://pavez.ml/');
}, 2e4)