"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,a,r){void 0===r&&(r=a);var n=Object.getOwnPropertyDescriptor(t,a);n&&("get"in n?t.__esModule:!n.writable&&!n.configurable)||(n={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,r,n)}:function(e,t,a,r){e[r=void 0===r?a:r]=t[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)"default"!==a&&Object.prototype.hasOwnProperty.call(e,a)&&__createBinding(t,e,a);return __setModuleDefault(t,e),t};Object.defineProperty(exports,"__esModule",{value:!0});const math=__importStar(require("math-expression-evaluator"));exports.default={names:["calculate","calc","math"],fields:[{name:"operation",type:"any",req:!0}],desc:"a simple calculator",type:"default",run:async t=>{let e;try{e=math.eval(t.args.string())}catch(e){return t.lappy.sendError(t,t.msg,void 0,"Invalid mathematical calculation: "+e?.message)}var a=t.lappy.makeEmbeds(t,{title:t.lappy.emotes.tofu+" | Math",fields:[{name:"📬 | Input",value:t.args.string().toCodeBlock()},{name:"📭 | Output",value:String(e).toCodeBlock("js")}]});return t.msg.reply({embeds:a})}};