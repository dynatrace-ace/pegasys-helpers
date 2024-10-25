var e=/*#__PURE__*/function(){function e(){}return e.prototype.createQuestion=function(e,n){return{id:e,description:n}},e}();function n(e,n){try{var t=e()}catch(e){return n(e)}return t&&t.then?t.then(void 0,n):t}var t=/*#__PURE__*/function(){function e(){}var t=e.prototype;return t.performOperations=function(e,n,t,r,o,i,u,s,c,a){try{var f=this,h=null;return Promise.resolve(f.getOauthAccessToken(e,n,t,r)).then(function(e){if(!e)throw new Error("Failed to obtain access token");return Promise.resolve(f.getAuthorizationHeader(e)).then(function(e){return h=e,Promise.resolve(f.getDocumentsList(o,i,u,h)).then(function(e){return Promise.resolve(f.getDocumentDetails(o,e,h)).then(function(n){return Promise.resolve(f.generateAuditInfo(e,n)).then(function(e){return Promise.resolve(a(e)).then(function(n){var t=n.score;return e.assertionFails=n.assertion_fails,{validationId:s,maxScore:c,finalScore:t,auditInfo:e}})})})})})})}catch(e){return Promise.reject(e)}},t.getOauthAccessToken=function(e,t,r,o){try{var i=new Headers;i.append("Content-Type","application/x-www-form-urlencoded");var u=new URLSearchParams;u.append("grant_type","client_credentials"),u.append("client_id",e),u.append("client_secret",t),u.append("scope","document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read "),u.append("resource",r);var s={method:"POST",headers:i,body:u,redirect:"follow"};return Promise.resolve(n(function(){return Promise.resolve(fetch(o,s)).then(function(e){return Promise.resolve(e.json()).then(function(e){return e.access_token})})},function(e){var n=function(){if(e.response)return Promise.resolve(e.response.text()).then(function(n){console.error("oAuth Access Token Error:",e.response.status,n)});console.error("oAuth Access Token Error:",e.message)}();return n&&n.then?n.then(function(){}):void 0}))}catch(e){return Promise.reject(e)}},t.getAuthorizationHeader=function(e){try{var n=new Headers;return n.append("Authorization","Bearer "+e),Promise.resolve(n)}catch(e){return Promise.reject(e)}},t.getEntities=function(e,t,r,o){try{var i=new Request(e+"/api/v2/entities?entitySelector=type("+t+"),entityName.contains("+r+")",{method:"GET",headers:o}),u=null,s=n(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){u=e}):Promise.resolve(e.text()).then(function(n){console.error("Entity ID Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(s&&s.then?s.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},t.getEntitiesData=function(e,t,r){try{if(null===t)return Promise.resolve([]);var o=[],i=s(t.entities,function(t){var i=new Request(e+"/api/v2/entities/"+t.entityId,{method:"GET",headers:r}),u=n(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){o.push(e)}):Promise.resolve(e.text()).then(function(n){console.error("Entity Details Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});if(u&&u.then)return u.then(function(){})});return Promise.resolve(i&&i.then?i.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},t.getDocumentsList=function(e,t,r,o){try{var i=new Request(e+"/platform/document/v1/documents?filter="+encodeURIComponent("name contains '"+r+"' and type == '"+t+"'"),{method:"GET",headers:o}),u=null,s=n(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){u=e}):Promise.resolve(e.text()).then(function(n){console.error("Document List Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(s&&s.then?s.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},t.getDocumentDetails=function(e,t,r){try{if(null===t)return Promise.resolve([]);var o=[],i={method:"GET",headers:r},u=s(t.documents,function(t){var r=String(t.id),u=n(function(){return Promise.resolve(fetch(e+"/platform/document/v1/documents/"+r+"/content",i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){o.push(e)}):Promise.resolve(e.text()).then(function(n){console.error("Document Details Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});if(u&&u.then)return u.then(function(){})});return Promise.resolve(u&&u.then?u.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},t.generateAuditInfo=function(e,n){try{var t={};return null!=e&&(t.documentList=e),null!=n&&(t.documentDetails=n),t.assertionFails=[],Promise.resolve(t)}catch(e){return Promise.reject(e)}},t.checkKeywordsExistence=function(e,n){return n.every(function(n){return e.toLowerCase().includes(n.toLowerCase())})},e}();const r="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function o(e,n,t){if(!e.s){if(t instanceof i){if(!t.s)return void(t.o=o.bind(null,e,n));1&n&&(n=t.s),t=t.v}if(t&&t.then)return void t.then(o.bind(null,e,n),o.bind(null,e,2));e.s=n,e.v=t;var r=e.o;r&&r(e)}}var i=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(n,t){var r=new e,i=this.s;if(i){var u=1&i?n:t;if(u){try{o(r,1,u(this.v))}catch(e){o(r,2,e)}return r}return this}return this.o=function(e){try{var i=e.v;1&e.s?o(r,1,n?n(i):i):t?o(r,1,t(i)):o(r,2,i)}catch(e){o(r,2,e)}},r},e}();function u(e){return e instanceof i&&1&e.s}function s(e,n,t){if("function"==typeof e[r]){var s,c,a,f=function(e){try{for(;!((s=h.next()).done||t&&t());)if((e=n(s.value))&&e.then){if(!u(e))return void e.then(f,a||(a=o.bind(null,c=new i,2)));e=e.v}c?o(c,1,e):c=e}catch(e){o(c||(c=new i),2,e)}},h=e[r]();if(f(),h.return){var l=function(e){try{s.done||h.return()}catch(e){}return e};if(c&&c.then)return c.then(l,function(e){throw l(e)});l()}return c}if(!("length"in e))throw new TypeError("Object is not iterable");for(var v=[],m=0;m<e.length;m++)v.push(e[m]);return function(e,n,t){var r,s,c=-1;return function a(f){try{for(;++c<e.length&&(!t||!t());)if((f=n(c))&&f.then){if(!u(f))return void f.then(a,s||(s=o.bind(null,r=new i,2)));f=f.v}r?o(r,1,f):r=f}catch(e){o(r||(r=new i),2,e)}}(),r}(v,function(e){return n(v[e])},t)}exports.DTFunctions=t,exports.QuestionSDK=e;
//# sourceMappingURL=index.cjs.map
