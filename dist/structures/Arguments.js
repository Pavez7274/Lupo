"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Arguments=void 0;const isBoolean_1=require("../util/isBoolean");class Arguments extends String{all_args;args;ends;msg;prefix;constructor(s,e){super(s.content),this.prefix=e,this.msg=s,this.all_args=this.slice(e.length).trim().split(/ +/g),this.args=this.all_args.filter(s=>!s.startsWith("--")),this.ends=this.all_args.filter(s=>s.startsWith("--"))}get(s){return this.args?.["last"===s?this.length-1:s]||void 0}get len(){return this.args.length}string(s=0,e=" "){return(s?this.all_args:this.args).join(e)}shift(){var s=this.args.shift(),e=this.all_args.indexOf(s);return-1!==e&&this.all_args.splice(e,1),s}pop(){var s=this.args.pop(),e=this.all_args.indexOf(s);return-1!==e&&this.all_args.splice(e,1),s}endIsTrue(e){return this.ends.some(s=>new RegExp(e+"(=(true|yes|1)|)","gi").test(s))}endIsFalse(e){return this.ends.some(s=>new RegExp(e+"=(false|no|0)","gi").test(s))}getEndValue(e){let s=this.ends.find(s=>new RegExp(e,"gi").test(s));var t;if(s)return t=s.split(/=/g).slice(1).join("="),(0,isBoolean_1.isBoolean)(t)?(0,isBoolean_1.parse)(t):isNaN(Number(t))?t:Number(t)}}exports.Arguments=Arguments;