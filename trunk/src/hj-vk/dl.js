// http://9.5.2.7/min/?g=datalazyload | http://9.5.2.7/kissy/src/datalazyload/demo.html
(function(S,undefined){var host=this,meta={mix:function(r,s,ov,wl){if(!s||!r)return r;if(ov===undefined)ov=true;var i,p,len;if(wl&&(len=wl.length)){for(i=0;i<len;i++){p=wl[i];if(p in s){_mix(p,r,s,ov);}}}else{for(p in s){_mix(p,r,s,ov);}}
return r;}},_mix=function(p,r,s,ov){if(ov||!(p in r)){r[p]=s[p];}},seed=(host&&host[S])||{},guid=0,EMPTY='';host=seed.__HOST||(seed.__HOST=host||{});S=host[S]=meta.mix(seed,meta,false);S.mix(S,{__APP_MEMBERS:['namespace'],__APP_INIT_METHODS:['__init'],version:'@VERSION@',buildTime:'@TIMESTAMP@',merge:function(){var o={},i,l=arguments.length;for(i=0;i<l;i++){S.mix(o,arguments[i]);}
return o;},augment:function(){var args=S.makeArray(arguments),len=args.length-2,r=args[0],ov=args[len],wl=args[len+1],i=1;if(!S.isArray(wl)){ov=wl;wl=undefined;len++;}
if(!S.isBoolean(ov)){ov=undefined;len++;}
for(;i<len;i++){S.mix(r.prototype,args[i].prototype||args[i],ov,wl);}
return r;},extend:function(r,s,px,sx){if(!s||!r)return r;var create=Object.create?function(proto,c){return Object.create(proto,{constructor:{value:c}});}:function(proto,c){function F(){}
F.prototype=proto;var o=new F();o.constructor=c;return o;},sp=s.prototype,rp;rp=create(sp,r);r.prototype=S.mix(rp,r.prototype);r.superclass=create(sp,s);if(px){S.mix(rp,px);}
if(sx){S.mix(r,sx);}
return r;},__init:function(){this.Config=this.Config||{};this.Env=this.Env||{};this.Config.debug='@DEBUG@';},namespace:function(){var args=S.makeArray(arguments),l=args.length,o=null,i,j,p,global=(args[l-1]===true&&l--);for(i=0;i<l;i++){p=(EMPTY+args[i]).split('.');o=global?host:this;for(j=(host[p[0]]===o)?1:0;j<p.length;++j){o=o[p[j]]=o[p[j]]||{};}}
return o;},app:function(name,sx){var isStr=S.isString(name),O=isStr?host[name]||{}:name,i=0,len=S.__APP_INIT_METHODS.length;S.mix(O,this,true,S.__APP_MEMBERS);for(;i<len;i++)S[S.__APP_INIT_METHODS[i]].call(O);S.mix(O,S.isFunction(sx)?sx():sx);isStr&&(host[name]=O);return O;},config:function(c){for(var p in c){if(this["_"+p])this["_"+p](c[p]);}},log:function(msg,cat,src){if(S.Config.debug){if(src){msg=src+': '+msg;}
if(host['console']!==undefined&&console.log){console[cat&&console[cat]?cat:'log'](msg);}}},error:function(msg){if(S.Config.debug){throw msg;}},guid:function(pre){return(pre||EMPTY)+guid++;}});S.__init();return S;})('KISSY');;(function(S,undefined){var host=S.__HOST,toString=Object.prototype.toString,AP=Array.prototype,indexOf=AP.indexOf,lastIndexOf=AP.lastIndexOf,filter=AP.filter,trim=String.prototype.trim,EMPTY='',CLONE_MARKER='__~ks_cloned',RE_TRIM=/^\s+|\s+$/g,SEP='&',BRACKET=encodeURIComponent('[]'),RE_ARR_KEY=/^(\w+)\[\]$/,class2type={},htmlEntities={'&amp;':'&','&gt;':'>','&lt;':'<','&quot;':'"'},reverseEntities={},escapeReg,unEscapeReg;for(var k in htmlEntities){reverseEntities[htmlEntities[k]]=k;}
function getEscapeReg(){if(escapeReg){return escapeReg}
var str='';S.each(htmlEntities,function(entity){str+=entity+'|';});str=str.slice(0,-1);return escapeReg=new RegExp(str,"g");}
function getUnEscapeReg(){if(unEscapeReg){return unEscapeReg}
var str='';S.each(reverseEntities,function(entity){str+=entity+'|';});str+='&#(\\d{1,5});';return unEscapeReg=new RegExp(str,"g");}
function isValidParamValue(val){var t=typeof val;return val===null||(t!=='object'&&t!=='function');}
S.mix(S,{type:function(o){return o==null?String(o):class2type[toString.call(o)]||'object';},isNull:function(o){return o===null;},isUndefined:function(o){return o===undefined;},isEmptyObject:function(o){for(var p in o){if(p!==undefined){return false;}}
return true;},isPlainObject:function(o){return o&&toString.call(o)==='[object Object]'&&'isPrototypeOf'in o;},clone:function(o,f,cloned){var ret=o,isArray,k,stamp,marked=cloned||{};if(o&&((isArray=S.isArray(o))||S.isPlainObject(o))){if(o[CLONE_MARKER]){return marked[o[CLONE_MARKER]];}
o[CLONE_MARKER]=(stamp=S.guid());marked[stamp]=o;if(isArray){ret=f?S.filter(o,f):o.concat();}else{ret={};for(k in o){if(k!==CLONE_MARKER&&o.hasOwnProperty(k)&&(!f||(f.call(o,o[k],k,o)!==false))){ret[k]=S.clone(o[k],f,marked);}}}}
if(!cloned){S.each(marked,function(v){if(v[CLONE_MARKER]){try{delete v[CLONE_MARKER];}catch(e){v[CLONE_MARKER]=undefined;}}});marked=undefined;}
return ret;},trim:trim?function(str){return(str==undefined)?EMPTY:trim.call(str);}:function(str){return(str==undefined)?EMPTY:str.toString().replace(RE_TRIM,EMPTY);},substitute:function(str,o,regexp){if(!S.isString(str)||!S.isPlainObject(o)){return str;}
return str.replace(regexp||/\\?\{([^{}]+)\}/g,function(match,name){if(match.charAt(0)==='\\'){return match.slice(1);}
return(o[name]!==undefined)?o[name]:EMPTY;});},each:function(object,fn,context){var key,val,i=0,length=object&&object.length,isObj=length===undefined||S.type(object)==='function';context=context||host;if(isObj){for(key in object){if(fn.call(context,object[key],key,object)===false){break;}}}else{for(val=object[0];i<length&&fn.call(context,val,i,object)!==false;val=object[++i]){}}
return object;},indexOf:indexOf?function(item,arr){return indexOf.call(arr,item);}:function(item,arr){for(var i=0,len=arr.length;i<len;++i){if(arr[i]===item){return i;}}
return-1;},lastIndexOf:(lastIndexOf)?function(item,arr){return lastIndexOf.call(arr,item);}:function(item,arr){for(var i=arr.length-1;i>=0;i--){if(arr[i]===item){break;}}
return i;},unique:function(a,override){if(override){a.reverse();}
var b=a.slice(),i=0,n,item;while(i<b.length){item=b[i];while((n=S.lastIndexOf(item,b))!==i){b.splice(n,1);}
i+=1;}
if(override){b.reverse();}
return b;},inArray:function(item,arr){return S.indexOf(item,arr)>-1;},filter:filter?function(arr,fn,context){return filter.call(arr,fn,context||this);}:function(arr,fn,context){var ret=[];S.each(arr,function(item,i,arr){if(fn.call(context||this,item,i,arr)){ret.push(item);}});return ret;},now:function(){return new Date().getTime();},fromUnicode:function(str){return str.replace(/\\u([a-f\d]{4})/ig,function(m,u){return String.fromCharCode(parseInt(u,16));});},escapeHTML:function(str){return str.replace(getEscapeReg(),function(m){return reverseEntities[m];});},unEscapeHTML:function(str){return str.replace(getUnEscapeReg(),function(m,n){return htmlEntities[m]||String.fromCharCode(+n);});},makeArray:function(o){if(o===null||o===undefined)return[];if(S.isArray(o))return o;if(typeof o.length!=='number'||S.isString(o)||S.isFunction(o)){return[o];}
var ret=[];for(var i=0,l=o.length;i<l;i++){ret[i]=o[i];}
return ret;},param:function(o,sep){if(!S.isPlainObject(o))return EMPTY;sep=sep||SEP;var buf=[],key,val;for(key in o){val=o[key];key=encodeURIComponent(key);if(isValidParamValue(val)){buf.push(key,'=',encodeURIComponent(val+EMPTY),sep);}
else if(S.isArray(val)&&val.length){for(var i=0,len=val.length;i<len;++i){if(isValidParamValue(val[i])){buf.push(key,BRACKET+'=',encodeURIComponent(val[i]+EMPTY),sep);}}}}
buf.pop();return buf.join(EMPTY);},unparam:function(str,sep){if(typeof str!=='string'||(str=S.trim(str)).length===0)return{};var ret={},pairs=str.split(sep||SEP),pair,key,val,m,i=0,len=pairs.length;for(;i<len;++i){pair=pairs[i].split('=');key=decodeURIComponent(pair[0]);try{val=decodeURIComponent(pair[1]||EMPTY);}catch(ex){val=pair[1]||EMPTY;}
if((m=key.match(RE_ARR_KEY))&&m[1]){ret[m[1]]=ret[m[1]]||[];ret[m[1]].push(val);}else{ret[key]=val;}}
return ret;},later:function(fn,when,periodic,o,data){when=when||0;o=o||{};var m=fn,d=S.makeArray(data),f,r;if(S.isString(fn)){m=o[fn];}
if(!m){S.error('method undefined');}
f=function(){m.apply(o,d);};r=(periodic)?setInterval(f,when):setTimeout(f,when);return{id:r,interval:periodic,cancel:function(){if(this.interval){clearInterval(r);}else{clearTimeout(r);}}};}});S.mix(S,{isBoolean:isValidParamValue,isNumber:isValidParamValue,isString:isValidParamValue,isFunction:isValidParamValue,isArray:isValidParamValue,isDate:isValidParamValue,isRegExp:isValidParamValue,isObject:isValidParamValue});S.each('Boolean Number String Function Array Date RegExp Object'.split(' '),function(name,lc){class2type['[object '+name+']']=(lc=name.toLowerCase());S['is'+name]=function(o){return S.type(o)==lc;}});})(KISSY);;(function(S){var win=S.__HOST,doc=win['document'],docElem=doc.documentElement,EMPTY='',isReady=false,readyList=[],readyBound=false,POLL_RETRYS=500,POLL_INTERVAL=40,RE_IDSTR=/^#?([\w-]+)$/,RE_NOT_WHITE=/\S/;S.mix(S,{isWindow:function(o){return S.type(o)==='object'&&'setInterval'in o&&'document'in o&&o.document.nodeType==9;},globalEval:function(data){if(data&&RE_NOT_WHITE.test(data)){var head=doc.getElementsByTagName('head')[0]||docElem,script=doc.createElement('script');script.text=data;head.insertBefore(script,head.firstChild);head.removeChild(script);}},ready:function(fn){if(!readyBound){this._bindReady();}
if(isReady){fn.call(win,this);}else{readyList.push(fn);}
return this;},_bindReady:function(){var self=this,doScroll=doc.documentElement.doScroll,eventType=doScroll?'onreadystatechange':'DOMContentLoaded',COMPLETE='complete',fire=function(){self._fireReady();};readyBound=true;if(doc.readyState===COMPLETE){return fire();}
if(doc.addEventListener){function domReady(){doc.removeEventListener(eventType,domReady,false);fire();}
doc.addEventListener(eventType,domReady,false);win.addEventListener('load',fire,false);}
else{function stateChange(){if(doc.readyState===COMPLETE){doc.detachEvent(eventType,stateChange);fire();}}
doc.attachEvent(eventType,stateChange);win.attachEvent('onload',fire);var notframe=false;try{notframe=win['frameElement']==null;}catch(e){}
if(doScroll&&notframe){function readyScroll(){try{doScroll('left');fire();}catch(ex){setTimeout(readyScroll,1);}}
readyScroll();}}},_fireReady:function(){if(isReady){return;}
isReady=true;if(readyList){var fn,i=0;while(fn=readyList[i++]){fn.call(win,this);}
readyList=null;}},available:function(id,fn){id=(id+EMPTY).match(RE_IDSTR)[1];if(!id||!S.isFunction(fn))return;var retryCount=1,timer=S.later(function(){if(doc.getElementById(id)&&(fn()||1)||++retryCount>POLL_RETRYS){timer.cancel();}},POLL_INTERVAL,true);}});if(location&&(location.search||EMPTY).indexOf('ks-debug')!==-1){S.Config.debug=true;}})(KISSY);;(function(S,undef){if(S.use){return;}
var win=S.__HOST,oldIE=!win['getSelection']&&win['ActiveXObject'],doc=win['document'],head=doc.getElementsByTagName('head')[0]||doc.documentElement,EMPTY='',LOADING=1,LOADED=2,ERROR=3,ATTACHED=4,mix=S.mix,scriptOnload=doc.addEventListener?function(node,callback){node.addEventListener('load',callback,false);}:function(node,callback){var oldCallback=node.onreadystatechange;node.onreadystatechange=function(){var rs=node.readyState;if(rs==='loaded'||rs==='complete'){node.onreadystatechange=null;oldCallback&&oldCallback();callback.call(this);}};},loader,RE_CSS=/\.css(?:\?|$)/i,buildTime=encodeURIComponent(S.buildTime),CSSFULLPATH='cssfullpath';function normalizePath(path){var paths=path.split("/"),re=[],p;for(var i=0;i<paths.length;i++){p=paths[i];if(p=="."){}else if(p==".."){re.pop();}else{re.push(p);}}
return re.join("/");}
function normalDepModuleName(moduleName,depName){if(!depName){return depName;}
if(S.isArray(depName)){for(var i=0;i<depName.length;i++){depName[i]=normalDepModuleName(moduleName,depName[i]);}
return depName;}
if(startsWith(depName,"../")||startsWith(depName,"./")){var anchor=EMPTY,index;if((index=moduleName.lastIndexOf("/"))!=-1){anchor=moduleName.substring(0,index+1);}
return normalizePath(anchor+depName);}else if(depName.indexOf("./")!=-1||depName.indexOf("../")!=-1){return normalizePath(depName);}else{return depName;}}
function removePostfix(path){return path.replace(/(-min)?\.js[^/]*$/i,EMPTY);}
var pagePath=(function(){var url=location.href;return url.replace(/[^/]*$/i,EMPTY);})();function normalBasePath(path){if(path.charAt(path.length-1)!='/'){path+="/";}
path=S.trim(path);if(!path.match(/^(http(s)?)|(file):/i)&&!startsWith(path,"/")){path=pagePath+path;}
return normalizePath(path);}
function indexMapping(names){for(var i=0;i<names.length;i++){if(names[i].match(/\/$/)){names[i]+="index";}}
return names;}
loader={__currentModule:null,__startLoadTime:0,__startLoadModuleName:null,add:function(name,def,config){var self=this,mods=self.Env.mods,o;if(S.isString(name)&&!config&&S.isPlainObject(def)){o={};o[name]=def;name=o;}
if(S.isPlainObject(name)){S.each(name,function(v,k){v.name=k;if(mods[k]){mix(v,mods[k],false);}});mix(mods,name);return self;}
if(S.isString(name)){var host;if(config&&(host=config.host)){var hostMod=mods[host];if(!hostMod){S.error("module "+host+" can not be found !");return self;}
if(self.__isAttached(host)){def.call(self,self);}else{hostMod.fns=hostMod.fns||[];hostMod.fns.push(def);}
return self;}
self.__registerModule(name,def,config);if(config&&config['attach']===false){return self;}
var mod=mods[name];var requires=normalDepModuleName(name,mod.requires);if(self.__isAttached(requires)){self.__attachMod(mod);}
else if(this.Config.debug&&!mod){var i,modNames;i=(modNames=S.makeArray(requires)).length-1;for(;i>=0;i--){var requireName=modNames[i];var requireMod=mods[requireName]||{};if(requireMod.status!==ATTACHED){S.log(mod.name+" not attached when added : depends "+requireName);}}}
return self;}
if(S.isFunction(name)){config=def;def=name;if(oldIE){if(((+new Date())-self.__startLoadTime)<15){S.log("old_ie 从缓存中读取");if(name=self.__startLoadModuleName){self.__registerModule(name,def,config);}else{S.log("从缓存读取？？但是请求前记录没有模块名","error");S.error("从缓存读取？？但是请求前记录没有模块名");}}else{S.log("old_ie 读取 interactiove 脚本地址");name=self.__findModuleNameByInteractive();self.__registerModule(name,def,config);}
self.__startLoadModuleName=null;self.__startLoadTime=0;}else{S.log("标准浏览器等load时再关联模块名");self.__currentModule={def:def,config:config};}
return self;}
S.error("invalid format for KISSY.add !");return self;},__findModuleNameByInteractive:function(){var self=this,scripts=document.getElementsByTagName("script"),re,script;for(var i=0;i<scripts.length;i++){script=scripts[i];if(script.readyState=="interactive"){re=script;break;}}
if(!re){S.log("找不到 interactive 状态的 script","error");S.error("找不到 interactive 状态的 script");}
var src=re.src;S.log("interactive src :"+src);if(src.lastIndexOf(self.Config.base,0)==0){return removePostfix(src.substring(self.Config.base.length));}
var packages=self.__packages;for(var p in packages){var p_path=packages[p].path;if(packages.hasOwnProperty(p)&&src.lastIndexOf(p_path,0)==0){return removePostfix(src.substring(p_path.length));}}
S.log("interactive 状态的 script 没有对应包 ："+src,"error");S.error("interactive 状态的 script 没有对应包 ："+src);return undefined;},__registerModule:function(name,def,config){config=config||{};var self=this,mods=self.Env.mods,mod=mods[name]||{};mix(mod,{name:name,status:LOADED});if(mod.fns&&mod.fns.length){S.log(name+" is defined more than once");}
mod.fns=mod.fns||[];mod.fns.push(def);mix((mods[name]=mod),config);},_packages:function(cfgs){var self=this,ps;ps=self.__packages=self.__packages||{};S.each(cfgs,function(cfg){ps[cfg.name]=cfg;if(cfg.path){cfg.path=normalBasePath(cfg.path);}
if(cfg.tag){cfg.tag=encodeURIComponent(cfg.tag);}});},_combine:function(from,to){var self=this,cs;if(S.isObject(from)){S.each(from,function(v,k){S.each(v,function(v2){self._combine(v2,k);});});return;}
cs=self.__combines=self.__combines||{};if(to){cs[from]=to;}else{return cs[from]||from;}},__mixMods:function(global){var mods=this.Env.mods,gMods=global.Env.mods,name;for(name in gMods){this.__mixMod(mods,gMods,name,global);}},__mixMod:function(mods,gMods,name,global){var mod=mods[name]||{},status=mod.status;S.mix(mod,S.clone(gMods[name]));if(status){mod.status=status;}
if(global){this.__buildPath(mod,global.Config.base);}
mods[name]=mod;},use:function(modNames,callback,cfg){modNames=modNames.replace(/\s+/g,EMPTY).split(',');indexMapping(modNames);cfg=cfg||{};var self=this,fired;if(cfg.global){self.__mixMods(cfg.global);}
if(self.__isAttached(modNames)){var mods=self.__getModules(modNames);callback&&callback.apply(self,mods);return;}
S.each(modNames,function(modName){self.__attachModByName(modName,function(){if(!fired&&self.__isAttached(modNames)){fired=true;var mods=self.__getModules(modNames);callback&&callback.apply(self,mods);}},cfg);});return self;},__getModules:function(modNames){var self=this,mods=[self];S.each(modNames,function(modName){mods.push(self.require(modName));});return mods;},require:function(moduleName){var self=this,mods=self.Env.mods,mod=mods[moduleName],re=self['onRequire']&&self['onRequire'](mod);if(re!==undefined){return re;}
return mod&&mod.value;},__getPackagePath:function(mod){if(mod.packagepath){return mod.packagepath;}
var self=this,modName=self._combine(mod.name),packages=self.__packages||{},pName="",p_def,p_path;for(var p in packages){if(packages.hasOwnProperty(p)&&startsWith(modName,p)&&p.length>pName){pName=p;}}
p_def=packages[pName];p_path=(p_def&&p_def.path)||self.Config.base;if(p_def&&p_def.charset){mod.charset=p_def.charset;}
if(p_def){mod.tag=p_def.tag;}else{mod.tag=buildTime;}
mod.packagepath=p_path;return p_path;},__attachModByName:function(modName,callback,cfg){var self=this,mods=self.Env.mods,mod=mods[modName];if(!mod){var componentJsName=self.Config['componentJsName']||function(m){return m+'-min.js';},jsPath=S.isFunction(componentJsName)?componentJsName(self._combine(modName)):componentJsName;mod={path:jsPath,charset:'utf-8'};mods[modName]=mod;}
mod.name=modName;if(mod&&mod.status===ATTACHED){return;}
self.__attach(mod,callback,cfg);},__attach:function(mod,callback,cfg){var self=this,mods=self.Env.mods,requires=(mod['requires']||[]).concat();mod['requires']=requires;S.each(requires,function(r,i,requires){r=requires[i]=normalDepModuleName(mod.name,r);var rMod=mods[r];if(rMod&&rMod.status===ATTACHED){}else{self.__attachModByName(r,fn,cfg);}});self.__buildPath(mod,self.__getPackagePath(mod));self.__load(mod,function(){if(self.__currentModule){self.__registerModule(mod.name,self.__currentModule.def,self.__currentModule.config);self.__currentModule=null;}
mod['requires']=mod['requires']||[];var newRequires=mod['requires'],optimize=[];S.each(newRequires,function(r,i,newRequires){r=newRequires[i]=normalDepModuleName(mod.name,r);var rMod=mods[r],inA=S.inArray(r,requires);if(rMod&&rMod.status===ATTACHED||inA){}else{self.__attachModByName(r,fn,cfg);}
if(!inA&&(!rMod||rMod.status<LOADED)){optimize.push(r);}});if(optimize.length!=0){optimize.unshift(mod.name);}
if(S.isString(mod["csspath"])||S.isString(mod[CSSFULLPATH])){self.__buildPath(mod,self.__getPackagePath(mod));S.getScript(mod[CSSFULLPATH]);}
fn();},cfg);var attached=false;function fn(){if(!attached&&self.__isAttached(mod['requires'])){if(mod.status===LOADED){self.__attachMod(mod);}
if(mod.status===ATTACHED){attached=true;callback();}}}},__attachMod:function(mod){var self=this,defs=mod.fns;if(defs){S.each(defs,function(def){var value;if(S.isFunction(def)){value=def.apply(self,self.__getModules(mod['requires']));}else{value=def;}
mod.value=mod.value||value;});}
mod.status=ATTACHED;},__isAttached:function(modNames){var mods=this.Env.mods,ret=true;S.each(modNames,function(name){var mod=mods[name];if(!mod||mod.status!==ATTACHED){ret=false;return ret;}});return ret;},__load:function(mod,callback,cfg){var self=this,url=mod['fullpath'],loadQueque=S.Env._loadQueue,node=loadQueque[url],ret;mod.status=mod.status||0;if(mod.status<LOADING&&node){mod.status=node.nodeName?LOADING:LOADED;}
if(S.isString(mod[CSSFULLPATH])){S.getScript(mod[CSSFULLPATH]);mod[CSSFULLPATH]=mod.csspath=LOADED;}
if(mod.status<LOADING&&url){mod.status=LOADING;if(oldIE){self.__startLoadModuleName=mod.name;self.__startLoadTime=Number(+new Date());}
ret=S.getScript(url,{success:function(){mixGlobal();if(mod.fns&&mod.fns.length>0){S.log(mod.name+' is loaded.','info');}else{_modError();}
_scriptOnComplete();},error:function(){_modError();_scriptOnComplete();},charset:mod.charset});if(!RE_CSS.test(url)){loadQueque[url]=ret;}}
else if(mod.status===LOADING){scriptOnload(node,_scriptOnComplete);}
else{callback();}
function _modError(){S.log(mod.name+' is not loaded! , can not find module in path : '+mod['fullpath'],'error');mod.status=ERROR;}
function mixGlobal(){if(cfg.global){self.__mixMod(self.Env.mods,cfg.global.Env.mods,mod.name,cfg.global);}}
function _scriptOnComplete(){loadQueque[url]=LOADED;if(mod.status!==ERROR){mixGlobal();if(mod.status!==ATTACHED){mod.status=LOADED;}
callback();}}},__buildPath:function(mod,base){var self=this,Config=self.Config;build("fullpath","path");build("cssfullpath","csspath");function build(fullpath,path){if(!mod[fullpath]&&mod[path]){mod[path]=normalDepModuleName(mod.name,mod[path]);mod[fullpath]=(base||Config.base)+mod[path];}
if(mod[fullpath]&&Config.debug){mod[fullpath]=mod[fullpath].replace(/-min/ig,EMPTY);}
if(mod[fullpath]&&!(mod[fullpath].match(/\?t=/))&&mod.tag){mod[fullpath]+="?t="+mod.tag;}}},getScript:function(url,success,charset){var isCSS=/\.css(?:\?|$)/i.test(url),node=doc.createElement(isCSS?'link':'script'),config=success,error,timeout,timer;function clearTimer(){if(timer){timer.cancel();timer=undef;}}
if(S.isPlainObject(config)){success=config.success;error=config.error;timeout=config.timeout;charset=config.charset;}
if(isCSS){node.href=url;node.rel='stylesheet';}else{node.src=url;node.async=true;}
if(charset){node.charset=charset;}
if(isCSS){S.isFunction(success)&&success.call(node);}else{scriptOnload(node,function(){clearTimer();S.isFunction(success)&&success.call(node);});}
if(S.isFunction(error)){if(doc.addEventListener){node.addEventListener("error",function(){clearTimer();error.call(node);},false);}
timer=S.later(function(){timer=undef;error();},(timeout||this.Config.timeout)*1000);}
head.insertBefore(node,head.firstChild);return node;}};mix(S,loader);var baseReg=/^(.*)(seed|kissy)(-min)?\.js[^/]*/i,baseTestReg=/(seed|kissy)(-min)?\.js/i;function getBaseUrl(script){var src=script.src,prefix=script.getAttribute('data-combo-prefix')||'??',sep=script.getAttribute('data-combo-sep')||',',parts=src.split(sep),base,part0=parts[0],index=part0.indexOf(prefix);if(index==-1){base=src.replace(baseReg,'$1');}else{base=part0.substring(0,index);var part01=part0.substring(index+2,part0.length);if(part01.match(baseTestReg)){base+=part01.replace(baseReg,'$1');}
else{S.each(parts,function(part){if(part.match(baseTestReg)){base+=part.replace(baseReg,'$1');return false;}});}}
if(!base.match(/^(http(s)?)|(file):/i)&&!startsWith(base,"/")){base=pagePath+base;}
return base;}
function startsWith(str,prefix){return str.lastIndexOf(prefix,0)==0;}
S.__initLoader=function(){var self=this,scripts=doc.getElementsByTagName('script'),currentScript=scripts[scripts.length-1],base=getBaseUrl(currentScript);self.Env.mods={};self.Env._loadQueue={};if(!self.Config.base){self.Config.base=normalBasePath(base);}
if(!self.Config.timeout){self.Config.timeout=10;}};S.__initLoader();S.each(loader,function(v,k){S.__APP_MEMBERS.push(k);});S.__APP_INIT_METHODS.push('__initLoader');})(KISSY);;KISSY.add('ua/base',function(){var ua=navigator.userAgent,EMPTY='',MOBILE='mobile',core=EMPTY,shell=EMPTY,m,o={},numberify=function(s){var c=0;return parseFloat(s.replace(/\./g,function(){return(c++===0)?'.':'';}));};if((m=ua.match(/AppleWebKit\/([\d.]*)/))&&m[1]){o[core='webkit']=numberify(m[1]);if((m=ua.match(/Chrome\/([\d.]*)/))&&m[1]){o[shell='chrome']=numberify(m[1]);}
else if((m=ua.match(/\/([\d.]*) Safari/))&&m[1]){o[shell='safari']=numberify(m[1]);}
if(/ Mobile\//.test(ua)){o[MOBILE]='apple';}
else if((m=ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))){o[MOBILE]=m[0].toLowerCase();}}
else{if((m=ua.match(/Presto\/([\d.]*)/))&&m[1]){o[core='presto']=numberify(m[1]);if((m=ua.match(/Opera\/([\d.]*)/))&&m[1]){o[shell='opera']=numberify(m[1]);if((m=ua.match(/Opera\/.* Version\/([\d.]*)/))&&m[1]){o[shell]=numberify(m[1]);}
if((m=ua.match(/Opera Mini[^;]*/))&&m){o[MOBILE]=m[0].toLowerCase();}
else if((m=ua.match(/Opera Mobi[^;]*/))&&m){o[MOBILE]=m[0];}}}else{if((m=ua.match(/MSIE\s([^;]*)/))&&m[1]){o[core='trident']=0.1;o[shell='ie']=numberify(m[1]);if((m=ua.match(/Trident\/([\d.]*)/))&&m[1]){o[core]=numberify(m[1]);}}else{if((m=ua.match(/Gecko/))){o[core='gecko']=0.1;if((m=ua.match(/rv:([\d.]*)/))&&m[1]){o[core]=numberify(m[1]);}
if((m=ua.match(/Firefox\/([\d.]*)/))&&m[1]){o[shell='firefox']=numberify(m[1]);}}}}}
o.core=core;o.shell=shell;o._numberify=numberify;return o;});KISSY.add('ua/extra',function(S,UA){var ua=navigator.userAgent,m,external,shell,o={},numberify=UA._numberify;if(m=ua.match(/360SE/)){o[shell='se360']=3;}
else if((m=ua.match(/Maxthon/))&&(external=window.external)){shell='maxthon';try{o[shell]=numberify(external['max_version']);}catch(ex){o[shell]=0.1;}}
else if(m=ua.match(/TencentTraveler\s([\d.]*)/)){o[shell='tt']=m[1]?numberify(m[1]):0.1;}
else if(m=ua.match(/TheWorld/)){o[shell='theworld']=3;}
else if(m=ua.match(/SE\s([\d.]*)/)){o[shell='sougou']=m[1]?numberify(m[1]):0.1;}
shell&&(o.shell=shell);S.mix(UA,o);return UA;},{requires:["ua/base"]});KISSY.add("ua",function(S,UA){return UA;},{requires:["ua/extra"]});;KISSY.add('node/attach',function(S,DOM,Event,Node,NodeList,undefined){var nodeTypeIs=DOM._nodeTypeIs,isKSNode=DOM._isKSNode,EventTarget=S.require("event/target"),NP=Node.prototype,NLP=NodeList.prototype,GET_DOM_NODE='getDOMNode',GET_DOM_NODES=GET_DOM_NODE+'s',HAS_NAME=1,ONLY_VAL=2,ALWAYS_NODE=4;function normalGetterSetter(isNodeList,args,valIndex,fn){var elems=this[isNodeList?GET_DOM_NODES:GET_DOM_NODE](),args2=[elems].concat(S.makeArray(args));if(args[valIndex]===undefined&&(valIndex!=1||S['isString'](args[0]))){return fn.apply(DOM,args2);}
fn.apply(DOM,args2);return this;}
function attach(methodNames,type){S.each(methodNames,function(methodName){S.each([NP,NLP],function(P,isNodeList){P[methodName]=(function(fn){switch(type){case HAS_NAME:return function(){return normalGetterSetter.call(this,isNodeList,arguments,1,fn);};case ONLY_VAL:return function(){return normalGetterSetter.call(this,isNodeList,arguments,0,fn);};case ALWAYS_NODE:return function(){var elems=this[isNodeList?GET_DOM_NODES:GET_DOM_NODE](),ret=fn.apply(DOM,[elems].concat(S.makeArray(arguments)));return ret?new(S.isArray(ret)?NodeList:Node)(ret):null;};default:return function(){var elems=this[isNodeList?GET_DOM_NODES:GET_DOM_NODE](),ret=fn.apply(DOM,[elems].concat(S.makeArray(arguments)));return ret===undefined?this:ret;};}})(DOM[methodName]);});});}
S.mix(NP,{one:function(selector){return Node.one(selector,this[0]);},all:function(selector){return NodeList.all(selector,this[0]);}});attach(['data','removeData'],HAS_NAME);attach(['hasClass','addClass','removeClass','replaceClass','toggleClass'],undefined);attach(['attr','removeAttr'],HAS_NAME);attach(['val','text'],ONLY_VAL);attach(['css'],HAS_NAME);attach(['width','height'],ONLY_VAL);attach(['offset'],ONLY_VAL);attach(['scrollIntoView'],undefined);attach(['parent','next','prev','siblings','children'],ALWAYS_NODE);attach(['contains'],undefined);attach(['html','unselectable'],ONLY_VAL);attach(['remove'],undefined);S.each(['insertBefore','insertAfter'],function(methodName){NP[methodName]=function(refNode){DOM[methodName].call(DOM,this[0],refNode);return this;};});S.each([NP,NLP],function(P,isNodeList){S.each(['append','prepend'],function(insertType){P[insertType]=function(html){return insert.call(this,html,isNodeList,insertType);};P[insertType+'To']=function(parent){return insertTo.call(this,parent,insertType);};});});function insert(html,isNodeList,insertType){if(html){S.each(this,function(elem){var domNode;if(isNodeList||S['isString'](html)){domNode=DOM.create(html);}else{if(nodeTypeIs(html,1)||nodeTypeIs(html,3))domNode=html;if(isKSNode(html))domNode=html[0];}
DOM[insertType](domNode,elem);});}
return this;}
function insertTo(parent,insertType){if((parent=DOM.get(parent))&&parent.appendChild){S.each(this,function(elem){DOM[insertType](elem,parent);});}
return this;}
function tagFn(fn,wrap){fn.__wrap=fn.__wrap||[];fn.__wrap.push(wrap);}
S.augment(Node,EventTarget,{fire:null,on:function(type,fn,scope){var self=this;function wrap(ev){var args=S.makeArray(arguments);args.shift();ev.target=new Node(ev.target);if(ev.relatedTarget){ev.relatedTarget=new Node(ev.relatedTarget);}
args.unshift(ev);return fn.apply(scope||self,args);}
Event.add(this[0],type,wrap,scope);tagFn(fn,wrap);return this;},detach:function(type,fn,scope){if(S.isFunction(fn)){var wraps=fn.__wrap||[];for(var i=0;i<wraps.length;i++){Event.remove(this[0],type,wraps[i],scope);}}else{Event.remove(this[0],type,fn,scope);}
return this;}});S.augment(NodeList,EventTarget,{fire:null});NP._supportSpecialEvent=true;S.each({on:"add",detach:"remove"},function(v,k){NLP[k]=function(type,fn,scope){for(var i=0;i<this.length;i++){this.item(i).on(type,fn,scope);}};});},{requires:["dom","event","node/node","node/nodelist"]});KISSY.add('node/node',function(S,DOM,undefined){function Node(html,props,ownerDocument){var self=this,domNode;if(!(self instanceof Node)){return new Node(html,props,ownerDocument);}
if(!html){self.length=0;return undefined;}
if(S['isString'](html)){domNode=DOM.create(html,props,ownerDocument);if(domNode.nodeType===11){return new(S.require("node/nodelist"))(domNode.childNodes);}}
else if(html instanceof Node){return html;}
else{domNode=html;}
self[0]=domNode;return undefined;}
Node.TYPE='-ks-Node';S.augment(Node,{length:1,getDOMNode:function(){return this[0];},nodeType:Node.TYPE});Node.one=function(selector,context){var elem=DOM.get(selector,context);return elem?new Node(elem,undefined,undefined):null;};return Node;},{requires:["dom"]});KISSY.add('node/nodelist',function(S,DOM,Node,undefined){var AP=Array.prototype,isElementNode=DOM._isElementNode;function NodeList(domNodes){if(!(this instanceof NodeList)){return new NodeList(domNodes);}
AP.push.apply(this,S.makeArray(domNodes)||[]);return undefined;}
S.mix(NodeList.prototype,{length:0,item:function(index){var ret=null,i,len;if(isElementNode(index)){for(i=0,len=this.length;i<len;i++){if(index===this[i]){index=i;break;}}}
if(isElementNode(this[index])){ret=new Node(this[index]);}
return ret;},getDOMNodes:function(){return AP.slice.call(this);},each:function(fn,context){var len=this.length,i=0,node;for(node=new Node(this[0]);i<len&&fn.call(context||node,node,i,this)!==false;node=new Node(this[++i])){}
return this;}});NodeList.all=function(selector,context){return new NodeList(DOM.query(selector,context,true));};return NodeList;},{requires:["dom","node/node"]});KISSY.add("node",function(S,Node,NodeList){Node.List=NodeList;return Node;},{requires:["node/node","node/nodelist","node/attach"]});;KISSY.add('event/base',function(S,DOM,EventObject,undefined){var doc=document,simpleAdd=doc.addEventListener?function(el,type,fn,capture){if(el.addEventListener){el.addEventListener(type,fn,!!capture);}}:function(el,type,fn){if(el.attachEvent){el.attachEvent('on'+type,fn);}},simpleRemove=doc.removeEventListener?function(el,type,fn,capture){if(el.removeEventListener){el.removeEventListener(type,fn,!!capture);}}:function(el,type,fn){if(el.detachEvent){el.detachEvent('on'+type,fn);}},EVENT_GUID='ksEventTargetId',SPACE=' ',guid=S.now(),cache={};var Event={EVENT_GUID:EVENT_GUID,special:{},add:function(target,type,fn,scope){if(batch('add',target,type,fn,scope))return;var id=getID(target),isNativeEventTarget,special,events,eventHandle,fixedType,capture;if(id===-1||!type||!S.isFunction(fn))return;if(!id){setID(target,(id=guid++));cache[id]={target:target,events:{}};}
events=cache[id].events;if(!events[type]){isNativeEventTarget=!target.isCustomEventTarget;special=((isNativeEventTarget||target._supportSpecialEvent)&&Event.special[type])||{};eventHandle=function(event,eventData){if(!event||!event.fixed){event=new EventObject(target,event,type);}
if(S.isPlainObject(eventData)){var typeo=event.type;S.mix(event,eventData);event.type=typeo;}
if(special['setup']){special['setup'](event);}
return(special.handle||Event._handle)(target,event);};events[type]={handle:eventHandle,listeners:[]};fixedType=special.fix||type;capture=special['capture'];if(special['init']){special['init'].apply(null,S.makeArray(arguments));}
if(isNativeEventTarget&&special.fix!==false){simpleAdd(target,fixedType,eventHandle,capture);}}
events[type].listeners.push({fn:fn,scope:scope||target});},__getListeners:function(target,type){var events=Event.__getEvents(target)||{},eventsType,listeners=[];if((eventsType=events[type])){listeners=eventsType.listeners;}
return listeners;},__getEvents:function(target){var id=getID(target),c,events;if(id===-1)return;if(!id||!(c=cache[id]))return;if(c.target!==target)return;events=c.events||{};return events;},remove:function(target,type,fn,scope){if(batch('remove',target,type,fn,scope))return;var events=Event.__getEvents(target),id=getID(target),eventsType,listeners,len,i,j,t,isNativeEventTarget=!target.isCustomEventTarget,special=((isNativeEventTarget||target._supportSpecialEvent)&&Event.special[type])||{};if(events===undefined)return;scope=scope||target;if((eventsType=events[type])){listeners=eventsType.listeners;len=listeners.length;if(S.isFunction(fn)&&len){for(i=0,j=0,t=[];i<len;++i){if(fn!==listeners[i].fn||scope!==listeners[i].scope){t[j++]=listeners[i];}}
eventsType.listeners=t;len=t.length;}
if(fn===undefined||len===0){if(!target.isCustomEventTarget){special=Event.special[type]||{};if(special.fix!==false)
simpleRemove(target,special.fix||type,eventsType.handle);}
delete events[type];}}
if(special.destroy){special.destroy.apply(null,S.makeArray(arguments));}
if(type===undefined||S.isEmptyObject(events)){for(type in events){Event.remove(target,type);}
delete cache[id];removeID(target);}},_handle:function(target,event){var listeners=Event.__getListeners(target,event.type);listeners=listeners.slice(0);var ret,gRet,i=0,len=listeners.length,listener;for(;i<len;++i){listener=listeners[i];ret=listener.fn.call(listener.scope,event);if(gRet!==false){gRet=ret;}
if(ret!==undefined){event.result=ret;if(ret===false){event.halt();}}
if(event.isImmediatePropagationStopped){break;}}
return gRet;},_getCache:function(id){return cache[id];},__getID:getID,_simpleAdd:simpleAdd,_simpleRemove:simpleRemove};Event.on=Event.add;function batch(methodName,targets,types,fn,scope){if(S['isString'](targets)){targets=DOM.query(targets);}
if(S.isArray(targets)){S.each(targets,function(target){Event[methodName](target,types,fn,scope);});return true;}
if((types=S.trim(types))&&types.indexOf(SPACE)>0){S.each(types.split(SPACE),function(type){Event[methodName](targets,type,fn,scope);});return true;}
return undefined;}
function getID(target){return isValidTarget(target)?DOM.data(target,EVENT_GUID):-1;}
function setID(target,id){if(isValidTarget(target)){DOM.data(target,EVENT_GUID,id);}}
function removeID(target){DOM.removeData(target,EVENT_GUID);}
function isValidTarget(target){return target&&target.nodeType!==3&&target.nodeType!==8;}
return Event;},{requires:["dom","event/object"]});KISSY.add('event/focusin',function(S,Event){if(document.addEventListener){S.each([{name:'focusin',fix:'focus'},{name:'focusout',fix:'blur'}],function(o){Event.special[o.name]={fix:o.fix,capture:true,setup:function(event){event.type=o.name;}}});}},{requires:["event/base"]});KISSY.add('event/mouseenter',function(S,Event,DOM,UA){if(!UA['ie']){S.each([{name:'mouseenter',fix:'mouseover'},{name:'mouseleave',fix:'mouseout'}],function(o){Event.special[o.name]={fix:o.fix,setup:function(event){event.type=o.name;},handle:function(el,event){if(DOM._isKSNode(el)){el=el[0];}
var parent=event.relatedTarget;try{while(parent&&parent!==el){parent=parent.parentNode;}
if(parent!==el){Event._handle(el,event);}}catch(e){S.log(e);}}}});}},{requires:["event/base","dom","ua"]});KISSY.add('event/object',function(S,undefined){var doc=document,props='altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which'.split(' ');function EventObject(currentTarget,domEvent,type){var self=this;self.currentTarget=currentTarget;self.originalEvent=domEvent||{};if(domEvent){self.type=domEvent.type;self._fix();}
else{self.type=type;self.target=currentTarget;}
self.currentTarget=currentTarget;self.fixed=true;}
S.augment(EventObject,{_fix:function(){var self=this,originalEvent=self.originalEvent,l=props.length,prop,ct=self.currentTarget,ownerDoc=(ct.nodeType===9)?ct:(ct.ownerDocument||doc);while(l){prop=props[--l];self[prop]=originalEvent[prop];}
if(!self.target){self.target=self.srcElement||doc;}
if(self.target.nodeType===3){self.target=self.target.parentNode;}
if(!self.relatedTarget&&self.fromElement){self.relatedTarget=(self.fromElement===self.target)?self.toElement:self.fromElement;}
if(self.pageX===undefined&&self.clientX!==undefined){var docEl=ownerDoc.documentElement,bd=ownerDoc.body;self.pageX=self.clientX+(docEl&&docEl.scrollLeft||bd&&bd.scrollLeft||0)-(docEl&&docEl.clientLeft||bd&&bd.clientLeft||0);self.pageY=self.clientY+(docEl&&docEl.scrollTop||bd&&bd.scrollTop||0)-(docEl&&docEl.clientTop||bd&&bd.clientTop||0);}
if(self.which===undefined){self.which=(self.charCode!==undefined)?self.charCode:self.keyCode;}
if(self.metaKey===undefined){self.metaKey=self.ctrlKey;}
if(!self.which&&self.button!==undefined){self.which=(self.button&1?1:(self.button&2?3:(self.button&4?2:0)));}},preventDefault:function(){var e=this.originalEvent;if(e.preventDefault){e.preventDefault();}
else{e.returnValue=false;}
this.isDefaultPrevented=true;},stopPropagation:function(){var e=this.originalEvent;if(e.stopPropagation){e.stopPropagation();}
else{e.cancelBubble=true;}
this.isPropagationStopped=true;},stopImmediatePropagation:function(){var e=this.originalEvent;if(e.stopImmediatePropagation){e.stopImmediatePropagation();}else{this.stopPropagation();}
this.isImmediatePropagationStopped=true;},halt:function(immediate){if(immediate){this.stopImmediatePropagation();}else{this.stopPropagation();}
this.preventDefault();}});return EventObject;});KISSY.add('event/target',function(S,Event,DOM,undefined){return{isCustomEventTarget:true,fire:function(type,eventData){var id=DOM.data(this,Event.EVENT_GUID)||-1,cache=Event._getCache(id)||{},events=cache.events||{},t=events[type];if(t&&S.isFunction(t.handle)){return t.handle(undefined,eventData);}},on:function(type,fn,scope){Event.add(this,type,fn,scope);return this;},detach:function(type,fn,scope){Event.remove(this,type,fn,scope);return this;}};},{requires:["event/base","dom"]});KISSY.add('event/valuechange',function(S,Event,DOM){var VALUE_CHANGE="valueChange";var KEY="event/valuechange";var history={};var poll={};var interval=50;function timestamp(node){var r=DOM.data(node,KEY);if(!r){r=(+new Date());DOM.data(node,KEY,r);}
return r;}
function untimestamp(node){DOM.removeData(node,KEY);}
function stopPoll(target){var t=timestamp(target);delete history[t];if(poll[t]){clearTimeout(poll[t]);delete poll[t];}}
function blur(ev){var target=ev.target;stopPoll(target);}
function startPoll(target){var t=timestamp(target);if(poll[t])return;poll[t]=setTimeout(function(){var v=target.value;if(v!==history[t]){Event._handle(target,{type:VALUE_CHANGE,preVal:history[t],newVal:v});history[t]=v;}
poll[t]=setTimeout(arguments.callee,interval);},interval);}
function startPollHandler(ev){var target=ev.target;if(ev.type=="focus"){var t=timestamp(target);history[t]=target.value;}
startPoll(target);}
function monitor(target){unmonitored(target);Event.on(target,"blur",blur);Event.on(target,"mousedown keyup keydown focus",startPollHandler);}
function unmonitored(target){stopPoll(target);Event.remove(target,"blur",blur);Event.remove(target,"mousedown keyup keydown focus",startPollHandler);untimestamp(target);}
Event.special[VALUE_CHANGE]={fix:false,init:function(target){var nodeName=target.nodeName.toLowerCase();if("input"==nodeName||"textarea"==nodeName)
monitor(target);},destroy:function(target,type){var events=Event.__getEvents(target);if(!events[type]){unmonitored(target);}}};},{requires:["event/base","dom"]});KISSY.add("event",function(S,Event,Target){Event.Target=Target;return Event;},{requires:["event/base","event/target","event/object","event/focusin","event/mouseenter"]});;KISSY.add("datalazyload",function(S,D){S.DataLazyload=D;return D;},{requires:["datalazyload/impl"]});;KISSY.add('datalazyload/impl',function(S,DOM,Event,undefined){var win=window,doc=document,IMG_SRC_DATA='data-ks-lazyload',AREA_DATA_CLS='ks-datalazyload',CUSTOM='-custom',MANUAL='manual',DISPLAY='display',DEFAULT='default',NONE='none',SCROLL='scroll',RESIZE='resize',defaultConfig={mod:MANUAL,diff:DEFAULT,placeholder:NONE,execScript:true};function DataLazyload(containers,config){var self=this;if(!(self instanceof DataLazyload)){return new DataLazyload(containers,config);}
if(config===undefined){config=containers;containers=[doc];}
if(!S.isArray(containers)){containers=[DOM.get(containers)||doc];}
self.containers=containers;self.config=S.merge(defaultConfig,config);self.callbacks={els:[],fns:[]};self._init();return undefined;}
S.augment(DataLazyload,{_init:function(){var self=this;self.threshold=self._getThreshold();self._filterItems();self._initLoadEvent();},_filterItems:function(){var self=this,containers=self.containers,n,N,imgs,areaes,i,img,lazyImgs=[],lazyAreas=[];for(n=0,N=containers.length;n<N;++n){imgs=DOM.query('img',containers[n]);lazyImgs=lazyImgs.concat(S.filter(imgs,self._filterImg,self));areaes=DOM.query('textarea',containers[n]);lazyAreas=lazyAreas.concat(S.filter(areaes,self._filterArea,self));}
self.images=lazyImgs;self.areaes=lazyAreas;},_filterImg:function(img){var self=this,dataSrc=img.getAttribute(IMG_SRC_DATA),threshold=self.threshold,placeholder=self.config.placeholder,isManualMod=self.config.mod===MANUAL;if(isManualMod){if(dataSrc){if(placeholder!==NONE){img.src=placeholder;}
return true;}}
else{if(DOM.offset(img).top>threshold&&!dataSrc){DOM.attr(img,IMG_SRC_DATA,img.src);if(placeholder!==NONE){img.src=placeholder;}else{img.removeAttribute('src');}
return true;}}},_filterArea:function(area){return DOM.hasClass(area,AREA_DATA_CLS);},_initLoadEvent:function(){var timer,self=this,resizeHandler;Event.on(win,SCROLL,loader);Event.on(win,RESIZE,(resizeHandler=function(){self.threshold=self._getThreshold();loader();}));if(self._getItemsLength()){S.ready(function(){loadItems();});}
function loader(){if(timer)return;timer=S.later(function(){loadItems();timer=null;},100);}
function loadItems(){self._loadItems();if(self._getItemsLength()===0){Event.remove(win,SCROLL,loader);Event.remove(win,RESIZE,resizeHandler);}}},_loadItems:function(){var self=this;self._loadImgs();self._loadAreas();self._fireCallbacks();},_loadImgs:function(){var self=this;self.images=S.filter(self.images,self._loadImg,self);},_loadImg:function(img){var self=this,scrollTop=DOM.scrollTop(),threshold=self.threshold+scrollTop,offset=DOM.offset(img);if(offset.top<=threshold){self._loadImgSrc(img);}else{return true;}},_loadImgSrc:function(img,flag){flag=flag||IMG_SRC_DATA;var dataSrc=img.getAttribute(flag);if(dataSrc&&img.src!=dataSrc){img.src=dataSrc;img.removeAttribute(flag);}},_loadAreas:function(){var self=this;self.areaes=S.filter(self.areaes,self._loadArea,self);},_loadArea:function(area){var self=this,top,isHidden=DOM.css(area,DISPLAY)===NONE;top=DOM.offset(isHidden?area.parentNode:area).top;if(top<=self.threshold+DOM.scrollTop()){self._loadAreaData(area.parentNode,area,self.config.execScript);}else{return true;}},_loadAreaData:function(container,area,execScript){area.style.display=NONE;area.className='';var content=DOM.create('<div>');container.insertBefore(content,area);DOM.html(content,area.value,execScript===undefined?true:execScript);},_fireCallbacks:function(){var self=this,callbacks=self.callbacks,els=callbacks.els,fns=callbacks.fns,scrollTop=DOM.scrollTop(),threshold=self.threshold+scrollTop,i,el,fn,remainEls=[],remainFns=[];for(i=0;(el=els[i])&&(fn=fns[i++]);){if(DOM.offset(el).top<=threshold){fn.call(el);}else{remainEls.push(el);remainFns.push(fn);}}
callbacks.els=remainEls;callbacks.fns=remainFns;},addCallback:function(el,fn){var callbacks=this.callbacks;el=DOM.get(el);if(el&&S.isFunction(fn)){callbacks.els.push(el);callbacks.fns.push(fn);}},_getThreshold:function(){var diff=this.config.diff,vh=DOM['viewportHeight']();if(diff===DEFAULT)return 2*vh;else return vh+(+diff);},_getItemsLength:function(){var self=this;return self.images.length+self.areaes.length+self.callbacks.els.length;},loadCustomLazyData:function(containers,type){var self=this,area,imgs;if(!S.isArray(containers)){containers=[DOM.get(containers)];}
S.each(containers,function(container){switch(type){case'img-src':if(container.nodeName==='IMG'){imgs=[container];}else{imgs=DOM.query('img',container);}
S.each(imgs,function(img){self._loadImgSrc(img,IMG_SRC_DATA+CUSTOM);});break;default:area=DOM.get('textarea',container);if(area&&DOM.hasClass(area,AREA_DATA_CLS+CUSTOM)){self._loadAreaData(container,area);}}});}});S.mix(DataLazyload,DataLazyload.prototype,true,['loadCustomLazyData','_loadImgSrc','_loadAreaData']);return DataLazyload;},{requires:['dom','event']});;KISSY.add('dom/attr',function(S,DOM,UA,undefined){var doc=document,docElement=doc.documentElement,oldIE=!docElement.hasAttribute,TEXT=docElement.textContent!==undefined?'textContent':'innerText',SELECT='select',EMPTY='',isElementNode=DOM._isElementNode,isTextNode=function(elem){return DOM._nodeTypeIs(elem,3);},RE_SPECIAL_ATTRS=/^(?:href|src|style)/,RE_NORMALIZED_ATTRS=/^(?:href|src|colspan|rowspan)/,RE_RETURN=/\r/g,RE_RADIO_CHECK=/^(?:radio|checkbox)/,CUSTOM_ATTRS={readonly:'readOnly'},attrFn={val:1,css:1,html:1,text:1,data:1,width:1,height:1,offset:1};var attrNormalizers={tabindex:{getter:function(el){return el.tabIndex;},setter:function(el,val){if(isNaN(parseInt(val))){el.removeAttribute("tabindex");el.removeAttribute("tabIndex");}else{el.tabIndex=val;}}},style:{getter:function(el){return el.style.cssText;},setter:function(el,val){el.style.cssText=val;}},checked:{setter:function(el,val){el.checked=!!val;}},disabled:{setter:function(el,val){el.disabled=!!val;}}};if(oldIE){S.mix(CUSTOM_ATTRS,{'for':'htmlFor','class':'className'});}
var attrNormalizers={tabindex:{getter:function(el){return el.tabIndex;},setter:function(el,val){if(isNaN(parseInt(val))){el.removeAttribute("tabindex");el.removeAttribute("tabIndex");}else{el.tabIndex=val;}}},style:{getter:function(el){return el.style.cssText;},setter:function(el,val){el.style.cssText=val;}},checked:{setter:function(el,val){el.checked=!!val;}},disabled:{setter:function(el,val){el.disabled=!!val;}}};S.mix(DOM,{attr:function(selector,name,val,pass){if(S.isPlainObject(name)){pass=val;for(var k in name){DOM.attr(selector,k,name[k],pass);}
return;}
if(!(name=S.trim(name)))return;name=name.toLowerCase();if(pass&&attrFn[name]){return DOM[name](selector,val);}
name=CUSTOM_ATTRS[name]||name;var attrNormalizer=attrNormalizers[name];if(val===undefined){var el=DOM.get(selector);if(!isElementNode(el)){return undefined;}
if(attrNormalizer&&attrNormalizer.getter){return attrNormalizer.getter(el);}
var ret;if(!RE_SPECIAL_ATTRS.test(name)){ret=el[name];}
if(ret===undefined){ret=el.getAttribute(name);}
if(oldIE){if(RE_NORMALIZED_ATTRS.test(name)){ret=el.getAttribute(name,2);}}
return ret===null?undefined:ret;}
S.each(DOM.query(selector),function(el){if(!isElementNode(el)){return;}
if(attrNormalizer&&attrNormalizer.setter){attrNormalizer.setter(el,val);}else{el.setAttribute(name,EMPTY+val);}});},removeAttr:function(selector,name){name=name.toLowerCase();S.each(DOM.query(selector),function(el){if(isElementNode(el)){DOM.attr(el,name,EMPTY);el.removeAttribute(name);}});},hasAttr:oldIE?function(selector,name){name=name.toLowerCase();var el=DOM.get(selector);var $attr=el.getAttributeNode(name);return!!($attr&&$attr.specified);}:function(selector,name){name=name.toLowerCase();var el=DOM.get(selector);return el.hasAttribute(name);},val:function(selector,value){if(value===undefined){var el=DOM.get(selector);if(!isElementNode(el)){return undefined;}
if(nodeNameIs('option',el)){return(el.attributes.value||{}).specified?el.value:el.text;}
if(nodeNameIs(SELECT,el)){var index=el.selectedIndex,options=el.options;if(index<0){return null;}
else if(el.type==='select-one'){return DOM.val(options[index]);}
var ret=[],i=0,len=options.length;for(;i<len;++i){if(options[i].selected){ret.push(DOM.val(options[i]));}}
return ret;}
if(UA['webkit']&&RE_RADIO_CHECK.test(el.type)){return el.getAttribute('value')===null?'on':el.value;}
return(el.value||EMPTY).replace(RE_RETURN,EMPTY);}
S.each(DOM.query(selector),function(el){if(nodeNameIs(SELECT,el)){if(S['isNumber'](value)){value+=EMPTY;}
var vals=S.makeArray(value),opts=el.options,opt;for(i=0,len=opts.length;i<len;++i){opt=opts[i];opt.selected=S.inArray(DOM.val(opt),vals);}
if(!vals.length){el.selectedIndex=-1;}}
else if(isElementNode(el)){el.value=value;}});},text:function(selector,val){if(val===undefined){var el=DOM.get(selector);if(isElementNode(el)){return el[TEXT]||EMPTY;}
else if(isTextNode(el)){return el.nodeValue;}}
else{S.each(DOM.query(selector),function(el){if(isElementNode(el)){el[TEXT]=val;}
else if(isTextNode(el)){el.nodeValue=val;}});}}});function nodeNameIs(val,el){return el&&el.nodeName.toUpperCase()===val.toUpperCase();}
return DOM;},{requires:["dom/base","ua"]});KISSY.add('dom/base',function(S,undefined){function nodeTypeIs(node,val){return node&&node.nodeType===val;}
return{_isElementNode:function(elem){return nodeTypeIs(elem,1);},_isKSNode:function(elem){var Node=S.require("node/node");return Node&&nodeTypeIs(elem,Node.TYPE);},_getWin:function(elem){return(elem&&('scrollTo'in elem)&&elem['document'])?elem:nodeTypeIs(elem,9)?elem.defaultView||elem.parentWindow:elem===undefined?window:false;},_nodeTypeIs:nodeTypeIs};});KISSY.add('dom/class',function(S,DOM,undefined){var SPACE=' ',REG_SPLIT=/[\.\s]\s*\.?/,REG_CLASS=/[\n\t]/g;S.mix(DOM,{hasClass:function(selector,value){return batch(selector,value,function(elem,classNames,cl){var elemClass=elem.className;if(elemClass){var className=SPACE+elemClass+SPACE,j=0,ret=true;for(;j<cl;j++){if(className.indexOf(SPACE+classNames[j]+SPACE)<0){ret=false;break;}}
if(ret)return true;}},true);},addClass:function(selector,value){batch(selector,value,function(elem,classNames,cl){var elemClass=elem.className;if(!elemClass){elem.className=value;}
else{var className=SPACE+elemClass+SPACE,setClass=elemClass,j=0;for(;j<cl;j++){if(className.indexOf(SPACE+classNames[j]+SPACE)<0){setClass+=SPACE+classNames[j];}}
elem.className=S.trim(setClass);}},undefined);},removeClass:function(selector,value){batch(selector,value,function(elem,classNames,cl){var elemClass=elem.className;if(elemClass){if(!cl){elem.className='';}
else{var className=(SPACE+elemClass+SPACE).replace(REG_CLASS,SPACE),j=0,needle;for(;j<cl;j++){needle=SPACE+classNames[j]+SPACE;while(className.indexOf(needle)>=0){className=className.replace(needle,SPACE);}}
elem.className=S.trim(className);}}},undefined);},replaceClass:function(selector,oldClassName,newClassName){DOM.removeClass(selector,oldClassName);DOM.addClass(selector,newClassName);},toggleClass:function(selector,value,state){var isBool=S['isBoolean'](state),has;batch(selector,value,function(elem,classNames,cl){var j=0,className;for(;j<cl;j++){className=classNames[j];has=isBool?!state:DOM.hasClass(elem,className);DOM[has?'removeClass':'addClass'](elem,className);}},undefined);}});function batch(selector,value,fn,resultIsBool){if(!(value=S.trim(value)))return resultIsBool?false:undefined;var elems=DOM.query(selector),i=0,len=elems.length,classNames=value.split(REG_SPLIT),elem,ret;for(;i<len;i++){elem=elems[i];if(DOM._isElementNode(elem)){ret=fn(elem,classNames,classNames.length);if(ret!==undefined)return ret;}}
if(resultIsBool)return false;return undefined;}
return DOM;},{requires:["dom/base"]});KISSY.add('dom/create',function(S,DOM,UA,undefined){var doc=document,ie=UA['ie'],nodeTypeIs=DOM._nodeTypeIs,isElementNode=DOM._isElementNode,isKSNode=DOM._isKSNode,DIV='div',PARENT_NODE='parentNode',DEFAULT_DIV=doc.createElement(DIV),RE_TAG=/<(\w+)/,RE_SCRIPT=/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/ig,RE_SIMPLE_TAG=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,RE_SCRIPT_SRC=/\ssrc=(['"])(.*?)\1/i,RE_SCRIPT_CHARSET=/\scharset=(['"])(.*?)\1/i;S.mix(DOM,{create:function(html,props,ownerDoc){if(nodeTypeIs(html,1)||nodeTypeIs(html,3))return cloneNode(html);if(isKSNode(html))return cloneNode(html[0]);if(!(html=S.trim(html)))return null;var ret=null,creators=DOM._creators,m,tag=DIV,k,nodes;if((m=RE_SIMPLE_TAG.exec(html))){ret=(ownerDoc||doc).createElement(m[1]);}
else{if((m=RE_TAG.exec(html))&&(k=m[1])&&S.isFunction(creators[(k=k.toLowerCase())])){tag=k;}
nodes=creators[tag](html,ownerDoc).childNodes;if(nodes.length===1){ret=nodes[0][PARENT_NODE].removeChild(nodes[0]);}
else{ret=nl2frag(nodes,ownerDoc||doc);}}
return attachProps(ret,props);},_creators:{div:function(html,ownerDoc){var frag=ownerDoc?ownerDoc.createElement(DIV):DEFAULT_DIV;frag.innerHTML=html;return frag;}},html:function(selector,val,loadScripts,callback){if(val===undefined){var el=DOM.get(selector);if(isElementNode(el)){return el.innerHTML;}}
else{S.each(DOM.query(selector),function(elem){if(isElementNode(elem)){setHTML(elem,val,loadScripts,callback);}});}},remove:function(selector){S.each(DOM.query(selector),function(el){if(isElementNode(el)&&el.parentNode){el.parentNode.removeChild(el);}});}});function attachProps(elem,props){if(isElementNode(elem)&&S.isPlainObject(props)){DOM.attr(elem,props,true);}
return elem;}
function nl2frag(nodes,ownerDoc){var ret=null,i,len;if(nodes&&(nodes.push||nodes.item)&&nodes[0]){ownerDoc=ownerDoc||nodes[0].ownerDocument;ret=ownerDoc.createDocumentFragment();if(nodes.item){nodes=S.makeArray(nodes);}
for(i=0,len=nodes.length;i<len;i++){ret.appendChild(nodes[i]);}}
else{S.log('Unable to convert '+nodes+' to fragment.');}
return ret;}
function cloneNode(elem){var ret=elem.cloneNode(true);if(UA['ie']<8)ret.innerHTML=elem.innerHTML;return ret;}
function setHTML(elem,html,loadScripts,callback){if(!loadScripts){setHTMLSimple(elem,html);S.isFunction(callback)&&callback();return;}
var id=S.guid('ks-tmp-'),re_script=new RegExp(RE_SCRIPT);html+='<span id="'+id+'"></span>';S.available(id,function(){var hd=DOM.get('head'),match,attrs,srcMatch,charsetMatch,t,s,text;re_script.lastIndex=0;while((match=re_script.exec(html))){attrs=match[1];srcMatch=attrs?attrs.match(RE_SCRIPT_SRC):false;if(srcMatch&&srcMatch[2]){s=doc.createElement('script');s.src=srcMatch[2];if((charsetMatch=attrs.match(RE_SCRIPT_CHARSET))&&charsetMatch[2]){s.charset=charsetMatch[2];}
s.async=true;hd.appendChild(s);}
else if((text=match[2])&&text.length>0){S.globalEval(text);}}
(t=doc.getElementById(id))&&DOM.remove(t);S.isFunction(callback)&&callback();});setHTMLSimple(elem,html);}
function setHTMLSimple(elem,html){html=(html+'').replace(RE_SCRIPT,'');try{elem.innerHTML=html;}
catch(ex){while(elem.firstChild){elem.removeChild(elem.firstChild);}
if(html)elem.appendChild(DOM.create(html));}}
if(ie||UA['gecko']||UA['webkit']){var creators=DOM._creators,create=DOM.create,TABLE_OPEN='<table>',TABLE_CLOSE='</table>',RE_TBODY=/(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/,creatorsMap={option:'select',td:'tr',tr:'tbody',tbody:'table',col:'colgroup',legend:'fieldset'};for(var p in creatorsMap){(function(tag){creators[p]=function(html,ownerDoc){return create('<'+tag+'>'+html+'</'+tag+'>',null,ownerDoc);}})(creatorsMap[p]);}
if(ie){creators.script=function(html,ownerDoc){var frag=ownerDoc?ownerDoc.createElement(DIV):DEFAULT_DIV;frag.innerHTML='-'+html;frag.removeChild(frag.firstChild);return frag;};if(ie<8){creators.tbody=function(html,ownerDoc){var frag=create(TABLE_OPEN+html+TABLE_CLOSE,null,ownerDoc),tbody=frag.children['tags']('tbody')[0];if(frag.children.length>1&&tbody&&!RE_TBODY.test(html)){tbody[PARENT_NODE].removeChild(tbody);}
return frag;};}}
S.mix(creators,{optgroup:creators.option,th:creators.td,thead:creators.tbody,tfoot:creators.tbody,caption:creators.tbody,colgroup:creators.tbody});}
return DOM;},{requires:["dom/base","ua"]});KISSY.add('dom/data',function(S,DOM,undefined){var win=window,expando='_ks_data_'+S.now(),dataCache={},winDataCache={},noData={EMBED:1,OBJECT:1,APPLET:1};S.mix(DOM,{data:function(selector,name,data){if(S.isPlainObject(name)){for(var k in name){DOM.data(selector,k,name[k]);}
return;}
if(data===undefined){var elem=DOM.get(selector),isNode,cache,key,thisCache;if(!elem||noData[elem.nodeName])return;if(elem==win)elem=winDataCache;isNode=checkIsNode(elem);cache=isNode?dataCache:elem;key=isNode?elem[expando]:expando;thisCache=cache[key];if(S['isString'](name)&&thisCache){return thisCache[name];}
return thisCache;}
else{DOM.query(selector).each(function(elem){if(!elem||noData[elem.nodeName])return;if(elem==win)elem=winDataCache;var cache=dataCache,key;if(!checkIsNode(elem)){key=expando;cache=elem;}
else if(!(key=elem[expando])){key=elem[expando]=S.guid();}
if(name&&data!==undefined){if(!cache[key])cache[key]={};cache[key][name]=data;}});}},removeData:function(selector,name){DOM.query(selector).each(function(elem){if(!elem)return;if(elem==win)elem=winDataCache;var key,cache=dataCache,thisCache,isNode=checkIsNode(elem);if(!isNode){cache=elem;key=expando;}else{key=elem[expando];}
if(!key)return;thisCache=cache[key];if(name){if(thisCache){delete thisCache[name];if(S.isEmptyObject(thisCache)){DOM.removeData(elem);}}}
else{if(!isNode){try{delete elem[expando];}catch(ex){}}else if(elem.removeAttribute){elem.removeAttribute(expando);}
if(isNode){delete cache[key];}}});}});function checkIsNode(elem){return elem&&elem.nodeType;}
return DOM;},{requires:["dom/base"]});KISSY.add('dom/insertion',function(S,DOM){var PARENT_NODE='parentNode',NEXT_SIBLING='nextSibling';S.mix(DOM,{insertBefore:function(newNode,refNode){if((newNode=DOM.get(newNode))&&(refNode=DOM.get(refNode))&&refNode[PARENT_NODE]){refNode[PARENT_NODE].insertBefore(newNode,refNode);}
return newNode;},insertAfter:function(newNode,refNode){if((newNode=DOM.get(newNode))&&(refNode=DOM.get(refNode))&&refNode[PARENT_NODE]){if(refNode[NEXT_SIBLING]){refNode[PARENT_NODE].insertBefore(newNode,refNode[NEXT_SIBLING]);}else{refNode[PARENT_NODE].appendChild(newNode);}}
return newNode;},append:function(node,parent){if((node=DOM.get(node))&&(parent=DOM.get(parent))){if(parent.appendChild){parent.appendChild(node);}}},prepend:function(node,parent){if((node=DOM.get(node))&&(parent=DOM.get(parent))){if(parent.firstChild){DOM.insertBefore(node,parent.firstChild);}else{parent.appendChild(node);}}}});return DOM;},{requires:["dom/base"]});KISSY.add('dom/offset',function(S,DOM,UA,undefined){var win=window,doc=document,isElementNode=DOM._isElementNode,nodeTypeIs=DOM._nodeTypeIs,getWin=DOM._getWin,isStrict=doc.compatMode==='CSS1Compat',MAX=Math.max,PARSEINT=parseInt,POSITION='position',RELATIVE='relative',DOCUMENT='document',BODY='body',DOC_ELEMENT='documentElement',OWNER_DOCUMENT='ownerDocument',VIEWPORT='viewport',SCROLL='scroll',CLIENT='client',LEFT='left',TOP='top',SCROLL_TO='scrollTo',SCROLL_LEFT=SCROLL+'Left',SCROLL_TOP=SCROLL+'Top',GET_BOUNDING_CLIENT_RECT='getBoundingClientRect';S.mix(DOM,{offset:function(elem,val){if(!(elem=DOM.get(elem))||!elem[OWNER_DOCUMENT])return null;if(val===undefined){return getOffset(elem);}
setOffset(elem,val);},scrollIntoView:function(elem,container,top,hscroll){if(!(elem=DOM.get(elem))||!elem[OWNER_DOCUMENT])return;hscroll=hscroll===undefined?true:!!hscroll;top=top===undefined?true:!!top;if(!container||container===win){return elem.scrollIntoView(top);}
container=DOM.get(container);if(nodeTypeIs(container,9)){container=getWin(container);}
var isWin=container&&(SCROLL_TO in container)&&container[DOCUMENT],elemOffset=DOM.offset(elem),containerOffset=isWin?{left:DOM.scrollLeft(container),top:DOM.scrollTop(container)}:DOM.offset(container),diff={left:elemOffset[LEFT]-containerOffset[LEFT],top:elemOffset[TOP]-containerOffset[TOP]},ch=isWin?DOM['viewportHeight'](container):container.clientHeight,cw=isWin?DOM['viewportWidth'](container):container.clientWidth,cl=DOM[SCROLL_LEFT](container),ct=DOM[SCROLL_TOP](container),cr=cl+cw,cb=ct+ch,eh=elem.offsetHeight,ew=elem.offsetWidth,l=diff.left+cl-(PARSEINT(DOM.css(container,'borderLeftWidth'))||0),t=diff.top+ct-(PARSEINT(DOM.css(container,'borderTopWidth'))||0),r=l+ew,b=t+eh,t2,l2;if(eh>ch||t<ct||top){t2=t;}else if(b>cb){t2=b-ch;}
if(hscroll){if(ew>cw||l<cl||top){l2=l;}else if(r>cr){l2=r-cw;}}
if(isWin){if(t2!==undefined||l2!==undefined){container[SCROLL_TO](l2,t2);}}else{if(t2!==undefined){container[SCROLL_TOP]=t2;}
if(l2!==undefined){container[SCROLL_LEFT]=l2;}}}});S.each(['Left','Top'],function(name,i){var method=SCROLL+name;DOM[method]=function(elem){var ret=0,w=getWin(elem),d;if(w&&(d=w[DOCUMENT])){ret=w[i?'pageYOffset':'pageXOffset']||d[DOC_ELEMENT][method]||d[BODY][method]}
else if(isElementNode((elem=DOM.get(elem)))){ret=elem[method];}
return ret;}});S.each(['Width','Height'],function(name){DOM['doc'+name]=function(refDoc){var d=refDoc||doc;return MAX(isStrict?d[DOC_ELEMENT][SCROLL+name]:d[BODY][SCROLL+name],DOM[VIEWPORT+name](d));};DOM[VIEWPORT+name]=function(refWin){var prop='inner'+name,w=getWin(refWin),d=w[DOCUMENT];return(prop in w)?w[prop]:(isStrict?d[DOC_ELEMENT][CLIENT+name]:d[BODY][CLIENT+name]);}});function getOffset(elem){var box,x=0,y=0,w=getWin(elem[OWNER_DOCUMENT]);if(elem[GET_BOUNDING_CLIENT_RECT]){box=elem[GET_BOUNDING_CLIENT_RECT]();x=box[LEFT];y=box[TOP];if(UA.mobile!=='apple'){x+=DOM[SCROLL_LEFT](w);y+=DOM[SCROLL_TOP](w);}}
return{left:x,top:y};}
function setOffset(elem,offset){if(DOM.css(elem,POSITION)==='static'){elem.style[POSITION]=RELATIVE;}
var old=getOffset(elem),ret={},current,key;for(key in offset){current=PARSEINT(DOM.css(elem,key),10)||0;ret[key]=current+offset[key]-old[key];}
DOM.css(elem,ret);}
return DOM;},{requires:["dom/base","ua"]});KISSY.add('dom/selector',function(S,DOM,undefined){var doc=document,SPACE=' ',ANY='*',GET_DOM_NODE='getDOMNode',GET_DOM_NODES=GET_DOM_NODE+'s',REG_ID=/^#[\w-]+$/,REG_QUERY=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;function query(selector,context){var match,t,ret=[],id,tag,sizzle=S.require("sizzle"),cls;context=tuneContext(context);if(S['isString'](selector)){selector=S.trim(selector);if(REG_ID.test(selector)){t=getElementById(selector.slice(1),context);if(t)ret=[t];}
else if((match=REG_QUERY.exec(selector))){id=match[1];tag=match[2];cls=match[3];if((context=id?getElementById(id,context):context)){if(cls){if(!id||selector.indexOf(SPACE)!==-1){ret=getElementsByClassName(cls,tag,context);}
else{t=getElementById(id,context);if(t&&DOM.hasClass(t,cls)){ret=[t];}}}
else if(tag){ret=getElementsByTagName(tag,context);}}}
else if(sizzle){ret=sizzle(selector,context);}
else{error(selector);}}
else if(selector&&(selector[GET_DOM_NODE]||selector[GET_DOM_NODES])){ret=selector[GET_DOM_NODE]?[selector[GET_DOM_NODE]()]:selector[GET_DOM_NODES]();}
else if(selector&&(S.isArray(selector)||isNodeList(selector))){ret=selector;}
else if(selector){ret=[selector];}
if(isNodeList(ret)){ret=S.makeArray(ret);}
ret.each=function(fn,context){return S.each(ret,fn,context);};return ret;}
function isNodeList(o){return o&&!o.nodeType&&o.item&&!o.setTimeout;}
function tuneContext(context){if(context===undefined){context=doc;}
else if(S['isString'](context)&&REG_ID.test(context)){context=getElementById(context.slice(1),doc);}
else if(context&&context.nodeType!==1&&context.nodeType!==9){context=null;}
return context;}
function getElementById(id,context){if(context.nodeType!==9){context=context.ownerDocument;}
return context.getElementById(id);}
function getElementsByTagName(tag,context){return context.getElementsByTagName(tag);}
(function(){var div=doc.createElement('div');div.appendChild(doc.createComment(''));if(div.getElementsByTagName(ANY).length>0){getElementsByTagName=function(tag,context){var ret=context.getElementsByTagName(tag);if(tag===ANY){var t=[],i=0,j=0,node;while((node=ret[i++])){if(node.nodeType===1){t[j++]=node;}}
ret=t;}
return ret;};}})();function getElementsByClassName(cls,tag,context){var els=context.getElementsByClassName(cls),ret=els,i=0,j=0,len=els.length,el;if(tag&&tag!==ANY){ret=[];tag=tag.toUpperCase();for(;i<len;++i){el=els[i];if(el.tagName===tag){ret[j++]=el;}}}
return ret;}
if(!doc.getElementsByClassName){if(doc.querySelectorAll){getElementsByClassName=function(cls,tag,context){return context.querySelectorAll((tag?tag:'')+'.'+cls);}}
else{getElementsByClassName=function(cls,tag,context){var els=context.getElementsByTagName(tag||ANY),ret=[],i=0,j=0,len=els.length,el,t;cls=SPACE+cls+SPACE;for(;i<len;++i){el=els[i];t=el.className;if(t&&(SPACE+t+SPACE).indexOf(cls)>-1){ret[j++]=el;}}
return ret;}}}
function error(msg){S.error('Unsupported selector: '+msg);}
S.mix(DOM,{query:query,get:function(selector,context){return query(selector,context)[0]||null;},filter:function(selector,filter,context){var elems=query(selector,context),sizzle=S.require("sizzle"),match,tag,cls,ret=[];if(S['isString'](filter)&&(match=REG_QUERY.exec(filter))&&!match[1]){tag=match[2];cls=match[3];filter=function(elem){return!((tag&&elem.tagName!==tag.toUpperCase())||(cls&&!DOM.hasClass(elem,cls)));}}
if(S.isFunction(filter)){ret=S.filter(elems,filter);}
else if(filter&&sizzle){ret=sizzle._filter(selector,filter+'');}
else{error(filter);}
return ret;},test:function(selector,filter,context){var elems=query(selector,context);return elems.length&&(DOM.filter(elems,filter,context).length===elems.length);}});return DOM;},{requires:["dom/base"]});KISSY.add('dom/style-ie',function(S,DOM,UA,Style,undefined){if(!UA['ie'])return DOM;var doc=document,docElem=doc.documentElement,OPACITY='opacity',FILTER='filter',FILTERS='filters',CURRENT_STYLE='currentStyle',RUNTIME_STYLE='runtimeStyle',LEFT='left',PX='px',CUSTOM_STYLES=DOM._CUSTOM_STYLES,RE_NUMPX=/^-?\d+(?:px)?$/i,RE_NUM=/^-?\d/,RE_WH=/^(?:width|height)$/;try{if(docElem.style[OPACITY]==undefined&&docElem[FILTERS]){CUSTOM_STYLES[OPACITY]={get:function(elem){var val=100;try{val=elem[FILTERS]['DXImageTransform.Microsoft.Alpha'][OPACITY];}
catch(e){try{val=elem[FILTERS]('alpha')[OPACITY];}catch(ex){}}
return val/100+'';},set:function(elem,val){var style=elem.style,currentFilter=(elem.currentStyle||0).filter||'';style.zoom=1;if(currentFilter){currentFilter=S.trim(currentFilter.replace(/alpha\(opacity[=:][^)]+\),?/ig,''));}
if(currentFilter&&val!=1){currentFilter+=', ';}
style[FILTER]=currentFilter+(val!=1?'alpha('+OPACITY+'='+val*100+')':'');}};}}
catch(ex){S.log('IE filters ActiveX is disabled. ex = '+ex);}
if(!(doc.defaultView||{}).getComputedStyle&&docElem[CURRENT_STYLE]){DOM._getComputedStyle=function(elem,name){var style=elem.style,ret=elem[CURRENT_STYLE][name];if(RE_WH.test(name)){ret=DOM[name](elem)+PX;}
else if((!RE_NUMPX.test(ret)&&RE_NUM.test(ret))){var left=style[LEFT],rsLeft=elem[RUNTIME_STYLE][LEFT];elem[RUNTIME_STYLE][LEFT]=elem[CURRENT_STYLE][LEFT];style[LEFT]=name==='fontSize'?'1em':(ret||0);ret=style['pixelLeft']+PX;style[LEFT]=left;elem[RUNTIME_STYLE][LEFT]=rsLeft;}
return ret;}}
return DOM;},{requires:["./base","ua","./style"]});KISSY.add('dom/style',function(S,DOM,UA,undefined){var doc=document,docElem=doc.documentElement,STYLE='style',FLOAT='float',CSS_FLOAT='cssFloat',STYLE_FLOAT='styleFloat',WIDTH='width',HEIGHT='height',AUTO='auto',DISPLAY='display',NONE='none',PARSEINT=parseInt,RE_LT=/^(?:left|top)/,RE_NEED_UNIT=/^(?:width|height|top|left|right|bottom|margin|padding)/i,RE_DASH=/-([a-z])/ig,CAMELCASE_FN=function(all,letter){return letter.toUpperCase();},EMPTY='',DEFAULT_UNIT='px',CUSTOM_STYLES={},defaultDisplay={};S.mix(DOM,{_CUSTOM_STYLES:CUSTOM_STYLES,_getComputedStyle:function(elem,name){var val='',d=elem.ownerDocument;if(elem[STYLE]){val=d.defaultView.getComputedStyle(elem,null)[name];}
return val;},css:function(selector,name,val){if(S.isPlainObject(name)){for(var k in name){DOM.css(selector,k,name[k]);}
return;}
if(name.indexOf('-')>0){name=name.replace(RE_DASH,CAMELCASE_FN);}
name=CUSTOM_STYLES[name]||name;if(val===undefined){var elem=DOM.get(selector),ret='';if(elem&&elem[STYLE]){ret=name.get?name.get(elem):elem[STYLE][name];if(ret===''&&!name.get){ret=fixComputedStyle(elem,name,DOM._getComputedStyle(elem,name));}}
return ret===undefined?'':ret;}
else{if(val===null||val===EMPTY){val=EMPTY;}
else if(!isNaN(new Number(val))&&RE_NEED_UNIT.test(name)){val+=DEFAULT_UNIT;}
if((name===WIDTH||name===HEIGHT)&&parseFloat(val)<0){return;}
S.each(DOM.query(selector),function(elem){if(elem&&elem[STYLE]){name.set?name.set(elem,val):(elem[STYLE][name]=val);if(val===EMPTY){if(!elem[STYLE].cssText)
elem.removeAttribute(STYLE);}}});}},width:function(selector,value){if(value===undefined){return getWH(selector,WIDTH);}
else{DOM.css(selector,WIDTH,value);}},height:function(selector,value){if(value===undefined){return getWH(selector,HEIGHT);}
else{DOM.css(selector,HEIGHT,value);}},show:function(selector){DOM.query(selector).each(function(elem){if(!elem)return;elem.style[DISPLAY]=DOM.data(elem,DISPLAY)||EMPTY;if(DOM.css(elem,DISPLAY)===NONE){var tagName=elem.tagName,old=defaultDisplay[tagName],tmp;if(!old){tmp=doc.createElement(tagName);doc.body.appendChild(tmp);old=DOM.css(tmp,DISPLAY);DOM.remove(tmp);defaultDisplay[tagName]=old;}
DOM.data(elem,DISPLAY,old);elem.style[DISPLAY]=old;}});},hide:function(selector){DOM.query(selector).each(function(elem){if(!elem)return;var style=elem.style,old=style[DISPLAY];if(old!==NONE){if(old){DOM.data(elem,DISPLAY,old);}
style[DISPLAY]=NONE;}});},toggle:function(selector){DOM.query(selector).each(function(elem){if(elem){if(DOM.css[elem,DISPLAY]===NONE){DOM.show(elem);}else{DOM.hide(elem);}}});},addStyleSheet:function(cssText,id){var elem;if(id&&(id=id.replace('#',EMPTY)))elem=DOM.get('#'+id);if(elem)return;elem=DOM.create('<style>',{id:id});DOM.get('head').appendChild(elem);if(elem.styleSheet){elem.styleSheet.cssText=cssText;}else{elem.appendChild(doc.createTextNode(cssText));}},unselectable:function(selector){DOM.query(selector).each(function(elem){if(elem){if(UA['gecko']){elem.style.MozUserSelect='none';}
else if(UA['webkit']){elem.style.KhtmlUserSelect='none';}else{if(UA['ie']||UA['opera']){var e,i=0,els=elem.getElementsByTagName("*");elem.setAttribute("unselectable",'on');while((e=els[i++])){switch(e.tagName.toLowerCase()){case'iframe':case'textarea':case'input':case'select':break;default:e.setAttribute("unselectable",'on');}}}}}});}});if(docElem[STYLE][CSS_FLOAT]!==undefined){CUSTOM_STYLES[FLOAT]=CSS_FLOAT;}
else if(docElem[STYLE][STYLE_FLOAT]!==undefined){CUSTOM_STYLES[FLOAT]=STYLE_FLOAT;}
function getWH(selector,name){var elem=DOM.get(selector),which=name===WIDTH?['Left','Right']:['Top','Bottom'],val=name===WIDTH?elem.offsetWidth:elem.offsetHeight;S.each(which,function(direction){val-=parseFloat(DOM._getComputedStyle(elem,'padding'+direction))||0;val-=parseFloat(DOM._getComputedStyle(elem,'border'+direction+'Width'))||0;});return val;}
function fixComputedStyle(elem,name,val){var offset,ret=val;if(val===AUTO&&RE_LT.test(name)){ret=0;if(S.inArray(DOM.css(elem,'position'),['absolute','fixed'])){offset=elem[name==='left'?'offsetLeft':'offsetTop'];if(UA['ie']===8||UA['opera']){offset-=PARSEINT(DOM.css(elem.offsetParent,'border-'+name+'-width'))||0;}
ret=offset-(PARSEINT(DOM.css(elem,'margin-'+name))||0);}}
return ret;}
return DOM;},{requires:["dom/base","ua"]});KISSY.add('dom/traversal',function(S,DOM,undefined){var isElementNode=DOM._isElementNode;S.mix(DOM,{parent:function(selector,filter){return nth(selector,filter,'parentNode',function(elem){return elem.nodeType!=11;});},next:function(selector,filter){return nth(selector,filter,'nextSibling',undefined);},prev:function(selector,filter){return nth(selector,filter,'previousSibling',undefined);},siblings:function(selector,filter){return getSiblings(selector,filter,true);},children:function(selector,filter){return getSiblings(selector,filter,undefined);},contains:function(container,contained){var ret=false;if((container=DOM.get(container))&&(contained=DOM.get(contained))){if(container.contains){if(contained.nodeType===3){contained=contained.parentNode;if(contained===container)return true;}
if(contained){return container.contains(contained);}}
else if(container.compareDocumentPosition){return!!(container.compareDocumentPosition(contained)&16);}
else{while(!ret&&(contained=contained.parentNode)){ret=contained==container;}}}
return ret;}});function nth(elem,filter,direction,extraFilter){if(!(elem=DOM.get(elem)))return null;if(filter===undefined)filter=1;var ret=null,fi,flen;if(S['isNumber'](filter)&&filter>=0){if(filter===0)return elem;fi=0;flen=filter;filter=function(){return++fi===flen;};}
while((elem=elem[direction])){if(isElementNode(elem)&&(!filter||DOM.test(elem,filter))&&(!extraFilter||extraFilter(elem))){ret=elem;break;}}
return ret;}
function getSiblings(selector,filter,parent){var ret=[],elem=DOM.get(selector),j,parentNode=elem,next;if(elem&&parent)parentNode=elem.parentNode;if(parentNode){for(j=0,next=parentNode.firstChild;next;next=next.nextSibling){if(isElementNode(next)&&next!==elem&&(!filter||DOM.test(next,filter))){ret[j++]=next;}}}
return ret;}
return DOM;},{requires:["dom/base"]});KISSY.add("dom",function(S,DOM){return DOM;},{requires:["dom/attr","dom/class","dom/create","dom/data","dom/insertion","dom/offset","dom/style","dom/selector","dom/style-ie","dom/traversal"]});;KISSY.use("datalazyload",function(S,DataLazyload){S.ready(function(S){var dl=DataLazyload();});});