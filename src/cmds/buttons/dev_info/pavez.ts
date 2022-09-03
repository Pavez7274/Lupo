// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'pavez'
	],
	type: 'button',
	run: async (d: Data): Promise<any> => {
		const embeds = d.lappy.makeEmbeds(d, {
			title: ':dividers: | About Pavez', 
			description: `Pavez isn't a nickname, it is her last name, [Maxim Pavez](https://instagram.com/pavez_dev) is my [Lead Programmer](https://en.m.wikipedia.org/wiki/Lead_programmer), in charge of everything that is added to me and owner of my license. 
Is a composer, her favorite instruments are the Electric [Bass](https://en.m.wikipedia.org/wiki/Bass_(instrument)) and [Piano](https://en.m.wikipedia.org/wiki/Piano), her favorite bands are [The Strokes](https://open.spotify.com/artist/0epOFNiUfyON9EYx7Tpr6V), [Interpol](https://open.spotify.com/artist/3WaJSfKnzc65VDgmj2zU8B) and [Boom Boom Kid](https://open.spotify.com/artist/2h2frsYL6pssri5AZdlMUU); Her favorite songs are [Hawaii](https://youtu.be/ZSSfcjAfC9w), [Roland](https://open.spotify.com/track/2pIk8EErerGs25iitIvZ03) and [Dejame Ser Parte de Esta Locura](https://open.spotify.com/track/2JukbU75jYGwqOtw7JT0a0).  
Prefers... well, she love dogs and loves his dogs more than anything. 
Doesn't watch series or movies but her favorite anime is [Violet Evergarden](https://en.m.wikipedia.org/wiki/Violet_Evergarden).  
She was born <t:1155884427:R> in [Argentina](https://en.m.wikipedia.org/wiki/Argentina) and speaks Spanish and English... has [insomnia](https://en.m.wikipedia.org/wiki/Insomnia), so, she is always available for you.`, 
			thumbnail: { url: 'https://cdn.glitch.global/4545da12-46a0-48f5-9b46-e3a12af140cd/20220821_053023.jpg?v=1661644871107' }, 
			footer: { text: 'She is also known as Yuka (ユカ)' }
		});
		return d!.int.reply({ embeds, ephemeral: true });
	}
};