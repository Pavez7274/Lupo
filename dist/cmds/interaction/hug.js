"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={names:["hug"],fields:[{name:"target",type:"memberResolvable",req:!0}],type:"default",run:async e=>{let a=await e.lappy.util.findMember(e.gd,e.args.string()),i;if(!a)return e.lappy.sendError(e,e.msg,"not found",`No Matches Were Found With ['${e.args.string().slice(0,10)}']`);i=a.id===e.lappy?.user?.id?e.memb.displayName+" are hugging me?!":a.id===e.author.id?e.memb.displayName+" is hugging him/herself":e.memb.displayName+" is hugging "+a.displayName;var r=e.lappy.makeEmbeds(e,{image:await e.lappy.neko.img("hug"),title:i});return e.msg.reply({embeds:r})}};