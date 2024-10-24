!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e||self).pegasysHelpers={})}(this,function(e){var n=/*#__PURE__*/function(){function e(){}return e.prototype.createQuestion=function(e,n){return{id:e,description:n}},e}();function t(e,n){try{var t=e()}catch(e){return n(e)}return t&&t.then?t.then(void 0,n):t}var r=/*#__PURE__*/function(){function e(){}var n=e.prototype;return n.getOauthAccessToken=function(e,n,r,o){try{var i=new Headers;i.append("Content-Type","application/x-www-form-urlencoded");var u=new URLSearchParams;u.append("grant_type","client_credentials"),u.append("client_id",e),u.append("client_secret",n),u.append("scope","document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read "),u.append("resource",r);var c={method:"POST",headers:i,body:u,redirect:"follow"};return Promise.resolve(t(function(){return Promise.resolve(fetch(o,c)).then(function(e){return Promise.resolve(e.json()).then(function(e){return e.access_token})})},function(e){var n=function(){if(e.response)return Promise.resolve(e.response.text()).then(function(n){console.error("oAuth Access Token Error:",e.response.status,n)});console.error("oAuth Access Token Error:",e.message)}();return n&&n.then?n.then(function(){}):void 0}))}catch(e){return Promise.reject(e)}},n.getAuthorizationHeader=function(e){try{var n=new Headers;return n.append("Authorization","Bearer "+e),Promise.resolve(n)}catch(e){return Promise.reject(e)}},n.getEntities=function(e,n,r,o){try{var i=new Request(e+"/api/v2/entities?entitySelector=type("+n+"),entityName.contains("+r+")",{method:"GET",headers:o}),u=null,c=t(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){u=e}):Promise.resolve(e.text()).then(function(n){console.error("Entity ID Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(c&&c.then?c.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},n.getEntitiesData=function(e,n,r){try{if(null===n)return Promise.resolve([]);var o=[],i=s(n.entities,function(n){var i=new Request(e+"/api/v2/entities/"+n.entityId,{method:"GET",headers:r}),u=t(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){o.push(e)}):Promise.resolve(e.text()).then(function(n){console.error("Entity Details Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});if(u&&u.then)return u.then(function(){})});return Promise.resolve(i&&i.then?i.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},n.getDocumentsList=function(e,n,r,o){try{var i=new Request(e+"/platform/document/v1/documents?filter="+encodeURIComponent("name contains '"+r+"' and type == '"+n+"'"),{method:"GET",headers:o}),u=null,c=t(function(){return Promise.resolve(fetch(i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){u=e}):Promise.resolve(e.text()).then(function(n){console.error("Document List Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(c&&c.then?c.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},n.getDocumentDetails=function(e,n,r){try{if(null===n)return Promise.resolve([]);var o=[],i={method:"GET",headers:r},u=s(n.documents,function(n){var r=String(n.id),u=t(function(){return Promise.resolve(fetch(e+"/platform/document/v1/documents/"+r+"/content",i)).then(function(e){var n=e.ok?Promise.resolve(e.json()).then(function(e){o.push(e)}):Promise.resolve(e.text()).then(function(n){console.error("Document Details Error:",e.status,n)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});if(u&&u.then)return u.then(function(){})});return Promise.resolve(u&&u.then?u.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},n.checkKeywordsExistence=function(e,n){return n.every(function(n){return e.toLowerCase().includes(n.toLowerCase())})},e}();const o="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function i(e,n,t){if(!e.s){if(t instanceof u){if(!t.s)return void(t.o=i.bind(null,e,n));1&n&&(n=t.s),t=t.v}if(t&&t.then)return void t.then(i.bind(null,e,n),i.bind(null,e,2));e.s=n,e.v=t;var r=e.o;r&&r(e)}}var u=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(n,t){var r=new e,o=this.s;if(o){var u=1&o?n:t;if(u){try{i(r,1,u(this.v))}catch(e){i(r,2,e)}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?i(r,1,n?n(o):o):t?i(r,1,t(o)):i(r,2,o)}catch(e){i(r,2,e)}},r},e}();function c(e){return e instanceof u&&1&e.s}function s(e,n,t){if("function"==typeof e[o]){var r,s,f,a=function(e){try{for(;!((r=h.next()).done||t&&t());)if((e=n(r.value))&&e.then){if(!c(e))return void e.then(a,f||(f=i.bind(null,s=new u,2)));e=e.v}s?i(s,1,e):s=e}catch(e){i(s||(s=new u),2,e)}},h=e[o]();if(a(),h.return){var l=function(e){try{r.done||h.return()}catch(e){}return e};if(s&&s.then)return s.then(l,function(e){throw l(e)});l()}return s}if(!("length"in e))throw new TypeError("Object is not iterable");for(var d=[],v=0;v<e.length;v++)d.push(e[v]);return function(e,n,t){var r,o,s=-1;return function f(a){try{for(;++s<e.length&&(!t||!t());)if((a=n(s))&&a.then){if(!c(a))return void a.then(f,o||(o=i.bind(null,r=new u,2)));a=a.v}r?i(r,1,a):r=a}catch(e){i(r||(r=new u),2,e)}}(),r}(d,function(e){return n(d[e])},t)}e.DTFunctions=r,e.QuestionSDK=n});
//# sourceMappingURL=index.umd.js.map
