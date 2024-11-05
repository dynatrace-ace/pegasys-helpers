var e=/*#__PURE__*/function(){function e(){}return e.prototype.createQuestion=function(e,t){return{id:e,description:t}},e}();function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function n(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}var o="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function i(e,t,n){if(!e.s){if(n instanceof u){if(!n.s)return void(n.o=i.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(i.bind(null,e,t),i.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var s,u=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){var r=new e,o=this.s;if(o){var s=1&o?t:n;if(s){try{i(r,1,s(this.v))}catch(e){i(r,2,e)}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?i(r,1,t?t(o):o):n?i(r,1,n(o)):i(r,2,o)}catch(e){i(r,2,e)}},r},e}();function a(e){return e instanceof u&&1&e.s}function c(e,t,n){var r,o,s=-1;return function c(f){try{for(;++s<e.length&&(!n||!n());)if((f=t(s))&&f.then){if(!a(f))return void f.then(c,o||(o=i.bind(null,r=new u,2)));f=f.v}r?i(r,1,f):r=f}catch(e){i(r||(r=new u),2,e)}}(),r}function f(e,t,n){if("function"==typeof e[o]){var r,s,f,l=function(e){try{for(;!((r=h.next()).done||n&&n());)if((e=t(r.value))&&e.then){if(!a(e))return void e.then(l,f||(f=i.bind(null,s=new u,2)));e=e.v}s?i(s,1,e):s=e}catch(e){i(s||(s=new u),2,e)}},h=e[o]();if(l(),h.return){var v=function(e){try{r.done||h.return()}catch(e){}return e};if(s&&s.then)return s.then(v,function(e){throw v(e)});v()}return s}if(!("length"in e))throw new TypeError("Object is not iterable");for(var m=[],d=0;d<e.length;d++)m.push(e[d]);return c(m,function(e){return t(m[e])},n)}exports.LOG_LEVELS=void 0,(s=exports.LOG_LEVELS||(exports.LOG_LEVELS={}))[s.NONE=0]="NONE",s[s.ERROR=1]="ERROR",s[s.WARN=2]="WARN",s[s.INFO=3]="INFO",s[s.DEBUG=4]="DEBUG",exports.DTFunctions=/*#__PURE__*/function(){function e(e){void 0===e&&(e=exports.LOG_LEVELS.ERROR),this.currentLogLevel=void 0,this.currentLogLevel=e}var t=e.prototype;return t.setLogLevel=function(e){this.currentLogLevel=e},t.performGradingPlatform=function(e){var t=e.oauth_client_id,n=e.oauth_client_secret,r=e.dt_account_urn,o=e.oauth_sso_endpoint,i=e.dt_platform_environment,s=e.documentType,u=e.documentName,a=e.validationId,c=e.maxScore,f=e.getScore;try{var l=this,h=null;return Promise.resolve(l.getOauthAccessToken(t,n,r,o)).then(function(e){if(!e)throw new Error("Failed to obtain access token");return Promise.resolve(l.getAuthorizationHeaderPlatform(e)).then(function(e){return h=e,Promise.resolve(l.getDocumentsList(i,s,u,h)).then(function(e){return Promise.resolve(l.getDocumentDetails(i,e,h)).then(function(t){return Promise.resolve(l.generateAuditInfo({documentList:e,documentDetails:t})).then(function(e){return Promise.resolve(f(e,h)).then(function(t){var n=t.score;return e.assertionFails=t.assertion_fails,{validationId:a,maxScore:c,finalScore:n,auditInfo:e}})})})})})})}catch(e){return Promise.reject(e)}},t.performGradingGen2=function(e){var t=e.dt_gen2_environment,n=e.dt_access_token,r=e.validationId,o=e.maxScore,i=e.entity_type,s=e.entity_name_to_query,u=e.config_endpoint,a=e.config_name_to_query,c=e.config_endpoint_extra_param,f=e.settings_schema_id,l=e.settings_scope,h=e.getScore;try{var v=this;return Promise.resolve(v.getAuthorizationHeaderGen2(n)).then(function(e){return Promise.resolve(v.getEntities(t,i,s,e)).then(function(n){return Promise.resolve(v.getEntitiesData(t,n,e)).then(function(i){return Promise.resolve(v.getConfigsList(t,u,a,c,n,e)).then(function(s){return Promise.resolve(v.getConfigsData(t,u,s,e)).then(function(u){return Promise.resolve(v.getSettingsData(t,n,e,f,l)).then(function(a){return Promise.resolve(v.getProblemsData(t,n,e)).then(function(c){return Promise.resolve(v.getUserDashboardList(t,e)).then(function(f){return Promise.resolve(v.getDashboardsData(t,f,e)).then(function(t){return Promise.resolve(v.generateAuditInfo({entitiesList:n,entitiesData:i,settingsData:a,configList:s,configDetails:u,problemsData:c,userDashboardList:f,userDashboardDetails:t})).then(function(t){return Promise.resolve(h(t,e)).then(function(e){var n=e.score;return t.assertionFails=e.assertion_fails,{validationId:r,maxScore:o,finalScore:n,auditInfo:t}})})})})})})})})})})})}catch(e){return Promise.reject(e)}},t.getOauthAccessToken=function(e,t,n,o){try{var i=this,s=new Headers;s.append("Content-Type","application/x-www-form-urlencoded");var u=new URLSearchParams;u.append("grant_type","client_credentials"),u.append("client_id",e),u.append("client_secret",t),u.append("scope","document:documents:admin document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read "),u.append("resource",n);var a={method:"POST",headers:s,body:u,redirect:"follow"};return Promise.resolve(r(function(){return Promise.resolve(fetch(o,a)).then(function(e){function t(t){return Promise.resolve(e.json()).then(function(e){return i.log(exports.LOG_LEVELS.DEBUG,"oAuth Access Token result:\n"+JSON.stringify(e,null,2)),e.access_token})}var n=function(){if(!e.ok)return 400===e.status?Promise.resolve(e.text()).then(function(t){throw i.log(exports.LOG_LEVELS.ERROR,"oAuth Access Token Error: "+e.status+" "+t),new Error("Bad Request: "+t)}):Promise.resolve(e.text()).then(function(t){throw i.log(exports.LOG_LEVELS.ERROR,"oAuth Access Token Error: "+e.status+" "+t),new Error("HTTP error! status: "+e.status)})}();return n&&n.then?n.then(t):t()})},function(e){i.log(exports.LOG_LEVELS.ERROR,"oAuth Access Token Error: "+e.message)}))}catch(e){return Promise.reject(e)}},t.getAuthorizationHeaderPlatform=function(e){try{var t=new Headers;return t.append("Authorization","Bearer "+e),Promise.resolve(t)}catch(e){return Promise.reject(e)}},t.getAuthorizationHeaderGen2=function(e){try{var t=new Headers;return t.append("Authorization","Api-Token "+e),Promise.resolve(t)}catch(e){return Promise.reject(e)}},t.getEntities=function(e,t,n,o){try{var i=this,s=new Request(e+"/api/v2/entities?entitySelector=type("+t+"),entityName.contains("+n+")",{method:"GET",headers:o}),u=null,a=r(function(){return Promise.resolve(fetch(s)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){u=e}):Promise.resolve(e.text()).then(function(t){i.log(exports.LOG_LEVELS.ERROR,'"Entity ID Error: '+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){i.log(exports.LOG_LEVELS.ERROR," "+e)});return Promise.resolve(a&&a.then?a.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},t.getEntitiesData=function(e,t,n){try{var o=this;if(null===t)return Promise.resolve([]);var i=[],s=f(t.entities,function(t){var s=new Request(e+"/api/v2/entities/"+t.entityId,{method:"GET",headers:n}),u=r(function(){return Promise.resolve(fetch(s)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){i.push(e)}):Promise.resolve(e.text()).then(function(t){o.log(exports.LOG_LEVELS.ERROR,"Entity Details Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){o.log(exports.LOG_LEVELS.ERROR," "+e)});if(u&&u.then)return u.then(function(){})});return Promise.resolve(s&&s.then?s.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},t.getUserDashboardList=function(e,t){try{var n=this,o=[],i=[],s=r(function(){return Promise.resolve(n.getConfigsList(e,"/api/config/v1/dashboards","","",null,t)).then(function(e){o=e,n.log(exports.LOG_LEVELS.DEBUG,"dashboard_list raw:\n"+JSON.stringify(o[0].dashboards,null,2));var t=o[0].dashboards.filter(function(e){return"Dynatrace"!==e.owner});t.length>0&&i.push({dashboards:t}),n.log(exports.LOG_LEVELS.DEBUG,"user_dashboard_list:\n"+JSON.stringify(i[0].dashboards,null,2))})},function(e){n.log(exports.LOG_LEVELS.ERROR,"getUserDashboardList Error: "+e)});return Promise.resolve(s&&s.then?s.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},t.getDashboardsData=function(e,t,n){try{var o=this;if(null===t)return Promise.resolve([]);var i=[],s=r(function(){return Promise.resolve(o.getConfigsData(e,"/api/config/v1/dashboards",t,n)).then(function(e){i=e,o.log(exports.LOG_LEVELS.DEBUG,"dashboardsData:\n"+JSON.stringify(i,null,2))})},function(e){o.log(exports.LOG_LEVELS.ERROR,"getDashboardsData Error: "+e)});return Promise.resolve(s&&s.then?s.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},t.getConfigsList=function(e,t,n,r,o,i){try{var s=this,u=[];if(""===t)return Promise.resolve([]);var a="",c=function(){if(r.includes("/")&&!o){var c=function(){s.log(exports.LOG_LEVELS.DEBUG,"Config List with extra param /")},l=f(o.entities,function(o){return a="/"+o.entityId+r,Promise.resolve(s.callConfigList(e,t,n,a,i)).then(function(e){u.push(e)})});return l&&l.then?l.then(c):c()}var h=r.includes("?")?(a=r,Promise.resolve(s.callConfigList(e,t,n,a,i)).then(function(e){u.push(e),s.log(exports.LOG_LEVELS.DEBUG,"Config List with extra param ?")})):Promise.resolve(s.callConfigList(e,t,n,a,i)).then(function(e){u.push(e)});if(h&&h.then)return h.then(function(){})}();return Promise.resolve(c&&c.then?c.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},t.callConfigList=function(e,t,n,o,i){try{var s=this,u=new Request(e+t+o,{method:"GET",headers:i}),a=[],c=r(function(){return Promise.resolve(fetch(u)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){a=e}):Promise.resolve(e.text()).then(function(t){s.log(exports.LOG_LEVELS.ERROR,"ConfigList Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){s.log(exports.LOG_LEVELS.ERROR,""+e)});return Promise.resolve(c&&c.then?c.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},t.getConfigsData=function(e,t,n,o){try{var i=this;if(null===n)return Promise.resolve([]);var s=[],u=f(n,function(n){return function(u){var a=[];for(var l in u)a.push(l);return c(a,function(u){return function(u){return function(){if(u&&null!=u&&Array.isArray(n[u]))return f(n[u],function(n){var u=n?n.entityId||n.id:null,a=function(){if(u){var n=new Request(e+t+"/"+u,{method:"GET",headers:o}),a=r(function(){return Promise.resolve(fetch(n)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){s.push(e)}):Promise.resolve(e.text()).then(function(t){i.log(exports.LOG_LEVELS.ERROR,"Config Data Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){i.log(exports.LOG_LEVELS.ERROR,""+e)});if(a&&a.then)return a.then(function(){})}}();if(a&&a.then)return a.then(function(){})})}()}(a[u])},void 0)}(n)});return Promise.resolve(u&&u.then?u.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},t.getSettingsData=function(e,t,o,i,s){try{var u=this,a=[];if(""===i)return Promise.resolve([]);var c="";if("entity"===s)for(var f,l=n(t.entities);!(f=l()).done;)c=c+f.value.entityId+",";else c=s;if(""==c)return Promise.resolve([]);var h=new Request(e+"/api/v2/settings/objects?schemaIds="+i+"&scopes="+c,{method:"GET",headers:o}),v=r(function(){return Promise.resolve(fetch(h)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){a.push(e)}):Promise.resolve(e.text()).then(function(t){u.log(exports.LOG_LEVELS.ERROR,"Settings Data Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){u.log(exports.LOG_LEVELS.ERROR,""+e)});return Promise.resolve(v&&v.then?v.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},t.getProblemsData=function(e,t,o){try{var i=this;if(!t||!t.entities||t.entities.length<=0)return Promise.resolve(null);for(var s,u="",a=n(t.entities);!(s=a()).done;)u+=","+s.value.entityId;u=u.substring(1);var c=new Request(e+"/api/v2/problems?from=now-6h&problemSelector=rootCauseEntity("+u+")",{method:"GET",headers:o}),f=null,l=r(function(){return Promise.resolve(fetch(c)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){f=e}):Promise.resolve(e.text()).then(function(t){i.log(exports.LOG_LEVELS.ERROR,"Problems Data Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){i.log(exports.LOG_LEVELS.ERROR,""+e)});return Promise.resolve(l&&l.then?l.then(function(){return f}):f)}catch(e){return Promise.reject(e)}},t.getDocumentsList=function(e,t,n,o){try{var i=this,s="name contains '"+n+"' and type == '"+t+"'",u=new Request(e+"/platform/document/v1/documents?admin-access=true&filter="+encodeURIComponent(s),{method:"GET",headers:o});i.log(exports.LOG_LEVELS.DEBUG,"documentFilter:\n"+JSON.stringify(s,null,2));var a=null,c=r(function(){return i.log(exports.LOG_LEVELS.DEBUG,"headers:\n"+JSON.stringify(o,null,2)),Promise.resolve(fetch(u)).then(function(e){i.log(exports.LOG_LEVELS.DEBUG,"response:\n"+JSON.stringify(e,null,2));var t=e.ok?Promise.resolve(e.json()).then(function(e){a=e}):Promise.resolve(e.text()).then(function(t){i.log(exports.LOG_LEVELS.ERROR,"Document List Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){i.log(exports.LOG_LEVELS.ERROR,""+e)});return Promise.resolve(c&&c.then?c.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},t.getDocumentDetails=function(e,t,n){try{var o=this;if(null===t)return Promise.resolve([]);var i=[],s={method:"GET",headers:n},u=f(t.documents,function(t){var n=String(t.id),u=r(function(){return Promise.resolve(fetch(e+"/platform/document/v1/documents/"+n+"/content?admin-access=true",s)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){i.push(e)}):Promise.resolve(e.text()).then(function(t){o.log(exports.LOG_LEVELS.ERROR,"Document Details Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){o.log(exports.LOG_LEVELS.ERROR,""+e)});if(u&&u.then)return u.then(function(){})});return Promise.resolve(u&&u.then?u.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},t.generateAuditInfo=function(e){var t=e.documentList,n=e.documentDetails,r=e.entitiesList,o=e.entitiesData,i=e.settingsData,s=e.configList,u=e.configDetails,a=e.problemsData,c=e.userDashboardList,f=e.userDashboardDetails;try{var l={};return null!=t&&(l.documentList=t),null!=n&&(l.documentDetails=n),null!=r&&(l.entitiesList=r),null!=o&&(l.entitiesData=o),null!=s&&(l.configList=s),null!=u&&null==u.error&&(l.configDetails=u),null!=i&&(l.settingsData=i),null!=a&&(l.problemsData=a),null!=c&&(l.userDashboardList=c),null!=f&&(l.userDashboardDetails=f),l.assertionFails=[],Promise.resolve(l)}catch(e){return Promise.reject(e)}},t.checkKeywordsExistence=function(e,t){return t.every(function(t){return e.toLowerCase().includes(t.toLowerCase())})},t.findIdInObject=function(e){for(var t in e)if(e.hasOwnProperty(t))if("object"==typeof e[t]){var n=this.findIdInObject(e[t]);if(n)return n}else if("id"===t||"entityId"===t)return e[t];return null},t.log=function(e,t){e<=this.currentLogLevel&&console.log(t)},e}(),exports.QuestionSDK=e;
//# sourceMappingURL=index.cjs.map
