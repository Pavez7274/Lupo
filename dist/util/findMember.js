"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.findMember=void 0;const resolveSnowflake_1=require("./resolveSnowflake");async function findMember(e,s,r){await e.members.fetch();let t=new RegExp(s,r??"gi");return s=s.toLowerCase(),(0,resolveSnowflake_1.isSnowflake)(s)?e.members.cache.get(s):e.members.cache.find(e=>{var r=e.displayName+e.user.discriminator;return s===e.user.username.toLowerCase()||s===e.displayName||s===e.user.tag||s===r||t.test(e.displayName)||t.test(r)||t.test(e.user.tag)||s===e.toString()||(0,resolveSnowflake_1.resolveSnowflake)(s)===e.user.id})}exports.findMember=findMember,exports.default=findMember;