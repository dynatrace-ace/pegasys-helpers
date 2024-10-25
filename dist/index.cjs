var e=/*#__PURE__*/function(){function e(){}return e.prototype.createQuestion=function(e,n){return{id:e,description:n}},e}();function n(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}function t(e,n){try{var t=e()}catch(e){return n(e)}return t&&t.then?t.then(void 0,n):t}var r=/*#__PURE__*/function(){function e(){}var r=e.prototype;return r.performGradingPlatform=function(e,n,t,r,o,i,u,s,c,a){try{var f=this,h=null;return Promise.resolve(f.getOauthAccessToken(e,n,t,r)).then(function(e){if(!e)throw new Error("Failed to obtain access token");return Promise.resolve(f.getAuthorizationHeaderPlatform(e)).then(function(e){return h=e,Promise.resolve(f.getDocumentsList(o,i,u,h)).then(function(e){return Promise.resolve(f.getDocumentDetails(o,e,h)).then(function(n){return Promise.resolve(f.generateAuditInfo(e,n)).then(function(e){return Promise.resolve(a(e)).then(function(n){var t=n.score;return e.assertionFails=n.assertion_fails,{validationId:s,maxScore:c,finalScore:t,auditInfo:e}})})})})})})}catch(e){return Promise.reject(e)}},r.performGradingGen2=function(e,n,t,r,o,i,u,s,c,a){try{var f=this,h=null;return Promise.resolve(f.getOauthAccessToken(e,n,t,r)).then(function(e){if(!e)throw new Error("Failed to obtain access token");return Promise.resolve(f.getAuthorizationHeaderGen2(e)).then(function(e){return h=e,Promise.resolve(f.getDocumentsList(o,i,u,h)).then(function(e){return Promise.resolve(f.getDocumentDetails(o,e,h)).then(function(n){return Promise.resolve(f.generateAuditInfo(e,n)).then(function(e){return Promise.resolve(a(e)).then(function(n){var t=n.score;return e.assertionFails=n.assertion_fails,{validationId:s,maxScore:c,finalScore:t,auditInfo:e}})})})})})})}catch(e){return Promise.reject(e)}},r.getOauthAccessToken=function(e,n,r,o){try{var i=new Headers;i.append("Content-Type","application/x-www-form-urlencoded");var u=new URLSearchParams;u.append("grant_type","client_credentials"),u.append("client_id",e),u.append("client_secret",n),u.append("scope","document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read "),u.append("resource",r);var s={method:"POST",headers:i,body:u,redirect:"follow"};return Promise.resolve(t(function(){return Promise.resolve(fetch(o,s)).then(function(e){return Promise.resolve(e.json()).then(function(e){return e.access_token})})},function(e){var n=function(){if(e.response)return Promise.resolve(e.response.text()).then(function(n){console.error("oAuth Access Token Error:",e.response.status,n)});console.error("oAuth Access Token Error:",e.message)}();return n&&n.then?n.then(function(){}):void 0}))}catch(e){return Promise.reject(e)}},r.getAuthorizationHeaderPlatform=function(e){try{var n=new Headers;return n.append("Authorization","Bearer "+e),Promise.resolve(n)}catch(e){return Promise.reject(e)}},r.getAuthorizationHeaderGen2=function(e){try{var n=new Headers;return n.append("Authorization","Api-Token "+e),Promise.resolve(n)}catch(e){return Promise.reject(e)}},r.getEntities=function(e,n,r,o){try{var i=new Request(e+"/api/v2/entities?entitySelector=type("+n+"),entityName.contains("+r+")",{method:"GET",headers:o}),u=null,s=t(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){u=e}):Promise.resolve(e.text()).then(function(n){console.error("Entity ID Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(s&&s.then?s.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},r.getEntitiesData=function(e,n,r){try{if(null===n)return Promise.resolve([]);var o=[],i=a(n.entities,function(n){var i=new Request(e+"/api/v2/entities/"+n.entityId,{method:"GET",headers:r}),u=t(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){o.push(e)}):Promise.resolve(e.text()).then(function(n){console.error("Entity Details Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});if(u&&u.then)return u.then(function(){})});return Promise.resolve(i&&i.then?i.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},r.getConfigsList=function(e,n,t,r,o,i){try{var u=this,s=[];if(""===n||!o)return Promise.resolve([]);var c="",f=function(){if(r.includes("/")){var f=a(o.entities,function(o){return c="/"+o.entityId+r,Promise.resolve(u.callConfigList(e,n,t,c,i)).then(function(e){s.push(e)})});if(f&&f.then)return f.then(function(){})}else{var h=r.includes("?")?(c=r,Promise.resolve(u.callConfigList(e,n,t,c,i)).then(function(e){s.push(e)})):Promise.resolve(u.callConfigList(e,n,t,c,i)).then(function(e){s.push(e)});if(h&&h.then)return h.then(function(){})}}();return Promise.resolve(f&&f.then?f.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},r.callConfigList=function(e,n,r,o,i){try{var u=new Request(e+n+o,{method:"GET",headers:i}),s=[],c=t(function(){return Promise.resolve(fetch(u)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){s=e}):Promise.resolve(e.text()).then(function(n){console.error("ConfigList Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(c&&c.then?c.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},r.getConfigsData=function(e,n,r,o){try{if(null===r)return Promise.resolve([]);var i=[],u=a(r,function(r){return function(u){var s=[];for(var f in u)s.push(f);return c(s,function(u){return function(u){return function(){if(u&&null!=u&&Array.isArray(r[u]))return a(r[u],function(r){var u=r?r.entityId||r.id:null,s=function(){if(u){var r=new Request(e+n+"/"+u,{method:"GET",headers:o}),s=t(function(){return Promise.resolve(fetch(r)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){i.push(e)}):Promise.resolve(e.text()).then(function(n){console.error("Config Data Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});if(s&&s.then)return s.then(function(){})}}();if(s&&s.then)return s.then(function(){})})}()}(s[u])},void 0)}(r)});return Promise.resolve(u&&u.then?u.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},r.getSettingsData=function(e,r,o,i,u){try{var s=[];if(""===i)return Promise.resolve([]);var c="";if("entity"===u)for(var a,f=function(e){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(t)return(t=t.call(e)).next.bind(t);if(Array.isArray(e)||(t=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))){t&&(e=t);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(r.entities);!(a=f()).done;)c=c+a.value.entityId+",";else c=u;if(""==c)return Promise.resolve([]);var h=new Request(e+"/api/v2/settings/objects?schemaIds="+i+"&scopes="+c,{method:"GET",headers:o}),l=t(function(){return Promise.resolve(fetch(h)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){s.push(e)}):Promise.resolve(e.text()).then(function(n){console.error("Settings Data Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(l&&l.then?l.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},r.getDocumentsList=function(e,n,r,o){try{var i=new Request(e+"/platform/document/v1/documents?filter="+encodeURIComponent("name contains '"+r+"' and type == '"+n+"'"),{method:"GET",headers:o}),u=null,s=t(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){u=e}):Promise.resolve(e.text()).then(function(n){console.error("Document List Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(s&&s.then?s.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},r.getDocumentDetails=function(e,n,r){try{if(null===n)return Promise.resolve([]);var o=[],i={method:"GET",headers:r},u=a(n.documents,function(n){var r=String(n.id),u=t(function(){return Promise.resolve(fetch(e+"/platform/document/v1/documents/"+r+"/content",i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){o.push(e)}):Promise.resolve(e.text()).then(function(n){console.error("Document Details Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});if(u&&u.then)return u.then(function(){})});return Promise.resolve(u&&u.then?u.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},r.generateAuditInfo=function(e,n){try{var t={};return null!=e&&(t.documentList=e),null!=n&&(t.documentDetails=n),t.assertionFails=[],Promise.resolve(t)}catch(e){return Promise.reject(e)}},r.checkKeywordsExistence=function(e,n){return n.every(function(n){return e.toLowerCase().includes(n.toLowerCase())})},r.findIdInObject=function(e){for(var n in e)if(e.hasOwnProperty(n))if("object"==typeof e[n]){var t=this.findIdInObject(e[n]);if(t)return t}else if("id"===n||"entityId"===n)return e[n];return null},e}();const o="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function i(e,n,t){if(!e.s){if(t instanceof u){if(!t.s)return void(t.o=i.bind(null,e,n));1&n&&(n=t.s),t=t.v}if(t&&t.then)return void t.then(i.bind(null,e,n),i.bind(null,e,2));e.s=n,e.v=t;var r=e.o;r&&r(e)}}var u=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(n,t){var r=new e,o=this.s;if(o){var u=1&o?n:t;if(u){try{i(r,1,u(this.v))}catch(e){i(r,2,e)}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?i(r,1,n?n(o):o):t?i(r,1,t(o)):i(r,2,o)}catch(e){i(r,2,e)}},r},e}();function s(e){return e instanceof u&&1&e.s}function c(e,n,t){var r,o,c=-1;return function a(f){try{for(;++c<e.length&&(!t||!t());)if((f=n(c))&&f.then){if(!s(f))return void f.then(a,o||(o=i.bind(null,r=new u,2)));f=f.v}r?i(r,1,f):r=f}catch(e){i(r||(r=new u),2,e)}}(),r}function a(e,n,t){if("function"==typeof e[o]){var r,a,f,h=function(e){try{for(;!((r=l.next()).done||t&&t());)if((e=n(r.value))&&e.then){if(!s(e))return void e.then(h,f||(f=i.bind(null,a=new u,2)));e=e.v}a?i(a,1,e):a=e}catch(e){i(a||(a=new u),2,e)}},l=e[o]();if(h(),l.return){var v=function(e){try{r.done||l.return()}catch(e){}return e};if(a&&a.then)return a.then(v,function(e){throw v(e)});v()}return a}if(!("length"in e))throw new TypeError("Object is not iterable");for(var m=[],d=0;d<e.length;d++)m.push(e[d]);return c(m,function(e){return n(m[e])},t)}exports.DTFunctions=r,exports.QuestionSDK=e;
//# sourceMappingURL=index.cjs.map
