"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={names:["help"],fields:[{name:"command",type:"string",req:!0}],type:"default",run:d=>{let e=d.lappy.cmds.default.find(e=>e.names.includes(d.args.get(0)));if(!e)return d.lappy.sendError(d,d.msg,"Not Found",`Command ['${d.args.get(0)}'] Not Found`);let s=d.lappy.makeEmbeds(d,{title:("help -> "+e.names[0]).toTitleCase(),fields:[{name:"Name/Alias",value:e.names.join(", ").toTitleCase().toCodeBlock()}]});return e.desc&&s[0].addField("Description","**"+e.desc+"**"),e.parsedFields&&s[0].addField("Usage",(e.names[0]+" "+e.parsedFields).toTitleCase().toCodeBlock()),e.fields&&s[0].addField("Fields",e.fields.map(e=>e.name.concat(e.req?"":"?")+" -> "+e.type).join("\n").toTitleCase().toCodeBlock()),e.dev&&s[0].addField("Important!","This Command Can Only Be Executed By My Developers".toCodeBlock()),d.msg.reply({embeds:s})}};