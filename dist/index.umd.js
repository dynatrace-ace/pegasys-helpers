!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).pegasysHelpers={})}(this,function(e){var t=/*#__PURE__*/function(){function e(){}return e.prototype.createQuestion=function(e,t){return{id:e,description:t}},e}();function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function r(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}var i="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function s(e,t,n){if(!e.s){if(n instanceof c){if(!n.s)return void(n.o=s.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(s.bind(null,e,t),s.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var u,c=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){var r=new e,o=this.s;if(o){var i=1&o?t:n;if(i){try{s(r,1,i(this.v))}catch(e){s(r,2,e)}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?s(r,1,t?t(o):o):n?s(r,1,n(o)):s(r,2,o)}catch(e){s(r,2,e)}},r},e}();function a(e){return e instanceof c&&1&e.s}function f(e,t,n){var r,o,i=-1;return function u(f){try{for(;++i<e.length&&(!n||!n());)if((f=t(i))&&f.then){if(!a(f))return void f.then(u,o||(o=s.bind(null,r=new c,2)));f=f.v}r?s(r,1,f):r=f}catch(e){s(r||(r=new c),2,e)}}(),r}function l(e,t,n){if("function"==typeof e[i]){var r,o,u,l=function(e){try{for(;!((r=h.next()).done||n&&n());)if((e=t(r.value))&&e.then){if(!a(e))return void e.then(l,u||(u=s.bind(null,o=new c,2)));e=e.v}o?s(o,1,e):o=e}catch(e){s(o||(o=new c),2,e)}},h=e[i]();if(l(),h.return){var m=function(e){try{r.done||h.return()}catch(e){}return e};if(o&&o.then)return o.then(m,function(e){throw m(e)});m()}return o}if(!("length"in e))throw new TypeError("Object is not iterable");for(var v=[],d=0;d<e.length;d++)v.push(e[d]);return f(v,function(e){return t(v[e])},n)}e.LOG_LEVELS=void 0,(u=e.LOG_LEVELS||(e.LOG_LEVELS={}))[u.NONE=0]="NONE",u[u.ERROR=1]="ERROR",u[u.WARN=2]="WARN",u[u.INFO=3]="INFO",u[u.DEBUG=4]="DEBUG",e.DTFunctions=/*#__PURE__*/function(){function t(t){void 0===t&&(t=e.LOG_LEVELS.ERROR),this.currentLogLevel=void 0,this.currentLogLevel=t}var n=t.prototype;return n.setLogLevel=function(e){this.currentLogLevel=e},n.performGradingPlatform=function(e){var t=e.oauth_client_id,n=e.oauth_client_secret,r=e.dt_account_urn,o=e.oauth_sso_endpoint,i=e.dt_platform_environment,s=e.documentType,u=e.documentName,c=e.validationId,a=e.maxScore,f=e.getScore;try{var l=this,h=null;return Promise.resolve(l.getOauthAccessToken(t,n,r,o)).then(function(e){if(!e)throw new Error("Failed to obtain access token");return Promise.resolve(l.getAuthorizationHeaderPlatform(e)).then(function(e){return h=e,Promise.resolve(l.getDocumentsList(i,s,u,h)).then(function(e){return Promise.resolve(l.getDocumentDetails(i,e,h)).then(function(t){return Promise.resolve(l.generateAuditInfo({documentList:e,documentDetails:t})).then(function(e){return Promise.resolve(f(e,h)).then(function(t){var n=t.score;return e.assertionFails=t.assertion_fails,{validationId:c,maxScore:a,finalScore:n,auditInfo:e}})})})})})})}catch(e){return Promise.reject(e)}},n.performGradingGen2=function(e){var t=e.dt_gen2_environment,n=e.dt_access_token,r=e.validationId,o=e.maxScore,i=e.entity_type,s=e.entity_name_to_query,u=e.config_endpoint,c=e.config_name_to_query,a=e.config_endpoint_extra_param,f=e.settings_schema_id,l=e.settings_scope,h=e.getScore;try{var m=this;return Promise.resolve(m.getAuthorizationHeaderGen2(n)).then(function(e){return Promise.resolve(m.getEntities(t,i,s,e)).then(function(n){return Promise.resolve(m.getEntitiesData(t,n,e)).then(function(i){return Promise.resolve(m.getConfigsList(t,u,c,a,n,e)).then(function(s){return Promise.resolve(m.getConfigsData(t,u,s,e)).then(function(u){return Promise.resolve(m.getSettingsData(t,n,e,f,l)).then(function(c){return Promise.resolve(m.getProblemsData(t,n,e)).then(function(t){return Promise.resolve(m.generateAuditInfo({entitiesList:n,entitiesData:i,settingsData:c,configList:s,configDetails:u,problemsData:t})).then(function(t){return Promise.resolve(h(t,e)).then(function(e){var n=e.score;return t.assertionFails=e.assertion_fails,{validationId:r,maxScore:o,finalScore:n,auditInfo:t}})})})})})})})})})}catch(e){return Promise.reject(e)}},n.getOauthAccessToken=function(t,n,r,i){try{var s=this,u=new Headers;u.append("Content-Type","application/x-www-form-urlencoded");var c=new URLSearchParams;c.append("grant_type","client_credentials"),c.append("client_id",t),c.append("client_secret",n),c.append("scope","document:documents:admin document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read "),c.append("resource",r);var a={method:"POST",headers:u,body:c,redirect:"follow"};return Promise.resolve(o(function(){return Promise.resolve(fetch(i,a)).then(function(t){function n(n){return Promise.resolve(t.json()).then(function(t){return s.log(e.LOG_LEVELS.INFO,"result:\n"+JSON.stringify(t,null,2)),t.access_token})}var r=function(){if(!t.ok)return 400===t.status?Promise.resolve(t.text()).then(function(e){throw console.error("oAuth Access Token Error:",t.status,e),new Error("Bad Request: "+e)}):Promise.resolve(t.text()).then(function(e){throw console.error("oAuth Access Token Error:",t.status,e),new Error("HTTP error! status: "+t.status)})}();return r&&r.then?r.then(n):n()})},function(e){console.error("oAuth Access Token Error:",e.message)}))}catch(e){return Promise.reject(e)}},n.getAuthorizationHeaderPlatform=function(e){try{var t=new Headers;return t.append("Authorization","Bearer "+e),Promise.resolve(t)}catch(e){return Promise.reject(e)}},n.getAuthorizationHeaderGen2=function(e){try{var t=new Headers;return t.append("Authorization","Api-Token "+e),Promise.resolve(t)}catch(e){return Promise.reject(e)}},n.getEntities=function(e,t,n,r){try{var i=new Request(e+"/api/v2/entities?entitySelector=type("+t+"),entityName.contains("+n+")",{method:"GET",headers:r}),s=null,u=o(function(){return Promise.resolve(fetch(i)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){s=e}):Promise.resolve(e.text()).then(function(t){console.error("Entity ID Error:",e.status,t)});if(t&&t.then)return t.then(function(){})})},function(e){console.error(e)});return Promise.resolve(u&&u.then?u.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},n.getEntitiesData=function(e,t,n){try{if(null===t)return Promise.resolve([]);var r=[],i=l(t.entities,function(t){var i=new Request(e+"/api/v2/entities/"+t.entityId,{method:"GET",headers:n}),s=o(function(){return Promise.resolve(fetch(i)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){r.push(e)}):Promise.resolve(e.text()).then(function(t){console.error("Entity Details Error:",e.status,t)});if(t&&t.then)return t.then(function(){})})},function(e){console.error(e)});if(s&&s.then)return s.then(function(){})});return Promise.resolve(i&&i.then?i.then(function(){return r}):r)}catch(e){return Promise.reject(e)}},n.getConfigsList=function(e,t,n,r,o,i){try{var s=this,u=[];if(""===t||!o)return Promise.resolve([]);var c="",a=function(){if(r.includes("/")){var a=l(o.entities,function(o){return c="/"+o.entityId+r,Promise.resolve(s.callConfigList(e,t,n,c,i)).then(function(e){u.push(e)})});if(a&&a.then)return a.then(function(){})}else{var f=r.includes("?")?(c=r,Promise.resolve(s.callConfigList(e,t,n,c,i)).then(function(e){u.push(e)})):Promise.resolve(s.callConfigList(e,t,n,c,i)).then(function(e){u.push(e)});if(f&&f.then)return f.then(function(){})}}();return Promise.resolve(a&&a.then?a.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},n.callConfigList=function(e,t,n,r,i){try{var s=new Request(e+t+r,{method:"GET",headers:i}),u=[],c=o(function(){return Promise.resolve(fetch(s)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){u=e}):Promise.resolve(e.text()).then(function(t){console.error("ConfigList Error:",e.status,t)});if(t&&t.then)return t.then(function(){})})},function(e){console.error(e)});return Promise.resolve(c&&c.then?c.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},n.getConfigsData=function(e,t,n,r){try{if(null===n)return Promise.resolve([]);var i=[],s=l(n,function(n){return function(s){var u=[];for(var c in s)u.push(c);return f(u,function(s){return function(s){return function(){if(s&&null!=s&&Array.isArray(n[s]))return l(n[s],function(n){var s=n?n.entityId||n.id:null,u=function(){if(s){var n=new Request(e+t+"/"+s,{method:"GET",headers:r}),u=o(function(){return Promise.resolve(fetch(n)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){i.push(e)}):Promise.resolve(e.text()).then(function(t){console.error("Config Data Error:",e.status,t)});if(t&&t.then)return t.then(function(){})})},function(e){console.error(e)});if(u&&u.then)return u.then(function(){})}}();if(u&&u.then)return u.then(function(){})})}()}(u[s])},void 0)}(n)});return Promise.resolve(s&&s.then?s.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},n.getSettingsData=function(e,t,n,i,s){try{var u=[];if(""===i)return Promise.resolve([]);var c="";if("entity"===s)for(var a,f=r(t.entities);!(a=f()).done;)c=c+a.value.entityId+",";else c=s;if(""==c)return Promise.resolve([]);var l=new Request(e+"/api/v2/settings/objects?schemaIds="+i+"&scopes="+c,{method:"GET",headers:n}),h=o(function(){return Promise.resolve(fetch(l)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){u.push(e)}):Promise.resolve(e.text()).then(function(t){console.error("Settings Data Error:",e.status,t)});if(t&&t.then)return t.then(function(){})})},function(e){console.error(e)});return Promise.resolve(h&&h.then?h.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},n.getProblemsData=function(e,t,n){try{if(!t||!t.entities||t.entities.length<=0)return Promise.resolve(null);for(var i,s="",u=r(t.entities);!(i=u()).done;)s+=","+i.value.entityId;s=s.substring(1);var c=new Request(e+"/api/v2/problems?from=now-6h&problemSelector=rootCauseEntity("+s+")",{method:"GET",headers:n}),a=null,f=o(function(){return Promise.resolve(fetch(c)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){a=e}):Promise.resolve(e.text()).then(function(t){console.error("Problems Data Error:",e.status,t)});if(t&&t.then)return t.then(function(){})})},function(e){console.error(e)});return Promise.resolve(f&&f.then?f.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},n.getDocumentsList=function(t,n,r,i){try{var s=this,u="name contains '"+r+"' and type == '"+n+"'",c=new Request(t+"/platform/document/v1/documents?admin-access=true&filter="+encodeURIComponent(u),{method:"GET",headers:i});s.log(e.LOG_LEVELS.INFO,"documentFilter:\n"+JSON.stringify(u,null,2));var a=null,f=o(function(){return s.log(e.LOG_LEVELS.INFO,"headers:\n"+JSON.stringify(i,null,2)),Promise.resolve(fetch(c)).then(function(t){s.log(e.LOG_LEVELS.INFO,"response:\n"+JSON.stringify(t,null,2));var n=t.ok?Promise.resolve(t.json()).then(function(e){a=e}):Promise.resolve(t.text()).then(function(e){console.error("Document List Error:",t.status,e)});if(n&&n.then)return n.then(function(){})})},function(e){console.error(e)});return Promise.resolve(f&&f.then?f.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},n.getDocumentDetails=function(e,t,n){try{if(null===t)return Promise.resolve([]);var r=[],i={method:"GET",headers:n},s=l(t.documents,function(t){var n=String(t.id),s=o(function(){return Promise.resolve(fetch(e+"/platform/document/v1/documents/"+n+"/content?admin-access=true",i)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){r.push(e)}):Promise.resolve(e.text()).then(function(t){console.error("Document Details Error:",e.status,t)});if(t&&t.then)return t.then(function(){})})},function(e){console.error(e)});if(s&&s.then)return s.then(function(){})});return Promise.resolve(s&&s.then?s.then(function(){return r}):r)}catch(e){return Promise.reject(e)}},n.generateAuditInfo=function(e){var t=e.documentList,n=e.documentDetails,r=e.entitiesList,o=e.entitiesData,i=e.settingsData,s=e.configList,u=e.configDetails,c=e.problemsData;try{var a={};return null!=t&&(a.documentList=t),null!=n&&(a.documentDetails=n),null!=r&&(a.entitiesList=r),null!=o&&(a.entitiesData=o),null!=s&&(a.configList=s),null!=u&&null==u.error&&(a.configDetails=u),null!=i&&(a.settingsData=i),null!=c&&(a.problemsData=c),a.assertionFails=[],Promise.resolve(a)}catch(e){return Promise.reject(e)}},n.checkKeywordsExistence=function(e,t){return t.every(function(t){return e.toLowerCase().includes(t.toLowerCase())})},n.findIdInObject=function(e){for(var t in e)if(e.hasOwnProperty(t))if("object"==typeof e[t]){var n=this.findIdInObject(e[t]);if(n)return n}else if("id"===t||"entityId"===t)return e[t];return null},n.log=function(e,t){e<=this.currentLogLevel&&console.log(t)},t}(),e.QuestionSDK=t});
//# sourceMappingURL=index.umd.js.map
