// imports
import { Lupo } from './structures/Lupo';
import './util/protos';

// declarations
const client = new Lupo();
client.start();

// express (ignore)
import express from 'express';
const app = express();
app
	.get('/', (req: any, res: any) => {
		res.send('Just /owoify?text=STRING for now');
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