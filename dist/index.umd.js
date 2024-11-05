!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).pegasysHelpers={})}(this,function(e){var t=/*#__PURE__*/function(){function e(){}return e.prototype.createQuestion=function(e,t){return{id:e,description:t}},e}();function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function r(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}var i="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function s(e,t,n){if(!e.s){if(n instanceof a){if(!n.s)return void(n.o=s.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(s.bind(null,e,t),s.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var u,a=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){var r=new e,o=this.s;if(o){var i=1&o?t:n;if(i){try{s(r,1,i(this.v))}catch(e){s(r,2,e)}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?s(r,1,t?t(o):o):n?s(r,1,n(o)):s(r,2,o)}catch(e){s(r,2,e)}},r},e}();function c(e){return e instanceof a&&1&e.s}function f(e,t,n){var r,o,i=-1;return function u(f){try{for(;++i<e.length&&(!n||!n());)if((f=t(i))&&f.then){if(!c(f))return void f.then(u,o||(o=s.bind(null,r=new a,2)));f=f.v}r?s(r,1,f):r=f}catch(e){s(r||(r=new a),2,e)}}(),r}function l(e,t,n){if("function"==typeof e[i]){var r,o,u,l=function(e){try{for(;!((r=h.next()).done||n&&n());)if((e=t(r.value))&&e.then){if(!c(e))return void e.then(l,u||(u=s.bind(null,o=new a,2)));e=e.v}o?s(o,1,e):o=e}catch(e){s(o||(o=new a),2,e)}},h=e[i]();if(l(),h.return){var d=function(e){try{r.done||h.return()}catch(e){}return e};if(o&&o.then)return o.then(d,function(e){throw d(e)});d()}return o}if(!("length"in e))throw new TypeError("Object is not iterable");for(var m=[],v=0;v<e.length;v++)m.push(e[v]);return f(m,function(e){return t(m[e])},n)}e.LOG_LEVELS=void 0,(u=e.LOG_LEVELS||(e.LOG_LEVELS={}))[u.NONE=0]="NONE",u[u.ERROR=1]="ERROR",u[u.WARN=2]="WARN",u[u.INFO=3]="INFO",u[u.DEBUG=4]="DEBUG",e.DTFunctions=/*#__PURE__*/function(){function t(t){void 0===t&&(t=e.LOG_LEVELS.ERROR),this.currentLogLevel=void 0,this.currentLogLevel=t}var n=t.prototype;return n.setLogLevel=function(e){this.currentLogLevel=e},n.performGradingPlatform=function(e){var t=e.oauth_client_id,n=e.oauth_client_secret,r=e.dt_account_urn,o=e.oauth_sso_endpoint,i=e.dt_platform_environment,s=e.documentType,u=e.documentName,a=e.validationId,c=e.maxScore,f=e.getScore;try{var l=this,h=null;return Promise.resolve(l.getOauthAccessToken(t,n,r,o)).then(function(e){if(!e)throw new Error("Failed to obtain access token");return Promise.resolve(l.getAuthorizationHeaderPlatform(e)).then(function(e){return h=e,Promise.resolve(l.getDocumentsList(i,s,u,h)).then(function(e){return Promise.resolve(l.getDocumentDetails(i,e,h)).then(function(t){return Promise.resolve(l.generateAuditInfo({documentList:e,documentDetails:t})).then(function(e){return Promise.resolve(f(e,h)).then(function(t){var n=t.score;return e.assertionFails=t.assertion_fails,{validationId:a,maxScore:c,finalScore:n,auditInfo:e}})})})})})})}catch(e){return Promise.reject(e)}},n.performGradingGen2=function(e){var t=e.dt_gen2_environment,n=e.dt_access_token,r=e.validationId,o=e.maxScore,i=e.entity_type,s=e.entity_name_to_query,u=e.config_endpoint,a=e.config_name_to_query,c=e.config_endpoint_extra_param,f=e.settings_schema_id,l=e.settings_scope,h=e.getScore;try{var d=this;return Promise.resolve(d.getAuthorizationHeaderGen2(n)).then(function(e){return Promise.resolve(d.getEntities(t,i,s,e)).then(function(n){return Promise.resolve(d.getEntitiesData(t,n,e)).then(function(i){return Promise.resolve(d.getConfigsList(t,u,a,c,n,e)).then(function(s){return Promise.resolve(d.getConfigsData(t,u,s,e)).then(function(u){return Promise.resolve(d.getSettingsData(t,n,e,f,l)).then(function(a){return Promise.resolve(d.getProblemsData(t,n,e)).then(function(c){return Promise.resolve(d.getUserDashboardList(t,e)).then(function(f){return Promise.resolve(d.getDashboardsData(t,f,e)).then(function(t){return Promise.resolve(d.generateAuditInfo({entitiesList:n,entitiesData:i,settingsData:a,configList:s,configDetails:u,problemsData:c,userDashboardList:f,userDashboardDetails:t})).then(function(t){return Promise.resolve(h(t,e)).then(function(e){var n=e.score;return t.assertionFails=e.assertion_fails,{validationId:r,maxScore:o,finalScore:n,auditInfo:t}})})})})})})})})})})})}catch(e){return Promise.reject(e)}},n.getOauthAccessToken=function(t,n,r,i){try{var s=this,u=new Headers;u.append("Content-Type","application/x-www-form-urlencoded");var a=new URLSearchParams;a.append("grant_type","client_credentials"),a.append("client_id",t),a.append("client_secret",n),a.append("scope","document:documents:admin document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read "),a.append("resource",r);var c={method:"POST",headers:u,body:a,redirect:"follow"};return Promise.resolve(o(function(){return Promise.resolve(fetch(i,c)).then(function(t){function n(n){return Promise.resolve(t.json()).then(function(t){return s.log(e.LOG_LEVELS.DEBUG,"oAuth Access Token result:\n"+JSON.stringify(t,null,2)),t.access_token})}var r=function(){if(!t.ok)return 400===t.status?Promise.resolve(t.text()).then(function(n){throw s.log(e.LOG_LEVELS.ERROR,"oAuth Access Token Error: "+t.status+" "+n),new Error("Bad Request: "+n)}):Promise.resolve(t.text()).then(function(n){throw s.log(e.LOG_LEVELS.ERROR,"oAuth Access Token Error: "+t.status+" "+n),new Error("HTTP error! status: "+t.status)})}();return r&&r.then?r.then(n):n()})},function(t){s.log(e.LOG_LEVELS.ERROR,"oAuth Access Token Error: "+t.message)}))}catch(e){return Promise.reject(e)}},n.getAuthorizationHeaderPlatform=function(e){try{var t=new Headers;return t.append("Authorization","Bearer "+e),Promise.resolve(t)}catch(e){return Promise.reject(e)}},n.getAuthorizationHeaderGen2=function(e){try{var t=new Headers;return t.append("Authorization","Api-Token "+e),Promise.resolve(t)}catch(e){return Promise.reject(e)}},n.getEntities=function(t,n,r,i){try{var s=this,u=new Request(t+"/api/v2/entities?entitySelector=type("+n+"),entityName.contains("+r+")",{method:"GET",headers:i}),a=null,c=o(function(){return Promise.resolve(fetch(u)).then(function(t){var n=t.ok?Promise.resolve(t.json()).then(function(e){a=e}):Promise.resolve(t.text()).then(function(n){s.log(e.LOG_LEVELS.ERROR,'"Entity ID Error: '+t.status+" "+n)});if(n&&n.then)return n.then(function(){})})},function(t){s.log(e.LOG_LEVELS.ERROR," "+t)});return Promise.resolve(c&&c.then?c.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},n.getEntitiesData=function(t,n,r){try{var i=this;if(null===n)return Promise.resolve([]);var s=[],u=l(n.entities,function(n){var u=new Request(t+"/api/v2/entities/"+n.entityId,{method:"GET",headers:r}),a=o(function(){return Promise.resolve(fetch(u)).then(function(t){var n=t.ok?Promise.resolve(t.json()).then(function(e){s.push(e)}):Promise.resolve(t.text()).then(function(n){i.log(e.LOG_LEVELS.ERROR,"Entity Details Error: "+t.status+" "+n)});if(n&&n.then)return n.then(function(){})})},function(t){i.log(e.LOG_LEVELS.ERROR," "+t)});if(a&&a.then)return a.then(function(){})});return Promise.resolve(u&&u.then?u.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},n.getUserDashboardList=function(t,n){try{var r=this,i=[],s=[],u=o(function(){return Promise.resolve(r.getConfigsList(t,"/api/config/v1/dashboards","","",null,n)).then(function(t){i=t,r.log(e.LOG_LEVELS.DEBUG,"dashboard_list raw:\n"+JSON.stringify(i[0].dashboards,null,2));var n=i[0].dashboards.filter(function(e){return"Dynatrace"!==e.owner});n.length>0&&s.push({dashboards:n}),r.log(e.LOG_LEVELS.DEBUG,"user_dashboard_list:\n"+JSON.stringify(s[0].dashboards,null,2))})},function(t){r.log(e.LOG_LEVELS.ERROR,"getUserDashboardList Error: "+t)});return Promise.resolve(u&&u.then?u.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},n.getDashboardsData=function(t,n,r){try{var i=this;if(null===n)return Promise.resolve([]);var s=[],u=o(function(){return Promise.resolve(i.getConfigsData(t,"/api/config/v1/dashboards",n,r)).then(function(t){s=t,i.log(e.LOG_LEVELS.DEBUG,"dashboardsData:\n"+JSON.stringify(s,null,2))})},function(t){i.log(e.LOG_LEVELS.ERROR,"getDashboardsData Error: "+t)});return Promise.resolve(u&&u.then?u.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},n.getConfigsList=function(t,n,r,o,i,s){try{var u=this,a=[];if(""===n)return Promise.resolve([]);var c="",f=function(){if(o.includes("/")&&!i){var f=function(){u.log(e.LOG_LEVELS.DEBUG,"Config List with extra param /")},h=l(i.entities,function(e){return c="/"+e.entityId+o,Promise.resolve(u.callConfigList(t,n,r,c,s)).then(function(e){a.push(e)})});return h&&h.then?h.then(f):f()}var d=o.includes("?")?(c=o,Promise.resolve(u.callConfigList(t,n,r,c,s)).then(function(t){a.push(t),u.log(e.LOG_LEVELS.DEBUG,"Config List with extra param ?")})):Promise.resolve(u.callConfigList(t,n,r,c,s)).then(function(e){a.push(e)});if(d&&d.then)return d.then(function(){})}();return Promise.resolve(f&&f.then?f.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},n.callConfigList=function(t,n,r,i,s){try{var u=this,a=new Request(t+n+i,{method:"GET",headers:s}),c=[],f=o(function(){return Promise.resolve(fetch(a)).then(function(t){var n=t.ok?Promise.resolve(t.json()).then(function(e){c=e}):Promise.resolve(t.text()).then(function(n){u.log(e.LOG_LEVELS.ERROR,"ConfigList Error: "+t.status+" "+n)});if(n&&n.then)return n.then(function(){})})},function(t){u.log(e.LOG_LEVELS.ERROR,""+t)});return Promise.resolve(f&&f.then?f.then(function(){return c}):c)}catch(e){return Promise.reject(e)}},n.getConfigsData=function(t,n,r,i){try{var s=this;if(null===r)return Promise.resolve([]);var u=[],a=l(r,function(r){return function(a){var c=[];for(var h in a)c.push(h);return f(c,function(a){return function(a){return function(){if(a&&null!=a&&Array.isArray(r[a]))return l(r[a],function(r){var a=r?r.entityId||r.id:null,c=function(){if(a){var r=new Request(t+n+"/"+a,{method:"GET",headers:i}),c=o(function(){return Promise.resolve(fetch(r)).then(function(t){var n=t.ok?Promise.resolve(t.json()).then(function(e){u.push(e)}):Promise.resolve(t.text()).then(function(n){s.log(e.LOG_LEVELS.ERROR,"Config Data Error: "+t.status+" "+n)});if(n&&n.then)return n.then(function(){})})},function(t){s.log(e.LOG_LEVELS.ERROR,""+t)});if(c&&c.then)return c.then(function(){})}}();if(c&&c.then)return c.then(function(){})})}()}(c[a])},void 0)}(r)});return Promise.resolve(a&&a.then?a.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},n.getSettingsData=function(t,n,i,s,u){try{var a=this,c=[];if(""===s)return Promise.resolve([]);var f="";if("entity"===u)for(var l,h=r(n.entities);!(l=h()).done;)f=f+l.value.entityId+",";else f=u;if(""==f)return Promise.resolve([]);var d=new Request(t+"/api/v2/settings/objects?schemaIds="+s+"&scopes="+f,{method:"GET",headers:i}),m=o(function(){return Promise.resolve(fetch(d)).then(function(t){var n=t.ok?Promise.resolve(t.json()).then(function(e){c.push(e)}):Promise.resolve(t.text()).then(function(n){a.log(e.LOG_LEVELS.ERROR,"Settings Data Error: "+t.status+" "+n)});if(n&&n.then)return n.then(function(){})})},function(t){a.log(e.LOG_LEVELS.ERROR,""+t)});return Promise.resolve(m&&m.then?m.then(function(){return c}):c)}catch(e){return Promise.reject(e)}},n.getProblemsData=function(t,n,i){try{var s=this;if(!n||!n.entities||n.entities.length<=0)return Promise.resolve(null);for(var u,a="",c=r(n.entities);!(u=c()).done;)a+=","+u.value.entityId;a=a.substring(1);var f=new Request(t+"/api/v2/problems?from=now-6h&problemSelector=rootCauseEntity("+a+")",{method:"GET",headers:i}),l=null,h=o(function(){return Promise.resolve(fetch(f)).then(function(t){var n=t.ok?Promise.resolve(t.json()).then(function(e){l=e}):Promise.resolve(t.text()).then(function(n){s.log(e.LOG_LEVELS.ERROR,"Problems Data Error: "+t.status+" "+n)});if(n&&n.then)return n.then(function(){})})},function(t){s.log(e.LOG_LEVELS.ERROR,""+t)});return Promise.resolve(h&&h.then?h.then(function(){return l}):l)}catch(e){return Promise.reject(e)}},n.getDocumentsList=function(t,n,r,i){try{var s=this,u="name contains '"+r+"' and type == '"+n+"'",a=new Request(t+"/platform/document/v1/documents?admin-access=true&filter="+encodeURIComponent(u),{method:"GET",headers:i});s.log(e.LOG_LEVELS.DEBUG,"documentFilter:\n"+JSON.stringify(u,null,2));var c=null,f=o(function(){return s.log(e.LOG_LEVELS.DEBUG,"headers:\n"+JSON.stringify(i,null,2)),Promise.resolve(fetch(a)).then(function(t){s.log(e.LOG_LEVELS.DEBUG,"response:\n"+JSON.stringify(t,null,2));var n=t.ok?Promise.resolve(t.json()).then(function(e){c=e}):Promise.resolve(t.text()).then(function(n){s.log(e.LOG_LEVELS.ERROR,"Document List Error: "+t.status+" "+n)});if(n&&n.then)return n.then(function(){})})},function(t){s.log(e.LOG_LEVELS.ERROR,""+t)});return Promise.resolve(f&&f.then?f.then(function(){return c}):c)}catch(e){return Promise.reject(e)}},n.getDocumentDetails=function(t,n,r){try{var i=this;if(null===n)return Promise.resolve([]);var s=[],u={method:"GET",headers:r},a=l(n.documents,function(n){var r=String(n.id),a=o(function(){return Promise.resolve(fetch(t+"/platform/document/v1/documents/"+r+"/content?admin-access=true",u)).then(function(n){var o=n.ok?Promise.resolve(n.json()).then(function(n){return Promise.resolve(fetch(t+"/platform/document/v1/direct-shares?filter="+encodeURIComponent("documentId=='"+r+"'"),u)).then(function(t){function r(){s.push(n)}var o=t.ok?Promise.resolve(t.json()).then(function(t){i.log(e.LOG_LEVELS.DEBUG,"directSharesResult:\n"+JSON.stringify(t,null,2)),n["direct-shares"]=t["direct-shares"]}):Promise.resolve(t.text()).then(function(n){i.log(e.LOG_LEVELS.ERROR,"Direct Shares Error: "+t.status+" "+n)});return o&&o.then?o.then(r):r()})}):Promise.resolve(n.text()).then(function(t){i.log(e.LOG_LEVELS.ERROR,"Document Details Error: "+n.status+" "+t)});if(o&&o.then)return o.then(function(){})})},function(t){i.log(e.LOG_LEVELS.ERROR,""+t)});if(a&&a.then)return a.then(function(){})});return Promise.resolve(a&&a.then?a.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},n.generateAuditInfo=function(e){var t=e.documentList,n=e.documentDetails,r=e.entitiesList,o=e.entitiesData,i=e.settingsData,s=e.configList,u=e.configDetails,a=e.problemsData,c=e.userDashboardList,f=e.userDashboardDetails;try{var l={};return null!=t&&(l.documentList=t),null!=n&&(l.documentDetails=n),null!=r&&(l.entitiesList=r),null!=o&&(l.entitiesData=o),null!=s&&(l.configList=s),null!=u&&null==u.error&&(l.configDetails=u),null!=i&&(l.settingsData=i),null!=a&&(l.problemsData=a),null!=c&&(l.userDashboardList=c),null!=f&&(l.userDashboardDetails=f),l.assertionFails=[],Promise.resolve(l)}catch(e){return Promise.reject(e)}},n.checkKeywordsExistence=function(e,t){return t.every(function(t){return e.toLowerCase().includes(t.toLowerCase())})},n.findIdInObject=function(e){for(var t in e)if(e.hasOwnProperty(t))if("object"==typeof e[t]){var n=this.findIdInObject(e[t]);if(n)return n}else if("id"===t||"entityId"===t)return e[t];return null},n.log=function(e,t){e<=this.currentLogLevel&&console.log(t)},t}(),e.QuestionSDK=t});
//# sourceMappingURL=index.umd.js.map
