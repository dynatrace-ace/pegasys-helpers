var e=/*#__PURE__*/function(){function e(){}return e.prototype.createQuestion=function(e,t){return{id:e,description:t}},e}();function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function n(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}var o="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function i(e,t,n){if(!e.s){if(n instanceof u){if(!n.s)return void(n.o=i.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(i.bind(null,e,t),i.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var s,u=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){var r=new e,o=this.s;if(o){var s=1&o?t:n;if(s){try{i(r,1,s(this.v))}catch(e){i(r,2,e)}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?i(r,1,t?t(o):o):n?i(r,1,n(o)):i(r,2,o)}catch(e){i(r,2,e)}},r},e}();function a(e){return e instanceof u&&1&e.s}function c(e,t,n){var r,o,s=-1;return function c(l){try{for(;++s<e.length&&(!n||!n());)if((l=t(s))&&l.then){if(!a(l))return void l.then(c,o||(o=i.bind(null,r=new u,2)));l=l.v}r?i(r,1,l):r=l}catch(e){i(r||(r=new u),2,e)}}(),r}function l(e,t,n){if("function"==typeof e[o]){var r,s,l,f=function(e){try{for(;!((r=h.next()).done||n&&n());)if((e=t(r.value))&&e.then){if(!a(e))return void e.then(f,l||(l=i.bind(null,s=new u,2)));e=e.v}s?i(s,1,e):s=e}catch(e){i(s||(s=new u),2,e)}},h=e[o]();if(f(),h.return){var v=function(e){try{r.done||h.return()}catch(e){}return e};if(s&&s.then)return s.then(v,function(e){throw v(e)});v()}return s}if(!("length"in e))throw new TypeError("Object is not iterable");for(var m=[],d=0;d<e.length;d++)m.push(e[d]);return c(m,function(e){return t(m[e])},n)}!function(e){e[e.NONE=0]="NONE",e[e.ERROR=1]="ERROR",e[e.WARN=2]="WARN",e[e.INFO=3]="INFO",e[e.DEBUG=4]="DEBUG"}(s||(s={}));var f=/*#__PURE__*/function(){function e(e){void 0===e&&(e=s.ERROR),this.currentLogLevel=void 0,this.jsonSizeThreshold=2e4,this.currentLogLevel=e}var t=e.prototype;return t.setLogLevel=function(e){this.currentLogLevel=e},t.performGradingPlatform=function(e){var t=e.oauth_client_id,n=e.oauth_client_secret,r=e.dt_account_urn,o=e.oauth_sso_endpoint,i=e.dt_platform_environment,s=e.documentType,u=e.documentName,a=e.validationId,c=e.maxScore,l=e.getScore;try{var f=this,h=null;return Promise.resolve(f.getOauthAccessToken(t,n,r,o)).then(function(e){if(!e)throw new Error("Failed to obtain access token");return Promise.resolve(f.getAuthorizationHeaderPlatform(e)).then(function(e){return h=e,Promise.resolve(f.getDocumentsList(i,s,u,h)).then(function(e){return Promise.resolve(f.getDocumentDetails(i,e,h)).then(function(t){return Promise.resolve(f.generateAuditInfo({documentList:e,documentDetails:t})).then(function(e){return Promise.resolve(l(e,h)).then(function(t){var n=t.score;return e.assertionFails=t.assertion_fails,{validationId:a,maxScore:c,finalScore:n,auditInfo:e}})})})})})})}catch(e){return Promise.reject(e)}},t.performGradingGen2=function(e){var t=e.dt_gen2_environment,n=e.dt_access_token,r=e.validationId,o=e.maxScore,i=e.entity_type,s=e.entity_name_to_query,u=e.config_endpoint,a=e.config_name_to_query,c=e.config_endpoint_extra_param,l=e.settings_schema_id,f=e.settings_scope,h=e.getScore;try{var v=this;return Promise.resolve(v.getAuthorizationHeaderGen2(n)).then(function(e){return Promise.resolve(v.getEntities(t,i,s,e)).then(function(n){return Promise.resolve(v.getEntitiesData(t,n,e)).then(function(i){return Promise.resolve(v.getConfigsList(t,u,a,c,n,e)).then(function(s){return Promise.resolve(v.getConfigsData(t,u,s,e)).then(function(u){return Promise.resolve(v.getSettingsData(t,n,e,l,f)).then(function(a){return Promise.resolve(v.getProblemsData(t,n,e)).then(function(c){return Promise.resolve(v.getUserDashboardList(t,e)).then(function(l){return Promise.resolve(v.getDashboardsData(t,l,e)).then(function(t){return Promise.resolve(v.generateAuditInfo({entitiesList:n,entitiesData:i,settingsData:a,configList:s,configDetails:u,problemsData:c,userDashboardList:l,userDashboardDetails:t})).then(function(t){return Promise.resolve(h(t,e)).then(function(e){var n=e.score;return t.assertionFails=e.assertion_fails,{validationId:r,maxScore:o,finalScore:n,auditInfo:t}})})})})})})})})})})})}catch(e){return Promise.reject(e)}},t.getOauthAccessToken=function(e,t,n,o){try{var i=this,u=new Headers;u.append("Content-Type","application/x-www-form-urlencoded");var a=new URLSearchParams;a.append("grant_type","client_credentials"),a.append("client_id",e),a.append("client_secret",t),a.append("scope","document:documents:admin document:documents:read document:documents:write document:environment-shares:read document:direct-shares:read "),a.append("resource",n);var c={method:"POST",headers:u,body:a,redirect:"follow"};return Promise.resolve(r(function(){return Promise.resolve(fetch(o,c)).then(function(e){function t(t){return Promise.resolve(e.json()).then(function(e){return i.log(s.DEBUG,"oAuth Access Token result:\n"+JSON.stringify(e,null,2)),e.access_token})}var n=function(){if(!e.ok)return 400===e.status?Promise.resolve(e.text()).then(function(t){throw i.log(s.ERROR,"oAuth Access Token Error: "+e.status+" "+t),new Error("Bad Request: "+t)}):Promise.resolve(e.text()).then(function(t){throw i.log(s.ERROR,"oAuth Access Token Error: "+e.status+" "+t),new Error("HTTP error! status: "+e.status)})}();return n&&n.then?n.then(t):t()})},function(e){i.log(s.ERROR,"oAuth Access Token Error: "+e.message)}))}catch(e){return Promise.reject(e)}},t.getAuthorizationHeaderPlatform=function(e){try{var t=new Headers;return t.append("Authorization","Bearer "+e),Promise.resolve(t)}catch(e){return Promise.reject(e)}},t.getAuthorizationHeaderGen2=function(e){try{var t=new Headers;return t.append("Authorization","Api-Token "+e),Promise.resolve(t)}catch(e){return Promise.reject(e)}},t.getEntities=function(e,t,n,o){try{var i=this,u=new Request(e+"/api/v2/entities?entitySelector=type("+t+"),entityName.contains("+n+")",{method:"GET",headers:o}),a=null,c=r(function(){return Promise.resolve(fetch(u)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){a=e}):Promise.resolve(e.text()).then(function(t){i.log(s.ERROR,'"Entity ID Error: '+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){i.log(s.ERROR," "+e)});return Promise.resolve(c&&c.then?c.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},t.getEntitiesData=function(e,t,n){try{var o=this;if(null===t)return Promise.resolve([]);var i=[],u=l(t.entities,function(t){var u=new Request(e+"/api/v2/entities/"+t.entityId,{method:"GET",headers:n}),a=r(function(){return Promise.resolve(fetch(u)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){i.push(e)}):Promise.resolve(e.text()).then(function(t){o.log(s.ERROR,"Entity Details Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){o.log(s.ERROR," "+e)});if(a&&a.then)return a.then(function(){})});return Promise.resolve(u&&u.then?u.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},t.getUserDashboardList=function(e,t){try{var n=this,o=[],i=[],u=r(function(){return Promise.resolve(n.getConfigsList(e,"/api/config/v1/dashboards","","",null,t)).then(function(e){o=e,n.log(s.DEBUG,"dashboard_list raw:\n"+JSON.stringify(o[0].dashboards,null,2));var t=o[0].dashboards.filter(function(e){return"Dynatrace"!==e.owner});t.length>0&&i.push({dashboards:t}),n.log(s.DEBUG,"user_dashboard_list:\n"+JSON.stringify(i[0].dashboards,null,2))})},function(e){n.log(s.ERROR,"getUserDashboardList Error: "+e)});return Promise.resolve(u&&u.then?u.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},t.getDashboardsData=function(e,t,n){try{var o=this;if(null===t)return Promise.resolve([]);var i=[],u=r(function(){return Promise.resolve(o.getConfigsData(e,"/api/config/v1/dashboards",t,n)).then(function(e){i=e,o.log(s.DEBUG,"dashboardsData:\n"+JSON.stringify(i,null,2))})},function(e){o.log(s.ERROR,"getDashboardsData Error: "+e)});return Promise.resolve(u&&u.then?u.then(function(){return i}):i)}catch(e){return Promise.reject(e)}},t.getConfigsList=function(e,t,n,r,o,i){try{var u=this,a=[];if(""===t)return Promise.resolve([]);var c="",f=function(){if(r.includes("/")&&!o){var f=function(){u.log(s.DEBUG,"Config List with extra param /")},h=l(o.entities,function(o){return c="/"+o.entityId+r,Promise.resolve(u.callConfigList(e,t,n,c,i)).then(function(e){a.push(e)})});return h&&h.then?h.then(f):f()}var v=r.includes("?")?(c=r,Promise.resolve(u.callConfigList(e,t,n,c,i)).then(function(e){a.push(e),u.log(s.DEBUG,"Config List with extra param ?")})):Promise.resolve(u.callConfigList(e,t,n,c,i)).then(function(e){a.push(e)});if(v&&v.then)return v.then(function(){})}();return Promise.resolve(f&&f.then?f.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},t.callConfigList=function(e,t,n,o,i){try{var u=this,a=new Request(e+t+o,{method:"GET",headers:i}),c=[],l=r(function(){return Promise.resolve(fetch(a)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){c=e}):Promise.resolve(e.text()).then(function(t){u.log(s.ERROR,"ConfigList Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){u.log(s.ERROR,""+e)});return Promise.resolve(l&&l.then?l.then(function(){return c}):c)}catch(e){return Promise.reject(e)}},t.getConfigsData=function(e,t,n,o){try{var i=this;if(null===n)return Promise.resolve([]);var u=[],a=l(n,function(n){return function(a){var f=[];for(var h in a)f.push(h);return c(f,function(a){return function(a){return function(){if(a&&null!=a&&Array.isArray(n[a]))return l(n[a],function(n){var a=n?n.entityId||n.id:null,c=function(){if(a){var n=new Request(e+t+"/"+a,{method:"GET",headers:o}),c=r(function(){return Promise.resolve(fetch(n)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){u.push(e)}):Promise.resolve(e.text()).then(function(t){i.log(s.ERROR,"Config Data Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){i.log(s.ERROR,""+e)});if(c&&c.then)return c.then(function(){})}}();if(c&&c.then)return c.then(function(){})})}()}(f[a])},void 0)}(n)});return Promise.resolve(a&&a.then?a.then(function(){return u}):u)}catch(e){return Promise.reject(e)}},t.getSettingsData=function(e,t,o,i,u){try{var a=this,c=[];if(""===i)return Promise.resolve([]);var l="";if("entity"===u)for(var f,h=n(t.entities);!(f=h()).done;)l=l+f.value.entityId+",";else l=u;if(""==l)return Promise.resolve([]);var v=new Request(e+"/api/v2/settings/objects?schemaIds="+i+"&scopes="+l,{method:"GET",headers:o}),m=r(function(){return Promise.resolve(fetch(v)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){c.push(e)}):Promise.resolve(e.text()).then(function(t){a.log(s.ERROR,"Settings Data Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){a.log(s.ERROR,""+e)});return Promise.resolve(m&&m.then?m.then(function(){return c}):c)}catch(e){return Promise.reject(e)}},t.getProblemsData=function(e,t,o){try{var i=this;if(!t||!t.entities||t.entities.length<=0)return Promise.resolve(null);for(var u,a="",c=n(t.entities);!(u=c()).done;)a+=","+u.value.entityId;a=a.substring(1);var l=new Request(e+"/api/v2/problems?from=now-6h&problemSelector=rootCauseEntity("+a+")",{method:"GET",headers:o}),f=null,h=r(function(){return Promise.resolve(fetch(l)).then(function(e){var t=e.ok?Promise.resolve(e.json()).then(function(e){f=e}):Promise.resolve(e.text()).then(function(t){i.log(s.ERROR,"Problems Data Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){i.log(s.ERROR,""+e)});return Promise.resolve(h&&h.then?h.then(function(){return f}):f)}catch(e){return Promise.reject(e)}},t.getDocumentsList=function(e,t,n,o){try{var i=this,u="name contains '"+n+"' and type == '"+t+"'",a=new Request(e+"/platform/document/v1/documents?admin-access=true&filter="+encodeURIComponent(u),{method:"GET",headers:o});i.log(s.DEBUG,"documentFilter:\n"+JSON.stringify(u,null,2));var c=null,l=r(function(){return i.log(s.DEBUG,"headers:\n"+JSON.stringify(o,null,2)),Promise.resolve(fetch(a)).then(function(e){i.log(s.DEBUG,"response:\n"+JSON.stringify(e,null,2));var t=e.ok?Promise.resolve(e.json()).then(function(e){c=e}):Promise.resolve(e.text()).then(function(t){i.log(s.ERROR,"Document List Error: "+e.status+" "+t)});if(t&&t.then)return t.then(function(){})})},function(e){i.log(s.ERROR,""+e)});return Promise.resolve(l&&l.then?l.then(function(){return c}):c)}catch(e){return Promise.reject(e)}},t.getDocumentDetails=function(e,t,n){try{var o=function(){var e=JSON.stringify(u),t=new Blob([e]).size;return i.log(s.DEBUG,"jsonSize:"+t),t>i.jsonSizeThreshold&&(i.log(s.DEBUG,"jsonSize exceed "+i.jsonSizeThreshold),u=[{warning:"The size of the JSON output is too large"}]),i.log(s.DEBUG,"documentDetails:\n"+JSON.stringify(u,null,2)),u},i=this;if(null===t)return Promise.resolve([]);var u=[],a={method:"GET",headers:n},c=l(t.documents,function(t){var n=String(t.id),o=r(function(){return Promise.resolve(fetch(e+"/platform/document/v1/documents/"+n+"/content?admin-access=true",a)).then(function(t){var r=t.ok?Promise.resolve(t.json()).then(function(t){var r="documentId=='"+n+"'";return Promise.resolve(fetch(e+"/platform/document/v1/direct-shares?filter="+encodeURIComponent(r),a)).then(function(n){function o(){return Promise.resolve(fetch(e+"/platform/document/v1/environment-shares?filter="+encodeURIComponent(r),a)).then(function(e){function n(){t.sections&&t.sections.forEach(function(e){e.state&&(e.state.result&&delete e.state.result,e.state.davis&&e.state.davis.resultState&&delete e.state.davis.resultState)}),u.push(t)}var r=e.ok?Promise.resolve(e.json()).then(function(e){i.log(s.DEBUG,"environmentSharesResult:\n"+JSON.stringify(e,null,2)),t["environment-shares"]=e["environment-shares"]}):Promise.resolve(e.text()).then(function(t){i.log(s.ERROR,"Environment Shares Error: "+e.status+" "+t)});return r&&r.then?r.then(n):n()})}var c=n.ok?Promise.resolve(n.json()).then(function(e){i.log(s.DEBUG,"directSharesResult:\n"+JSON.stringify(e,null,2)),t["direct-shares"]=e["direct-shares"]}):Promise.resolve(n.text()).then(function(e){i.log(s.ERROR,"Direct Shares Error: "+n.status+" "+e)});return c&&c.then?c.then(o):o()})}):Promise.resolve(t.text()).then(function(e){i.log(s.ERROR,"Document Details Error: "+t.status+" "+e)});if(r&&r.then)return r.then(function(){})})},function(e){i.log(s.ERROR,""+e)});if(o&&o.then)return o.then(function(){})});return Promise.resolve(c&&c.then?c.then(o):o())}catch(e){return Promise.reject(e)}},t.generateAuditInfo=function(e){var t=e.documentList,n=e.documentDetails,r=e.entitiesList,o=e.entitiesData,i=e.settingsData,s=e.configList,u=e.configDetails,a=e.problemsData,c=e.userDashboardList,l=e.userDashboardDetails;try{var f={};return null!=t&&(f.documentList=t),null!=n&&(f.documentDetails=n),null!=r&&(f.entitiesList=r),null!=o&&(f.entitiesData=o),null!=s&&(f.configList=s),null!=u&&null==u.error&&(f.configDetails=u),null!=i&&(f.settingsData=i),null!=a&&(f.problemsData=a),null!=c&&(f.userDashboardList=c),null!=l&&(f.userDashboardDetails=l),f.assertionFails=[],Promise.resolve(f)}catch(e){return Promise.reject(e)}},t.checkKeywordsExistence=function(e,t){var n=e.replace(/\s+/g,"").toLowerCase();return t.map(function(e){return e.replace(/\s+/g,"").toLowerCase()}).every(function(e){return n.includes(e)})},t.findIdInObject=function(e){for(var t in e)if(e.hasOwnProperty(t))if("object"==typeof e[t]){var n=this.findIdInObject(e[t]);if(n)return n}else if("id"===t||"entityId"===t)return e[t];return null},t.log=function(e,t){e<=this.currentLogLevel&&console.log(t)},e}();export{f as DTFunctions,s as LOG_LEVELS,e as QuestionSDK};
//# sourceMappingURL=index.esm.js.map
