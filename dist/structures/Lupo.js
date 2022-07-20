"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Lupo=void 0;const discord_js_1=require("discord.js"),soundcloud_1=require("@distube/soundcloud"),spotify_1=require("@distube/spotify"),generateCommandDoc_1=require("../util/generateCommandDoc"),DataBase_1=require("./DataBase"),glob_1=require("glob"),distube_1=__importDefault(require("distube"));class Lupo extends discord_js_1.Client{emotes={error:"<:lappyAaa:913295794151501864>",feli:"<:lappyfeli:913295978205966338>",tofu:"<:lappytofu:902410429601570866>",keyboard:"<:bunnykeyboard:998811876974678017>"};constructor(){super({allowedMentions:{repliedUser:!1},presence:{status:"dnd",activities:[{name:"* Naoki Solutions :: Updating to djs v14!!",type:0}]},intents:[discord_js_1.GatewayIntentBits.Guilds,discord_js_1.GatewayIntentBits.GuildMembers,discord_js_1.GatewayIntentBits.GuildVoiceStates,discord_js_1.GatewayIntentBits.GuildMessages,discord_js_1.GatewayIntentBits.GuildPresences,discord_js_1.GatewayIntentBits.MessageContent]}),Object.defineProperties(this,{db:{value:new DataBase_1.DB({tables:[{name:"main"},{name:"snipe"}],path:"./db/"},"main")},music:{value:new distube_1.default(this,{plugins:[new soundcloud_1.SoundCloudPlugin,new spotify_1.SpotifyPlugin],leaveOnFinish:!1,leaveOnEmpty:!1,leaveOnStop:!1,searchSongs:5,nsfw:!0})},cache:{value:new discord_js_1.Collection},cmds:{value:new Object},owners:{value:["788869971073040454","878235498055864382"]}})}commands(){return console.log("* [handler] :: Running -> Commands"),(0,glob_1.sync)(process.cwd()+"/dist/cmds/**/*.js").forEach(async e=>{e&&require.cache[e]&&delete require.cache[e];let t=require(e);"type"in(t="default"in t?t.default:t)||(t.type="default"),"fields"in t&&(t.parsedFields=t.fields.map(e=>e.req?`<${e.name}>`:`[${e.name}]`).join(" ")),this.cmds[t.type]||(this.cmds[t.type]=new discord_js_1.Collection);try{this.cmds[t.type].set(t.names[0]??"unknown",t),console.log(`* [handler] :: loaded command '${t.names[0]??"unknown"}'`),(0,generateCommandDoc_1.generateCommandDoc)(t)}catch(e){console.log(`* [handler] :: failed to load command '${t.names[0]??"unknown"}' because `+e)}}),this}events(){return console.log("* [handler] :: Running -> Events"),(0,glob_1.sync)(process.cwd()+"/dist/events/**/*.js").forEach(async e=>{try{e&&require.cache[e]&&delete require.cache[e];let t=require(e);"dsc"===(t="default"in t?t.default:t).type?this?.[t.once?"once":"on"](t.name,(...e)=>t.run(this,...e)):this?.[t.type]?.[t.once?"once":"on"](t.name,(...e)=>t.run(this,...e)),console.log(`* [handler] :: loaded event '${t.name??"unknown"}'`)}catch(e){console.log(e)}}),this}start(){return this.db.connect(),this.events().commands().on("debug",e=>{e.includes("Hit a 429")&&console.log('Please run in the shell "kill 1"')}).login(),this}permsError(e,t,s,n=e.author){!e.target&&n&&(e.target=n);n=this.makeEmbeds(e,{title:this.emotes.error+" | [Error] -> Missing Permissions",description:`Member/User: ${n?.toString()||"unknown"}
Permissions:
${s.join(", ").toCodeBlock()}
`});return t.reply?t.reply({embeds:n}):t.send({embeds:n})}sendError(e,t,s,n,o=e.author,r=[],i=" "){e.target=o;o=this.makeEmbeds(e,{title:this.emotes.error+" | [Error] "+(s?" -> "+s:""),description:n?.toCodeBlock()||"```js\nFailed To Display Error```"});return t.reply?t.reply({embeds:o,components:r,content:i}):t.send({embeds:o})}makeEmbeds(n,...e){const o=[];return e.forEach((e,t)=>{if(!(5<t)){const s=new discord_js_1.EmbedBuilder(e);!s.data.thumbnail&&n.target&&s.setThumbnail(n.target?.displayAvatarURL()),s.data.color||s.setColor("Blurple"),o.push(s.toJSON())}}),o}}exports.Lupo=Lupo;