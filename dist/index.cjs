var t=/*#__PURE__*/function(){function t(){}return t.prototype.createQuestion=function(t,n){return{id:t,description:n}},t}();function n(t,n){try{var e=t()}catch(t){return n(t)}return e&&e.then?e.then(void 0,n):e}var e=/*#__PURE__*/function(){function t(){}var e=t.prototype;return e.getAuthorizationHeader=function(t){try{var n=new Headers;return n.append("Authorization","Bearer "+t),Promise.resolve(n)}catch(t){return Promise.reject(t)}},e.getEntities=function(t,e,r,o){try{var i=new Request(t+"/api/v2/entities?entitySelector=type("+e+"),entityName.contains("+r+")",{method:"GET",headers:o}),u=null,c=n(function(){return Promise.resolve(fetch(i)).then(function(t){var n=t.ok?Promise.resolve(t.json()).then(function(t){u=t}):Promise.resolve(t.text()).then(function(n){console.error("Entity ID Error:",t.status,n)});if(n&&n.then)return n.then(function(){})})},function(t){console.error(t)});return Promise.resolve(c&&c.then?c.then(function(){return u}):u)}catch(t){return Promise.reject(t)}},e.getEntitiesData=function(t,e,c){try{if(null===e)return Promise.resolve([]);var s=[],f=function(t,n){if("function"==typeof t[r]){var e,c,s,f=function(t){try{for(;!(e=h.next()).done;)if((t=n(e.value))&&t.then){if(!u(t))return void t.then(f,s||(s=o.bind(null,c=new i,2)));t=t.v}c?o(c,1,t):c=t}catch(t){o(c||(c=new i),2,t)}},h=t[r]();if(f(),h.return){var a=function(t){try{e.done||h.return()}catch(t){}return t};if(c&&c.then)return c.then(a,function(t){throw a(t)});a()}return c}if(!("length"in t))throw new TypeError("Object is not iterable");for(var v=[],l=0;l<t.length;l++)v.push(t[l]);return function(t,n){var e,r,c=-1;return function s(f){try{for(;++c<t.length;)if((f=n(c))&&f.then){if(!u(f))return void f.then(s,r||(r=o.bind(null,e=new i,2)));f=f.v}e?o(e,1,f):e=f}catch(t){o(e||(e=new i),2,t)}}(),e}(v,function(t){return n(v[t])})}(e.entities,function(e){var r=new Request(t+"/api/v2/entities/"+e.entityId,{method:"GET",headers:c}),o=n(function(){return Promise.resolve(fetch(r)).then(function(t){var n=t.ok?Promise.resolve(t.json()).then(function(t){s.push(t)}):Promise.resolve(t.text()).then(function(n){console.error("Entity Details Error:",t.status,n)});if(n&&n.then)return n.then(function(){})})},function(t){console.error(t)});if(o&&o.then)return o.then(function(){})});return Promise.resolve(f&&f.then?f.then(function(){return s}):s)}catch(t){return Promise.reject(t)}},t}();const r="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function o(t,n,e){if(!t.s){if(e instanceof i){if(!e.s)return void(e.o=o.bind(null,t,n));1&n&&(n=e.s),e=e.v}if(e&&e.then)return void e.then(o.bind(null,t,n),o.bind(null,t,2));t.s=n,t.v=e;var r=t.o;r&&r(t)}}var i=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,e){var r=new t,i=this.s;if(i){var u=1&i?n:e;if(u){try{o(r,1,u(this.v))}catch(t){o(r,2,t)}return r}return this}return this.o=function(t){try{var i=t.v;1&t.s?o(r,1,n?n(i):i):e?o(r,1,e(i)):o(r,2,i)}catch(t){o(r,2,t)}},r},t}();function u(t){return t instanceof i&&1&t.s}exports.DTFunctions=e,exports.QuestionSDK=t;
//# sourceMappingURL=index.cjs.map
