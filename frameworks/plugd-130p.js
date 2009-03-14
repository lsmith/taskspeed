/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

(function(){
var _1=null;
if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){
var _2="",_3="",_4="",_5={},_6={};
_1=_1||djConfig.scopeMap;
for(var i=0;i<_1.length;i++){
var _8=_1[i];
_2+="var "+_8[0]+" = {}; "+_8[1]+" = "+_8[0]+";"+_8[1]+"._scopeName = '"+_8[1]+"';";
_3+=(i==0?"":",")+_8[0];
_4+=(i==0?"":",")+_8[1];
_5[_8[0]]=_8[1];
_6[_8[1]]=_8[0];
}
eval(_2+"dojo._scopeArgs = ["+_4+"];");
dojo._scopePrefixArgs=_3;
dojo._scopePrefix="(function("+_3+"){";
dojo._scopeSuffix="})("+_4+")";
dojo._scopeMap=_5;
dojo._scopeMapRev=_6;
}
(function(){
if(typeof this["loadFirebugConsole"]=="function"){
this["loadFirebugConsole"]();
}else{
this.console=this.console||{};
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var i=0,tn;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _c=tn+"";
console[_c]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_c+":");
console["log"](a.join(" "));
}:function(){
};
})();
}
}
}
if(typeof dojo=="undefined"){
this.dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};
}
var d=dojo;
if(typeof dijit=="undefined"){
this.dijit={_scopeName:"dijit"};
}
if(typeof dojox=="undefined"){
this.dojox={_scopeName:"dojox"};
}
if(!d._scopeArgs){
d._scopeArgs=[dojo,dijit,dojox];
}
d.global=this;
d.config={isDebug:false,debugAtAllCosts:false};
if(typeof djConfig!="undefined"){
for(var _f in djConfig){
d.config[_f]=djConfig[_f];
}
}
dojo.locale=d.config.locale;
var rev="$Rev: 16807 $".match(/\d+/);
dojo.version={major:1,minor:3,patch:0,flag:"-p",revision:rev?+rev[0]:NaN,toString:function(){
with(d.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
if(typeof OpenAjax!="undefined"){
OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());
}
var _11={};
dojo._mixin=function(obj,_13){
for(var x in _13){
if(_11[x]===undefined||_11[x]!=_13[x]){
obj[x]=_13[x];
}
}
if(d.isIE&&_13){
var p=_13.toString;
if(typeof p=="function"&&p!=obj.toString&&p!=_11.toString&&p!="\nfunction toString() {\n    [native code]\n}\n"){
obj.toString=_13.toString;
}
}
return obj;
};
dojo.mixin=function(obj,_17){
if(!obj){
obj={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(obj,arguments[i]);
}
return obj;
};
dojo._getProp=function(_1a,_1b,_1c){
var obj=_1c||d.global;
for(var i=0,p;obj&&(p=_1a[i]);i++){
if(i==0&&this._scopeMap[p]){
p=this._scopeMap[p];
}
obj=(p in obj?obj[p]:(_1b?obj[p]={}:undefined));
}
return obj;
};
dojo.setObject=function(_20,_21,_22){
var _23=_20.split("."),p=_23.pop(),obj=d._getProp(_23,true,_22);
return obj&&p?(obj[p]=_21):undefined;
};
dojo.getObject=function(_26,_27,_28){
return d._getProp(_26.split("."),_27,_28);
};
dojo.exists=function(_29,obj){
return !!d.getObject(_29,false,obj);
};
dojo["eval"]=function(_2b){
return d.global.eval?d.global.eval(_2b):eval(_2b);
};
d.deprecated=d.experimental=function(){
};
})();
(function(){
var d=dojo;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_2d){
var mp=this._modulePrefixes;
return !!(mp[_2d]&&mp[_2d].value);
},_getModulePrefix:function(_2f){
var mp=this._modulePrefixes;
if(this._moduleHasPrefix(_2f)){
return mp[_2f].value;
}
return _2f;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(_31,_32,cb){
var uri=((_31.charAt(0)=="/"||_31.match(/^\w+:/))?"":this.baseUrl)+_31;
try{
return !_32?this._loadUri(uri,cb):this._loadUriAndCheck(uri,_32,cb);
}
catch(e){
console.error(e);
return false;
}
};
dojo._loadUri=function(uri,cb){
if(this._loadedUrls[uri]){
return true;
}
var _37=this._getText(uri,true);
if(!_37){
return false;
}
this._loadedUrls[uri]=true;
this._loadedUrls.push(uri);
if(cb){
_37="("+_37+")";
}else{
_37=this._scopePrefix+_37+this._scopeSuffix;
}
if(d.isMoz){
_37+="\r\n//@ sourceURL="+uri;
}
var _38=d["eval"](_37);
if(cb){
cb(_38);
}
return true;
};
dojo._loadUriAndCheck=function(uri,_3a,cb){
var ok=false;
try{
ok=this._loadUri(uri,cb);
}
catch(e){
console.error("failed loading "+uri+" with error: "+e);
}
return !!(ok&&this._loadedModules[_3a]);
};
dojo.loaded=function(){
this._loadNotifying=true;
this._postLoad=true;
var mll=d._loaders;
this._loaders=[];
for(var x=0;x<mll.length;x++){
mll[x]();
}
this._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&mll.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var mll=d._unloaders;
while(mll.length){
(mll.pop())();
}
};
d._onto=function(arr,obj,fn){
if(!fn){
arr.push(obj);
}else{
if(fn){
var _43=(typeof fn=="string")?obj[fn]:fn;
arr.push(function(){
_43.call(obj);
});
}
}
};
dojo.addOnLoad=function(obj,_45){
d._onto(d._loaders,obj,_45);
if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){
d._callLoaded();
}
};
var dca=d.config.addOnLoad;
if(dca){
d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);
}
dojo._modulesLoaded=function(){
if(d._postLoad){
return;
}
if(d._inFlightCount>0){
console.warn("files still in flight!");
return;
}
d._callLoaded();
};
dojo._callLoaded=function(){
if(typeof setTimeout=="object"||(dojo.config.useXDomain&&d.isOpera)){
if(dojo.isAIR){
setTimeout(function(){
dojo.loaded();
},0);
}else{
setTimeout(dojo._scopeName+".loaded();",0);
}
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_47){
var _48=_47.split(".");
for(var i=_48.length;i>0;i--){
var _4a=_48.slice(0,i).join(".");
if((i==1)&&!this._moduleHasPrefix(_4a)){
_48[0]="../"+_48[0];
}else{
var _4b=this._getModulePrefix(_4a);
if(_4b!=_4a){
_48.splice(0,i,_4b);
break;
}
}
}
return _48;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_4c){
_4c();
};
dojo._loadModule=dojo.require=function(_4d,_4e){
_4e=this._global_omit_module_check||_4e;
var _4f=this._loadedModules[_4d];
if(_4f){
return _4f;
}
var _50=this._getModuleSymbols(_4d).join("/")+".js";
var _51=(!_4e)?_4d:null;
var ok=this._loadPath(_50,_51);
if(!ok&&!_4e){
throw new Error("Could not load '"+_4d+"'; last tried '"+_50+"'");
}
if(!_4e&&!this._isXDomain){
_4f=this._loadedModules[_4d];
if(!_4f){
throw new Error("symbol '"+_4d+"' is not defined after loading '"+_50+"'");
}
}
return _4f;
};
dojo.provide=function(_53){
_53=_53+"";
return (d._loadedModules[_53]=d.getObject(_53,true));
};
dojo.platformRequire=function(_54){
var _55=_54.common||[];
var _56=_55.concat(_54[d._name]||_54["default"]||[]);
for(var x=0;x<_56.length;x++){
var _58=_56[x];
if(_58.constructor==Array){
d._loadModule.apply(d,_58);
}else{
d._loadModule(_58);
}
}
};
dojo.requireIf=function(_59,_5a){
if(_59===true){
var _5b=[];
for(var i=1;i<arguments.length;i++){
_5b.push(arguments[i]);
}
d.require.apply(d,_5b);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_5d,_5e){
d._modulePrefixes[_5d]={name:_5d,value:_5e};
};
dojo.requireLocalization=function(_5f,_60,_61,_62){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");
var ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null;
var _a=arguments;
var uri=[_a[0]];
for(var i=1;i<_a.length;i++){
if(!_a[i]){
continue;
}
var _69=new d._Url(_a[i]+"");
var _6a=new d._Url(uri[0]+"");
if(_69.path==""&&!_69.scheme&&!_69.authority&&!_69.query){
if(_69.fragment!=n){
_6a.fragment=_69.fragment;
}
_69=_6a;
}else{
if(!_69.scheme){
_69.scheme=_6a.scheme;
if(!_69.authority){
_69.authority=_6a.authority;
if(_69.path.charAt(0)!="/"){
var _6b=_6a.path.substring(0,_6a.path.lastIndexOf("/")+1)+_69.path;
var _6c=_6b.split("/");
for(var j=0;j<_6c.length;j++){
if(_6c[j]=="."){
if(j==_6c.length-1){
_6c[j]="";
}else{
_6c.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_6c[0]=="")&&_6c[j]==".."&&_6c[j-1]!=".."){
if(j==(_6c.length-1)){
_6c.splice(j,1);
_6c[j-1]="";
}else{
_6c.splice(j-1,2);
j-=2;
}
}
}
}
_69.path=_6c.join("/");
}
}
}
}
uri=[];
if(_69.scheme){
uri.push(_69.scheme,":");
}
if(_69.authority){
uri.push("//",_69.authority);
}
uri.push(_69.path);
if(_69.query){
uri.push("?",_69.query);
}
if(_69.fragment){
uri.push("#",_69.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
dojo._Url.prototype.toString=function(){
return this.uri;
};
dojo.moduleUrl=function(_6f,url){
var loc=d._getModuleSymbols(_6f).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _72=loc.indexOf(":");
if(loc.charAt(0)!="/"&&(_72==-1||_72>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
if(typeof window!="undefined"){
dojo.isBrowser=true;
dojo._name="browser";
(function(){
var d=dojo;
if(document&&document.getElementsByTagName){
var _74=document.getElementsByTagName("script");
var _75=/dojo(\.xd)?\.js(\W|$)/i;
for(var i=0;i<_74.length;i++){
var src=_74[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_75);
if(m){
if(!d.config.baseUrl){
d.config.baseUrl=src.substring(0,m.index);
}
var cfg=_74[i].getAttribute("djConfig");
if(cfg){
var _7a=eval("({ "+cfg+" })");
for(var x in _7a){
dojo.config[x]=_7a[x];
}
}
break;
}
}
}
d.baseUrl=d.config.baseUrl;
var n=navigator;
var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
if(dua.indexOf("Opera")>=0){
d.isOpera=tv;
}
if(dua.indexOf("AdobeAIR")>=0){
d.isAIR=1;
}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;
d.isGecko=parseFloat(dua.split("Gecko/")[1])||undefined;
d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
var _80=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_80&&!dojo.isChrome){
d.isSafari=parseFloat(dav.split("Version/")[1]);
if(!d.isSafari||parseFloat(dav.substr(_80+7))<=419.3){
d.isSafari=2;
}
}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){
d.isMozilla=d.isMoz=tv;
}
if(d.isMoz){
d.isFF=parseFloat(dua.split("Firefox/")[1])||undefined;
}
if(document.all&&!d.isOpera){
d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
if(d.isIE>=8&&document.documentMode!=5){
d.isIE=document.documentMode;
}
}
if(dojo.isIE&&window.location.protocol==="file:"){
dojo.config.ieForceActiveXXhr=true;
}
var cm=document.compatMode;
d.isQuirks=cm=="BackCompat"||cm=="QuirksMode"||d.isIE<6;
d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){
var _82,_83;
if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){
try{
_82=new XMLHttpRequest();
}
catch(e){
}
}
if(!_82){
for(var i=0;i<3;++i){
var _85=d._XMLHTTP_PROGIDS[i];
try{
_82=new ActiveXObject(_85);
}
catch(e){
_83=e;
}
if(_82){
d._XMLHTTP_PROGIDS=[_85];
break;
}
}
}
if(!_82){
throw new Error("XMLHTTP not available: "+_83);
}
return _82;
};
d._isDocumentOk=function(_86){
var _87=_86.status||0;
return (_87>=200&&_87<300)||_87==304||_87==1223||(!_87&&(location.protocol=="file:"||location.protocol=="chrome:"));
};
var _88=window.location+"";
var _89=document.getElementsByTagName("base");
var _8a=(_89&&_89.length>0);
d._getText=function(uri,_8c){
var _8d=this._xhrObj();
if(!_8a&&dojo._Url){
uri=(new dojo._Url(_88,uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
_8d.open("GET",uri,false);
try{
_8d.send(null);
if(!d._isDocumentOk(_8d)){
var err=Error("Unable to load "+uri+" status:"+_8d.status);
err.status=_8d.status;
err.responseText=_8d.responseText;
throw err;
}
}
catch(e){
if(_8c){
return null;
}
throw e;
}
return _8d.responseText;
};
var _w=window;
var _90=function(_91,fp){
var _93=_w[_91]||function(){
};
_w[_91]=function(){
fp.apply(_w,arguments);
_93.apply(_w,arguments);
};
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=d._windowUnloaders;
while(mll.length){
(mll.pop())();
}
};
var _95=0;
d.addOnWindowUnload=function(obj,_97){
d._onto(d._windowUnloaders,obj,_97);
if(!_95){
_95=1;
_90("onunload",d.windowUnloaded);
}
};
var _98=0;
d.addOnUnload=function(obj,_9a){
d._onto(d._unloaders,obj,_9a);
if(!_98){
_98=1;
_90("onbeforeunload",dojo.unloaded);
}
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
dojo._initFired=true;
var _9c=e&&e.type?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_9c!="domcontentloaded"&&_9c!="load")){
return;
}
arguments.callee.initialized=true;
if("_khtmlTimer" in dojo){
clearInterval(dojo._khtmlTimer);
delete dojo._khtmlTimer;
}
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
};
if(!dojo.config.afterOnLoad){
if(document.addEventListener){
if(dojo.isWebKit>525||dojo.isOpera||dojo.isFF>=3||(dojo.isMoz&&dojo.config.enableMozDomContentLoaded===true)){
document.addEventListener("DOMContentLoaded",dojo._loadInit,null);
}
window.addEventListener("load",dojo._loadInit,null);
}
if(dojo.isAIR){
window.addEventListener("load",dojo._loadInit,null);
}else{
if((dojo.isWebKit<525)||dojo.isKhtml){
dojo._khtmlTimer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dojo._loadInit();
}
},10);
}
}
}
if(dojo.isIE){
if(!dojo.config.afterOnLoad){
document.write("<scr"+"ipt defer src=\"//:\" "+"onreadystatechange=\"if(this.readyState=='complete'){"+dojo._scopeName+"._loadInit();}\">"+"</scr"+"ipt>");
}
try{
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML);  display:inline-block");
}
catch(e){
}
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _9e in mp){
dojo.registerModulePath(_9e,mp[_9e]);
}
}
})();
if(dojo.config.isDebug){
dojo.require("dojo._firebug.firebug");
}
if(dojo.config.debugAtAllCosts){
dojo.config.useXDomain=true;
dojo.require("dojo._base._loader.loader_xd");
dojo.require("dojo._base._loader.loader_debug");
dojo.require("dojo.i18n");
}
if(!dojo._hasResource["dojo._base.lang"]){
dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
dojo.isString=function(it){
return !!arguments.length&&it!=null&&(typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=(function(){
var _a1=function(it){
return it&&(typeof it=="function"||it instanceof Function);
};
return dojo.isSafari?function(it){
if(typeof it=="function"&&it=="[object NodeList]"){
return false;
}
return _a1(it);
}:_a1;
})();
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));
};
dojo.isArrayLike=function(it){
var d=dojo;
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_a8,_a9){
for(var i=1,l=arguments.length;i<l;i++){
dojo._mixin(_a8.prototype,arguments[i]);
}
return _a8;
};
dojo._hitchArgs=function(_ac,_ad){
var pre=dojo._toArray(arguments,2);
var _af=dojo.isString(_ad);
return function(){
var _b0=dojo._toArray(arguments);
var f=_af?(_ac||dojo.global)[_ad]:_ad;
return f&&f.apply(_ac||this,pre.concat(_b0));
};
};
dojo.hitch=function(_b2,_b3){
if(arguments.length>2){
return dojo._hitchArgs.apply(dojo,arguments);
}
if(!_b3){
_b3=_b2;
_b2=null;
}
if(dojo.isString(_b3)){
_b2=_b2||dojo.global;
if(!_b2[_b3]){
throw (["dojo.hitch: scope[\"",_b3,"\"] is null (scope=\"",_b2,"\")"].join(""));
}
return function(){
return _b2[_b3].apply(_b2,arguments||[]);
};
}
return !_b2?_b3:function(){
return _b3.apply(_b2,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_b6){
TMP.prototype=obj;
var tmp=new TMP();
if(_b6){
dojo._mixin(tmp,_b6);
}
return tmp;
};
})();
(function(){
var _b8=function(obj,_ba,_bb){
return (_bb||[]).concat(Array.prototype.slice.call(obj,_ba||0));
};
var _bc=function(obj,_be,_bf){
var arr=_bf||[];
for(var x=_be||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=dojo.isIE?function(obj){
return ((obj.item)?_bc:_b8).apply(this,arguments);
}:_b8;
})();
dojo.partial=function(_c3){
var arr=[null];
return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));
};
dojo.clone=function(o){
if(!o){
return o;
}
if(dojo.isArray(o)){
var r=[];
for(var i=0;i<o.length;++i){
r.push(dojo.clone(o[i]));
}
return r;
}
if(!dojo.isObject(o)){
return o;
}
if(o.nodeType&&o.cloneNode){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
r=new o.constructor();
for(i in o){
if(!(i in r)||r[i]!=o[i]){
r[i]=dojo.clone(o[i]);
}
}
return r;
};
dojo.trim=String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
}
if(!dojo._hasResource["dojo._base.declare"]){
dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
dojo.declare=function(_ca,_cb,_cc){
var dd=arguments.callee,_ce;
if(dojo.isArray(_cb)){
_ce=_cb;
_cb=_ce.shift();
}
if(_ce){
dojo.forEach(_ce,function(m,i){
if(!m){
throw (_ca+": mixin #"+i+" is null");
}
_cb=dd._delegate(_cb,m);
});
}
var _d1=dd._delegate(_cb);
_cc=_cc||{};
_d1.extend(_cc);
dojo.extend(_d1,{declaredClass:_ca,_constructor:_cc.constructor});
_d1.prototype.constructor=_d1;
return dojo.setObject(_ca,_d1);
};
dojo.mixin(dojo.declare,{_delegate:function(_d2,_d3){
var bp=(_d2||0).prototype,mp=(_d3||0).prototype,dd=dojo.declare;
var _d7=dd._makeCtor();
dojo.mixin(_d7,{superclass:bp,mixin:mp,extend:dd._extend});
if(_d2){
_d7.prototype=dojo._delegate(bp);
}
dojo.extend(_d7,dd._core,mp||0,{_constructor:null,preamble:null});
_d7.prototype.constructor=_d7;
_d7.prototype.declaredClass=(bp||0).declaredClass+"_"+(mp||0).declaredClass;
return _d7;
},_extend:function(_d8){
var i,fn;
for(i in _d8){
if(dojo.isFunction(fn=_d8[i])&&!0[i]){
fn.nom=i;
fn.ctor=this;
}
}
dojo.extend(this,_d8);
},_makeCtor:function(){
return function(){
this._construct(arguments);
};
},_core:{_construct:function(_db){
var c=_db.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,mct=m&&m.constructor,a=_db,ii,fn;
if(a[0]){
if(((fn=a[0].preamble))){
a=fn.apply(this,a)||a;
}
}
if((fn=c.prototype.preamble)){
a=fn.apply(this,a)||a;
}
if(ct&&ct.apply){
ct.apply(this,a);
}
if(mct&&mct.apply){
mct.apply(this,a);
}
if((ii=c.prototype._constructor)){
ii.apply(this,_db);
}
if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){
ct.apply(this,_db);
}
},_findMixin:function(_e4){
var c=this.constructor,p,m;
while(c){
p=c.superclass;
m=c.mixin;
if(m==_e4||(m instanceof _e4.constructor)){
return p;
}
if(m&&m._findMixin&&(m=m._findMixin(_e4))){
return m;
}
c=p&&p.constructor;
}
},_findMethod:function(_e8,_e9,_ea,has){
var p=_ea,c,m,f;
do{
c=p.constructor;
m=c.mixin;
if(m&&(m=this._findMethod(_e8,_e9,m,has))){
return m;
}
if((f=p[_e8])&&(has==(f==_e9))){
return p;
}
p=c.superclass;
}while(p);
return !has&&(p=this._findMixin(_ea))&&this._findMethod(_e8,_e9,p,has);
},inherited:function(_f0,_f1,_f2){
var a=arguments;
if(!dojo.isString(a[0])){
_f2=_f1;
_f1=_f0;
_f0=_f1.callee.nom;
}
a=_f2||_f1;
var c=_f1.callee,p=this.constructor.prototype,fn,mp;
if(this[_f0]!=c||p[_f0]==c){
mp=(c.ctor||0).superclass||this._findMethod(_f0,c,p,true);
if(!mp){
throw (this.declaredClass+": inherited method \""+_f0+"\" mismatch");
}
p=this._findMethod(_f0,c,mp,false);
}
fn=p&&p[_f0];
if(!fn){
throw (mp.declaredClass+": inherited method \""+_f0+"\" not found");
}
return fn.apply(this,a);
}}});
}
if(!dojo._hasResource["dojo._base.connect"]){
dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;
var r=t&&t.apply(this,arguments);
var lls;
lls=[].concat(ls);
for(var i in lls){
if(!(i in ap)){
lls[i].apply(this,arguments);
}
}
return r;
};
},add:function(_ff,_100,_101){
_ff=_ff||dojo.global;
var f=_ff[_100];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_ff[_100]=d;
}
return f._listeners.push(_101);
},remove:function(_104,_105,_106){
var f=(_104||dojo.global)[_105];
if(f&&f._listeners&&_106--){
delete f._listeners[_106];
}
}};
dojo.connect=function(obj,_109,_10a,_10b,_10c){
var a=arguments,args=[],i=0;
args.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
args.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
args.push(a[i]);
}
return dojo._connect.apply(this,args);
};
dojo._connect=function(obj,_112,_113,_114){
var l=dojo._listener,h=l.add(obj,_112,dojo.hitch(_113,_114));
return [obj,_112,h,l];
};
dojo.disconnect=function(_117){
if(_117&&_117[0]!==undefined){
dojo._disconnect.apply(this,_117);
delete _117[0];
}
};
dojo._disconnect=function(obj,_119,_11a,_11b){
_11b.remove(obj,_119,_11a);
};
dojo._topics={};
dojo.subscribe=function(_11c,_11d,_11e){
return [_11c,dojo._listener.add(dojo._topics,_11c,dojo.hitch(_11d,_11e))];
};
dojo.unsubscribe=function(_11f){
if(_11f){
dojo._listener.remove(dojo._topics,_11f[0],_11f[1]);
}
};
dojo.publish=function(_120,args){
var f=dojo._topics[_120];
if(f){
f.apply(this,args||[]);
}
};
dojo.connectPublisher=function(_123,obj,_125){
var pf=function(){
dojo.publish(_123,arguments);
};
return (_125)?dojo.connect(obj,_125,pf):dojo.connect(obj,pf);
};
}
if(!dojo._hasResource["dojo._base.Deferred"]){
dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
dojo.Deferred=function(_127){
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=_127;
this.silentlyCancelled=false;
};
dojo.extend(dojo.Deferred,{_nextId:(function(){
var n=1;
return function(){
return n++;
};
})(),cancel:function(){
var err;
if(this.fired==-1){
if(this.canceller){
err=this.canceller(this);
}else{
this.silentlyCancelled=true;
}
if(this.fired==-1){
if(!(err instanceof Error)){
var res=err;
var msg="Deferred Cancelled";
if(err&&err.toString){
msg+=": "+err.toString();
}
err=new Error(msg);
err.dojoType="cancel";
err.cancelResult=res;
}
this.errback(err);
}
}else{
if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){
this.results[0].cancel();
}
}
},_resback:function(res){
this.fired=((res instanceof Error)?1:0);
this.results[this.fired]=res;
this._fire();
},_check:function(){
if(this.fired!=-1){
if(!this.silentlyCancelled){
throw new Error("already called!");
}
this.silentlyCancelled=false;
return;
}
},callback:function(res){
this._check();
this._resback(res);
},errback:function(res){
this._check();
if(!(res instanceof Error)){
res=new Error(res);
}
this._resback(res);
},addBoth:function(cb,cbfn){
var _131=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_131,_131);
},addCallback:function(cb,cbfn){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(cb,cbfn){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addCallbacks:function(cb,eb){
this.chain.push([cb,eb]);
if(this.fired>=0){
this._fire();
}
return this;
},_fire:function(){
var _138=this.chain;
var _139=this.fired;
var res=this.results[_139];
var self=this;
var cb=null;
while((_138.length>0)&&(this.paused==0)){
var f=_138.shift()[_139];
if(!f){
continue;
}
var func=function(){
var ret=f(res);
if(typeof ret!="undefined"){
res=ret;
}
_139=((res instanceof Error)?1:0);
if(res instanceof dojo.Deferred){
cb=function(res){
self._resback(res);
self.paused--;
if((self.paused==0)&&(self.fired>=0)){
self._fire();
}
};
this.paused++;
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(err){
_139=1;
res=err;
}
}
}
this.fired=_139;
this.results[_139]=res;
if((cb)&&(this.paused)){
res.addBoth(cb);
}
}});
}
if(!dojo._hasResource["dojo._base.json"]){
dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){
return eval("("+json+")");
};
dojo._escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_144,_145){
if(it===undefined){
return "undefined";
}
var _146=typeof it;
if(_146=="number"||_146=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _147=arguments.callee;
var _148;
_145=_145||"";
var _149=_144?_145+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_148=tf.call(it);
if(it!==_148){
return _147(_148,_144,_149);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var sep=_144?" ":"";
var _14c=_144?"\n":"";
if(dojo.isArray(it)){
var res=dojo.map(it,function(obj){
var val=_147(obj,_144,_149);
if(typeof val!="string"){
val="undefined";
}
return _14c+_149+val;
});
return "["+res.join(","+sep)+_14c+_145+"]";
}
if(_146=="function"){
return null;
}
var _150=[],key;
for(key in it){
var _152,val;
if(typeof key=="number"){
_152="\""+key+"\"";
}else{
if(typeof key=="string"){
_152=dojo._escapeString(key);
}else{
continue;
}
}
val=_147(it[key],_144,_149);
if(typeof val!="string"){
continue;
}
_150.push(_14c+_149+_152+":"+sep+val);
}
return "{"+_150.join(","+sep)+_14c+_145+"}";
};
}
if(!dojo._hasResource["dojo._base.array"]){
dojo._hasResource["dojo._base.array"]=true;
dojo.provide("dojo._base.array");
(function(){
var _154=function(arr,obj,cb){
return [dojo.isString(arr)?arr.split(""):arr,obj||dojo.global,dojo.isString(cb)?new Function("item","index","array",cb):cb];
};
dojo.mixin(dojo,{indexOf:function(_158,_159,_15a,_15b){
var step=1,end=_158.length||0,i=0;
if(_15b){
i=end-1;
step=end=-1;
}
if(_15a!=undefined){
i=_15a;
}
if((_15b&&i>end)||i<end){
for(;i!=end;i+=step){
if(_158[i]==_159){
return i;
}
}
}
return -1;
},lastIndexOf:function(_15e,_15f,_160){
return dojo.indexOf(_15e,_15f,_160,true);
},forEach:function(arr,_162,_163){
if(!arr||!arr.length){
return;
}
var _p=_154(arr,_163,_162);
arr=_p[0];
for(var i=0,l=arr.length;i<l;++i){
_p[2].call(_p[1],arr[i],i,arr);
}
},_everyOrSome:function(_167,arr,_169,_16a){
var _p=_154(arr,_16a,_169);
arr=_p[0];
for(var i=0,l=arr.length;i<l;++i){
var _16e=!!_p[2].call(_p[1],arr[i],i,arr);
if(_167^_16e){
return _16e;
}
}
return _167;
},every:function(arr,_170,_171){
return this._everyOrSome(true,arr,_170,_171);
},some:function(arr,_173,_174){
return this._everyOrSome(false,arr,_173,_174);
},map:function(arr,_176,_177){
var _p=_154(arr,_177,_176);
arr=_p[0];
var _179=(arguments[3]?(new arguments[3]()):[]);
for(var i=0,l=arr.length;i<l;++i){
_179.push(_p[2].call(_p[1],arr[i],i,arr));
}
return _179;
},filter:function(arr,_17d,_17e){
var _p=_154(arr,_17e,_17d);
arr=_p[0];
var _180=[];
for(var i=0,l=arr.length;i<l;++i){
if(_p[2].call(_p[1],arr[i],i,arr)){
_180.push(arr[i]);
}
}
return _180;
}});
})();
}
if(!dojo._hasResource["dojo._base.Color"]){
dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
(function(){
var d=dojo;
dojo.Color=function(_184){
if(_184){
this.setColor(_184);
}
};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_18a){
if(d.isString(_18a)){
d.colorFromString(_18a,this);
}else{
if(d.isArray(_18a)){
d.colorFromArray(_18a,this);
}else{
this._set(_18a.r,_18a.g,_18a.b,_18a.a);
if(!(_18a instanceof d.Color)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var arr=d.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+arr.join("");
},toCss:function(_190){
var t=this,rgb=t.r+", "+t.g+", "+t.b;
return (_190?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";
},toString:function(){
return this.toCss(true);
}});
dojo.blendColors=function(_193,end,_195,obj){
var t=obj||new d.Color();
d.forEach(["r","g","b","a"],function(x){
t[x]=_193[x]+(end[x]-_193[x])*_195;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
dojo.colorFromRgb=function(_199,obj){
var m=_199.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);
};
dojo.colorFromHex=function(_19c,obj){
var t=obj||new d.Color(),bits=(_19c.length==4)?4:8,mask=(1<<bits)-1;
_19c=Number("0x"+_19c.substr(1));
if(isNaN(_19c)){
return null;
}
d.forEach(["b","g","r"],function(x){
var c=_19c&mask;
_19c>>=bits;
t[x]=bits==4?17*c:c;
});
t.a=1;
return t;
};
dojo.colorFromArray=function(a,obj){
var t=obj||new d.Color();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
dojo.colorFromString=function(str,obj){
var a=d.Color.named[str];
return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);
};
})();
}
if(!dojo._hasResource["dojo._base"]){
dojo._hasResource["dojo._base"]=true;
dojo.provide("dojo._base");
}
if(!dojo._hasResource["dojo._base.window"]){
dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo.doc=window["document"]||null;
dojo.body=function(){
return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];
};
dojo.setContext=function(_1a9,_1aa){
dojo.global=_1a9;
dojo.doc=_1aa;
};
dojo.withGlobal=function(_1ab,_1ac,_1ad,_1ae){
var _1af=dojo.global;
try{
dojo.global=_1ab;
return dojo.withDoc.call(null,_1ab.document,_1ac,_1ad,_1ae);
}
finally{
dojo.global=_1af;
}
};
dojo.withDoc=function(_1b0,_1b1,_1b2,_1b3){
var _1b4=dojo.doc,_1b5=dojo._bodyLtr;
try{
dojo.doc=_1b0;
delete dojo._bodyLtr;
if(_1b2&&dojo.isString(_1b1)){
_1b1=_1b2[_1b1];
}
return _1b1.apply(_1b2,_1b3||[]);
}
finally{
dojo.doc=_1b4;
if(_1b5!==undefined){
dojo._bodyLtr=_1b5;
}
}
};
}
if(!dojo._hasResource["dojo._base.event"]){
dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
(function(){
var del=(dojo._event_listener={add:function(node,name,fp){
if(!node){
return;
}
name=del._normalizeEventName(name);
fp=del._fixCallback(name,fp);
var _1ba=name;
if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){
var ofp=fp;
name=(name=="mouseenter")?"mouseover":"mouseout";
fp=function(e){
if(dojo.isFF<=2){
try{
e.relatedTarget.tagName;
}
catch(e2){
return;
}
}
if(!dojo.isDescendant(e.relatedTarget,node)){
return ofp.call(this,e);
}
};
}
node.addEventListener(name,fp,false);
return fp;
},remove:function(node,_1be,_1bf){
if(node){
_1be=del._normalizeEventName(_1be);
if(!dojo.isIE&&(_1be=="mouseenter"||_1be=="mouseleave")){
_1be=(_1be=="mouseenter")?"mouseover":"mouseout";
}
node.removeEventListener(_1be,_1bf,false);
}
},_normalizeEventName:function(name){
return name.slice(0,2)=="on"?name.slice(2):name;
},_fixCallback:function(name,fp){
return name!="keypress"?fp:function(e){
return fp.call(this,del._fixEvent(e,this));
};
},_fixEvent:function(evt,_1c5){
switch(evt.type){
case "keypress":
del._setKeyChar(evt);
break;
}
return evt;
},_setKeyChar:function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});
dojo.fixEvent=function(evt,_1c8){
return del._fixEvent(evt,_1c8);
};
dojo.stopEvent=function(evt){
evt.preventDefault();
evt.stopPropagation();
};
var _1ca=dojo._listener;
dojo._connect=function(obj,_1cc,_1cd,_1ce,_1cf){
var _1d0=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);
var lid=_1d0?(_1cf?2:1):0,l=[dojo._listener,del,_1ca][lid];
var h=l.add(obj,_1cc,dojo.hitch(_1cd,_1ce));
return [obj,_1cc,h,lid];
};
dojo._disconnect=function(obj,_1d5,_1d6,_1d7){
([dojo._listener,del,_1ca][_1d7]).remove(obj,_1d5,_1d6);
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(dojo.isIE){
var _1d8=function(e,code){
try{
return (e.keyCode=code);
}
catch(e){
return 0;
}
};
var iel=dojo._listener;
var _1dc=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");
if(!dojo.config._allow_leaks){
_1ca=iel=dojo._ie_listener={handlers:[],add:function(_1dd,_1de,_1df){
_1dd=_1dd||dojo.global;
var f=_1dd[_1de];
if(!f||!f[_1dc]){
var d=dojo._getIeDispatcher();
d.target=f&&(ieh.push(f)-1);
d[_1dc]=[];
f=_1dd[_1de]=d;
}
return f[_1dc].push(ieh.push(_1df)-1);
},remove:function(_1e3,_1e4,_1e5){
var f=(_1e3||dojo.global)[_1e4],l=f&&f[_1dc];
if(f&&l&&_1e5--){
delete ieh[l[_1e5]];
delete l[_1e5];
}
}};
var ieh=iel.handlers;
}
dojo.mixin(del,{add:function(node,_1e9,fp){
if(!node){
return;
}
_1e9=del._normalizeEventName(_1e9);
if(_1e9=="onkeypress"){
var kd=node.onkeydown;
if(!kd||!kd[_1dc]||!kd._stealthKeydownHandle){
var h=del.add(node,"onkeydown",del._stealthKeyDown);
kd=node.onkeydown;
kd._stealthKeydownHandle=h;
kd._stealthKeydownRefs=1;
}else{
kd._stealthKeydownRefs++;
}
}
return iel.add(node,_1e9,del._fixCallback(fp));
},remove:function(node,_1ee,_1ef){
_1ee=del._normalizeEventName(_1ee);
iel.remove(node,_1ee,_1ef);
if(_1ee=="onkeypress"){
var kd=node.onkeydown;
if(--kd._stealthKeydownRefs<=0){
iel.remove(node,"onkeydown",kd._stealthKeydownHandle);
delete kd._stealthKeydownHandle;
}
}
},_normalizeEventName:function(_1f1){
return _1f1.slice(0,2)!="on"?"on"+_1f1:_1f1;
},_nop:function(){
},_fixEvent:function(evt,_1f3){
if(!evt){
var w=_1f3&&(_1f3.ownerDocument||_1f3.document||_1f3).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
evt.target=evt.srcElement;
evt.currentTarget=(_1f3||evt.srcElement);
evt.layerX=evt.offsetX;
evt.layerY=evt.offsetY;
var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;
var _1f7=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
var _1f8=dojo._getIeDocumentElementOffset();
evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_1f7.scrollLeft||0)-_1f8.x;
evt.pageY=evt.clientY+(_1f7.scrollTop||0)-_1f8.y;
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
evt.stopPropagation=del._stopPropagation;
evt.preventDefault=del._preventDefault;
return del._fixKeys(evt);
},_fixKeys:function(evt){
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
del._setKeyChar(evt);
break;
}
return evt;
},_stealthKeyDown:function(evt){
var kp=evt.currentTarget.onkeypress;
if(!kp||!kp[_1dc]){
return;
}
var k=evt.keyCode;
var _1fe=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_1fe||evt.ctrlKey){
var c=_1fe?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
kp.call(evt.currentTarget,faux);
evt.cancelBubble=faux.cancelBubble;
evt.returnValue=faux.returnValue;
_1d8(evt,faux.keyCode);
}
},_stopPropagation:function(){
this.cancelBubble=true;
},_preventDefault:function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
_1d8(this,0);
}
this.returnValue=false;
}});
dojo.stopEvent=function(evt){
evt=evt||window.event;
del._stopPropagation.call(evt);
del._preventDefault.call(evt);
};
}
del._synthesizeEvent=function(evt,_203){
var faux=dojo.mixin({},evt,_203);
del._setKeyChar(faux);
faux.preventDefault=function(){
evt.preventDefault();
};
faux.stopPropagation=function(){
evt.stopPropagation();
};
return faux;
};
if(dojo.isOpera){
dojo.mixin(del,{_fixEvent:function(evt,_206){
switch(evt.type){
case "keypress":
var c=evt.which;
if(c==3){
c=99;
}
c=c<41&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return del._synthesizeEvent(evt,{charCode:c});
}
return evt;
}});
}
if(dojo.isWebKit){
del._add=del.add;
del._remove=del.remove;
dojo.mixin(del,{add:function(node,_209,fp){
if(!node){
return;
}
var _20b=del._add(node,_209,fp);
if(del._normalizeEventName(_209)=="keypress"){
_20b._stealthKeyDownHandle=del._add(node,"keydown",function(evt){
var k=evt.keyCode;
var _20e=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_20e||evt.ctrlKey){
var c=_20e?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if(!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
fp.call(evt.currentTarget,faux);
}
});
}
return _20b;
},remove:function(node,_212,_213){
if(node){
if(_213._stealthKeyDownHandle){
del._remove(node,"keydown",_213._stealthKeyDownHandle);
}
del._remove(node,_212,_213);
}
},_fixEvent:function(evt,_215){
switch(evt.type){
case "keypress":
if(evt.faux){
return evt;
}
var c=evt.charCode;
c=c>=32?c:0;
return del._synthesizeEvent(evt,{charCode:c,faux:true});
}
return evt;
}});
}
})();
if(dojo.isIE){
dojo._ieDispatcher=function(args,_218){
var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];
var r=t&&t.apply(_218,args);
var lls=[].concat(ls);
for(var i in lls){
if(!(i in ap)){
h[lls[i]].apply(_218,args);
}
}
return r;
};
dojo._getIeDispatcher=function(){
return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");
};
dojo._event_listener._fixCallback=function(fp){
var f=dojo._event_listener._fixEvent;
return function(e){
return fp.call(this,f(e,this));
};
};
}
}
if(!dojo._hasResource["dojo._base.html"]){
dojo._hasResource["dojo._base.html"]=true;
dojo.provide("dojo._base.html");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE||dojo.isOpera){
dojo.byId=function(id,doc){
if(dojo.isString(id)){
var _d=doc||dojo.doc;
var te=_d.getElementById(id);
if(te&&te.attributes.id.value==id){
return te;
}else{
var eles=_d.all[id];
if(!eles||eles.nodeName){
eles=[eles];
}
var i=0;
while((te=eles[i++])){
if(te.attributes&&te.attributes.id&&te.attributes.id.value==id){
return te;
}
}
}
}else{
return id;
}
};
}else{
dojo.byId=function(id,doc){
return dojo.isString(id)?(doc||dojo.doc).getElementById(id):id;
};
}
(function(){
var d=dojo;
var _22d=null;
d.addOnWindowUnload(function(){
_22d=null;
});
dojo._destroyElement=dojo.destroy=function(node){
node=d.byId(node);
try{
if(!_22d||_22d.ownerDocument!=node.ownerDocument){
_22d=node.ownerDocument.createElement("div");
}
_22d.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_22d.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(node,_230){
try{
node=d.byId(node);
_230=d.byId(_230);
while(node){
if(node===_230){
return true;
}
node=node.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(node,_232){
node=d.byId(node);
if(d.isMozilla){
node.style.MozUserSelect=_232?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
node.style.KhtmlUserSelect=_232?"auto":"none";
}else{
if(d.isIE){
var v=(node.unselectable=_232?"":"on");
d.query("*",node).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _234=function(node,ref){
var _237=ref.parentNode;
if(_237){
_237.insertBefore(node,ref);
}
};
var _238=function(node,ref){
var _23b=ref.parentNode;
if(_23b){
if(_23b.lastChild==ref){
_23b.appendChild(node);
}else{
_23b.insertBefore(node,ref.nextSibling);
}
}
};
dojo.place=function(node,_23d,_23e){
_23d=d.byId(_23d);
if(d.isString(node)){
node=node.charAt(0)=="<"?d._toDom(node,_23d.ownerDocument):d.byId(node);
}
if(typeof _23e=="number"){
var cn=_23d.childNodes;
if(!cn.length||cn.length<=_23e){
_23d.appendChild(node);
}else{
_234(node,cn[_23e<0?0:_23e]);
}
}else{
switch(_23e){
case "before":
_234(node,_23d);
break;
case "after":
_238(node,_23d);
break;
case "replace":
_23d.parentNode.replaceChild(node,_23d);
break;
case "only":
d.empty(_23d);
_23d.appendChild(node);
break;
case "first":
if(_23d.firstChild){
_234(node,_23d.firstChild);
break;
}
default:
_23d.appendChild(node);
}
}
return node;
};
dojo.boxModel="content-box";
if(d.isIE){
var _dcm=document.compatMode;
d.boxModel=_dcm=="BackCompat"||_dcm=="QuirksMode"||d.isIE<6?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(node){
var s;
if(node instanceof HTMLElement){
var dv=node.ownerDocument.defaultView;
s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(node){
return node.nodeType==1?node.currentStyle:{};
};
}else{
gcs=function(node){
return node instanceof HTMLElement?node.ownerDocument.defaultView.getComputedStyle(node,null):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_247,_248){
return parseFloat(_248)||0;
};
}else{
d._toPixelValue=function(_249,_24a){
if(!_24a){
return 0;
}
if(_24a=="medium"){
return 4;
}
if(_24a.slice&&_24a.slice(-2)=="px"){
return parseFloat(_24a);
}
with(_249){
var _24b=style.left;
var _24c=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_24a;
_24a=style.pixelLeft;
}
catch(e){
_24a=0;
}
style.left=_24b;
runtimeStyle.left=_24c;
}
return _24a;
};
}
var px=d._toPixelValue;
var astr="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(astr);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE?function(node){
try{
return af(node).Opacity/100;
}
catch(e){
return 1;
}
}:function(node){
return gcs(node).opacity;
};
dojo._setOpacity=d.isIE?function(node,_255){
var ov=_255*100;
node.style.zoom=1;
af(node,1).Enabled=!(_255==1);
if(!af(node)){
node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";
}else{
af(node,1).Opacity=ov;
}
if(node.nodeName.toLowerCase()=="tr"){
d.query("> td",node).forEach(function(i){
d._setOpacity(i,_255);
});
}
return _255;
}:function(node,_259){
return node.style.opacity=_259;
};
var _25a={left:true,top:true};
var _25b=/margin|padding|width|height|max|min|offset/;
var _25c=function(node,type,_25f){
type=type.toLowerCase();
if(d.isIE){
if(_25f=="auto"){
if(type=="height"){
return node.offsetHeight;
}
if(type=="width"){
return node.offsetWidth;
}
}
if(type=="fontweight"){
switch(_25f){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(type in _25a)){
_25a[type]=_25b.test(type);
}
return _25a[type]?px(node,_25f):_25f;
};
var _260=d.isIE?"styleFloat":"cssFloat",_261={"cssFloat":_260,"styleFloat":_260,"float":_260};
dojo.style=function(node,_263,_264){
var n=d.byId(node),args=arguments.length,op=(_263=="opacity");
_263=_261[_263]||_263;
if(args==3){
return op?d._setOpacity(n,_264):n.style[_263]=_264;
}
if(args==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(args==2&&!d.isString(_263)){
for(var x in _263){
d.style(node,x,_263[x]);
}
return s;
}
return (args==1)?s:_25c(n,_263,s[_263]||n.style[_263]);
};
dojo._getPadExtents=function(n,_26b){
var s=_26b||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_270){
var ne="none",s=_270||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_276){
var s=_276||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_27b){
var s=_27b||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(node,_282){
var s=_282||gcs(node),me=d._getMarginExtents(node,s);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;
if(d.isMoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
if(p&&p.style){
var pcs=gcs(p);
if(pcs.overflow!="visible"){
var be=d._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(d.isOpera){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
dojo._getContentBox=function(node,_28d){
var s=_28d||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
}else{
h=node.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(node,_294){
var s=_294||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(node,l,t,w,h,u){
u=u||"px";
var s=node.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
dojo._isButtonTag=function(node){
return node.tagName=="BUTTON"||node.tagName=="INPUT"&&node.getAttribute("type").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(node){
var n=node.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);
};
dojo._setContentSize=function(node,_2a3,_2a4,_2a5){
if(d._usesBorderBox(node)){
var pb=d._getPadBorderExtents(node,_2a5);
if(_2a3>=0){
_2a3+=pb.w;
}
if(_2a4>=0){
_2a4+=pb.h;
}
}
d._setBox(node,NaN,NaN,_2a3,_2a4);
};
dojo._setMarginBox=function(node,_2a8,_2a9,_2aa,_2ab,_2ac){
var s=_2ac||gcs(node),bb=d._usesBorderBox(node),pb=bb?_2b0:d._getPadBorderExtents(node,s);
if(d.isWebKit){
if(d._isButtonTag(node)){
var ns=node.style;
if(_2aa>=0&&!ns.width){
ns.width="4px";
}
if(_2ab>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(node,s);
if(_2aa>=0){
_2aa=Math.max(_2aa-pb.w-mb.w,0);
}
if(_2ab>=0){
_2ab=Math.max(_2ab-pb.h-mb.h,0);
}
d._setBox(node,_2a8,_2a9,_2aa,_2ab);
};
var _2b0={l:0,t:0,w:0,h:0};
dojo.marginBox=function(node,box){
var n=d.byId(node),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(node,box){
var n=d.byId(node),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _2bd=function(node,prop){
if(!(node=(node||0).parentNode)){
return 0;
}
var val,_2c1=0,_b=d.body();
while(node&&node.style){
if(gcs(node).position=="fixed"){
return 0;
}
val=node[prop];
if(val){
_2c1+=val-0;
if(node==_b){
break;
}
}
node=node.parentNode;
}
return _2c1;
};
dojo._docScroll=function(){
var _b=d.body(),_w=d.global,de=d.doc.documentElement;
return {y:(_w.pageYOffset||de.scrollTop||_b.scrollTop||0),x:(_w.pageXOffset||d._fixIeBiDiScrollLeft(de.scrollLeft)||_b.scrollLeft||0)};
};
dojo._isBodyLtr=function(){
return ("_bodyLtr" in d)?d._bodyLtr:d._bodyLtr=gcs(d.body()).direction=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<7){
return {x:d._isBodyLtr()||window.parent==window?de.clientLeft:de.offsetWidth-de.clientWidth-de.clientLeft,y:de.clientTop};
}else{
if(d.isIE<8){
return {x:de.getBoundingClientRect().left,y:de.getBoundingClientRect().top};
}else{
return {x:0,y:0};
}
}
};
dojo._fixIeBiDiScrollLeft=function(_2c7){
var dd=d.doc;
if(d.isIE&&!d._isBodyLtr()){
var de=dd.compatMode=="BackCompat"?dd.body:dd.documentElement;
return _2c7+de.clientWidth-de.scrollWidth;
}
return _2c7;
};
dojo._abs=function(node,_2cb){
var db=d.body(),dh=d.body().parentNode,ret;
if(node["getBoundingClientRect"]){
var _2cf=node.getBoundingClientRect();
ret={x:_2cf.left,y:_2cf.top};
if(d.isFF>=3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
if(d.isIE){
var _2d1=d._getIeDocumentElementOffset();
ret.x-=_2d1.x+(d.isQuirks?db.clientLeft:0);
ret.y-=_2d1.y+(d.isQuirks?db.clientTop:0);
}
}else{
ret={x:0,y:0};
if(node["offsetParent"]){
ret.x-=_2bd(node,"scrollLeft");
ret.y-=_2bd(node,"scrollTop");
var _2d2=node;
do{
var n=_2d2.offsetLeft,t=_2d2.offsetTop;
ret.x+=isNaN(n)?0:n;
ret.y+=isNaN(t)?0:t;
cs=gcs(_2d2);
if(_2d2!=node){
if(d.isFF){
ret.x+=2*px(_2d2,cs.borderLeftWidth);
ret.y+=2*px(_2d2,cs.borderTopWidth);
}else{
ret.x+=px(_2d2,cs.borderLeftWidth);
ret.y+=px(_2d2,cs.borderTopWidth);
}
}
if(d.isFF&&cs.position=="static"){
var _2d5=_2d2.parentNode;
while(_2d5!=_2d2.offsetParent){
var pcs=gcs(_2d5);
if(pcs.position=="static"){
ret.x+=px(_2d2,pcs.borderLeftWidth);
ret.y+=px(_2d2,pcs.borderTopWidth);
}
_2d5=_2d5.parentNode;
}
}
_2d2=_2d2.offsetParent;
}while((_2d2!=dh)&&_2d2);
}else{
if(node.x&&node.y){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
if(_2cb){
var _2d7=d._docScroll();
ret.x+=_2d7.x;
ret.y+=_2d7.y;
}
return ret;
};
dojo.coords=function(node,_2d9){
var n=d.byId(node),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d._abs(n,_2d9);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _2de=d.isIE<8;
var _2df=function(name){
switch(name.toLowerCase()){
case "tabindex":
return _2de?"tabIndex":"tabindex";
case "readonly":
return "readOnly";
case "class":
return "className";
case "for":
case "htmlfor":
return _2de?"htmlFor":"for";
default:
return name;
}
};
var _2e1={colspan:"colSpan",enctype:"enctype",frameborder:"frameborder",method:"method",rowspan:"rowSpan",scrolling:"scrolling",shape:"shape",span:"span",type:"type",valuetype:"valueType",classname:"className",innerhtml:"innerHTML"};
dojo.hasAttr=function(node,name){
node=d.byId(node);
var _2e4=_2df(name);
_2e4=_2e4=="htmlFor"?"for":_2e4;
var attr=node.getAttributeNode&&node.getAttributeNode(_2e4);
return attr?attr.specified:false;
};
var _2e6={},_ctr=0,_2e8=dojo._scopeName+"attrid",_2e9={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(node,name,_2ec){
node=d.byId(node);
var args=arguments.length;
if(args==2&&!d.isString(name)){
for(var x in name){
d.attr(node,x,name[x]);
}
return;
}
name=_2df(name);
if(args==3){
if(d.isFunction(_2ec)){
var _2ef=d.attr(node,_2e8);
if(!_2ef){
_2ef=_ctr++;
d.attr(node,_2e8,_2ef);
}
if(!_2e6[_2ef]){
_2e6[_2ef]={};
}
var h=_2e6[_2ef][name];
if(h){
d.disconnect(h);
}else{
try{
delete node[name];
}
catch(e){
}
}
_2e6[_2ef][name]=d.connect(node,name,_2ec);
}else{
if(typeof _2ec=="boolean"){
node[name]=_2ec;
}else{
if(name==="style"&&!d.isString(_2ec)){
d.style(node,_2ec);
}else{
if(name=="className"){
node.className=_2ec;
}else{
if(name==="innerHTML"){
if(d.isIE&&node.tagName.toLowerCase() in _2e9){
d.empty(node);
node.appendChild(d._toDom(_2ec,node.ownerDocument));
}else{
node[name]=_2ec;
}
}else{
node.setAttribute(name,_2ec);
}
}
}
}
}
}else{
var prop=_2e1[name.toLowerCase()];
if(prop){
return node[prop];
}
var _2f2=node[name];
return (typeof _2f2=="boolean"||typeof _2f2=="function")?_2f2:(d.hasAttr(node,name)?node.getAttribute(name):null);
}
};
dojo.removeAttr=function(node,name){
d.byId(node).removeAttribute(_2df(name));
};
dojo.create=function(tag,_2f6,_2f7,pos){
var doc=d.doc;
if(_2f7){
_2f7=d.byId(_2f7);
doc=_2f7.ownerDocument;
}
if(d.isString(tag)){
tag=doc.createElement(tag);
}
if(_2f6){
d.attr(tag,_2f6);
}
if(_2f7){
d.place(tag,_2f7,pos);
}
return tag;
};
d.empty=d.isIE?function(node){
node=d.byId(node);
for(var c;c=node.lastChild;){
d.destroy(c);
}
}:function(node){
d.byId(node).innerHTML="";
};
var _2fd={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_2fe=/<\s*([\w\:]+)/,_2ff={},_300=0,_301="__"+d._scopeName+"ToDomId";
for(var _302 in _2fd){
var tw=_2fd[_302];
tw.pre=_302=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
d._toDom=function(frag,doc){
doc=doc||d.doc;
var _306=doc[_301];
if(!_306){
doc[_301]=_306=++_300+"";
_2ff[_306]=doc.createElement("div");
}
frag+="";
var _307=frag.match(_2fe),tag=_307?_307[1].toLowerCase():"",_309=_2ff[_306],wrap,i,fc,df;
if(_307&&_2fd[tag]){
wrap=_2fd[tag];
_309.innerHTML=wrap.pre+frag+wrap.post;
for(i=wrap.length;i;--i){
_309=_309.firstChild;
}
}else{
_309.innerHTML=frag;
}
if(_309.childNodes.length==1){
return _309.removeChild(_309.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_309.firstChild){
df.appendChild(fc);
}
return df;
};
var _30d="className";
dojo.hasClass=function(node,_30f){
return ((" "+d.byId(node)[_30d]+" ").indexOf(" "+_30f+" ")>=0);
};
dojo.addClass=function(node,_311){
node=d.byId(node);
var cls=node[_30d];
if((" "+cls+" ").indexOf(" "+_311+" ")<0){
node[_30d]=cls+(cls?" ":"")+_311;
}
};
dojo.removeClass=function(node,_314){
node=d.byId(node);
var t=d.trim((" "+node[_30d]+" ").replace(" "+_314+" "," "));
if(node[_30d]!=t){
node[_30d]=t;
}
};
dojo.toggleClass=function(node,_317,_318){
if(_318===undefined){
_318=!d.hasClass(node,_317);
}
d[_318?"addClass":"removeClass"](node,_317);
};
})();
}
if(!dojo._hasResource["dojo._base.NodeList"]){
dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
(function(){
var d=dojo;
var ap=Array.prototype,aps=ap.slice,apc=ap.concat;
var tnl=function(a){
a.constructor=d.NodeList;
dojo._mixin(a,d.NodeList.prototype);
return a;
};
var _31f=function(f,a,o){
a=[0].concat(aps.call(a,0));
o=o||d.global;
return function(node){
a[0]=node;
return f.apply(o,a);
};
};
var _324=function(f,o){
return function(){
this.forEach(_31f(f,arguments,o));
return this;
};
};
var _327=function(f,o){
return function(){
return this.map(_31f(f,arguments,o));
};
};
var _32a=function(f,o){
return function(){
return this.filter(_31f(f,arguments,o));
};
};
var _32d=function(f,g,o){
return function(){
var a=arguments,body=_31f(f,a,o);
if(g.call(o||d.global,a)){
return this.map(body);
}
this.forEach(body);
return this;
};
};
var _333=function(a){
return a.length==1&&d.isString(a[0]);
};
var _335=function(node){
var p=node.parentNode;
if(p){
p.removeChild(node);
}
};
dojo.NodeList=function(){
return tnl(Array.apply(null,arguments));
};
var nl=d.NodeList,nlp=nl.prototype;
nl._wrap=tnl;
nl._adaptAsMap=_327;
nl._adaptAsForEach=_324;
nl._adaptAsFilter=_32a;
nl._adaptWithCondition=_32d;
d.forEach(["slice","splice"],function(name){
var f=ap[name];
nlp[name]=function(){
return tnl(f.apply(this,arguments));
};
});
d.forEach(["indexOf","lastIndexOf","every","some"],function(name){
var f=d[name];
nlp[name]=function(){
return f.apply(d,[this].concat(aps.call(arguments,0)));
};
});
d.forEach(["attr","style"],function(name){
nlp[name]=_32d(d[name],_333);
});
d.forEach(["connect","addClass","removeClass","toggleClass","empty"],function(name){
nlp[name]=_324(d[name]);
});
dojo.extend(dojo.NodeList,{concat:function(item){
var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){
return a&&!d.isArray(a)&&(a.constructor===NodeList||a.constructor==nl)?aps.call(a,0):a;
});
return tnl(apc.apply(t,m));
},map:function(func,obj){
return tnl(d.map(this,func,obj));
},forEach:function(_346,_347){
d.forEach(this,_346,_347);
return this;
},coords:_327(d.coords),place:function(_348,_349){
var item=d.query(_348)[0];
return this.forEach(function(node){
d.place(node,item,_349);
});
},orphan:function(_34c){
return (_34c?d._filterQueryResult(this,_34c):this).forEach(_335);
},adopt:function(_34d,_34e){
return d.query(_34d).place(item[0],_34e);
},query:function(_34f){
if(!_34f){
return this;
}
var ret=this.map(function(node){
return d.query(_34f,node).filter(function(_352){
return _352!==undefined;
});
});
return tnl(apc.apply([],ret));
},filter:function(_353){
var a=arguments,_355=this,_356=0;
if(d.isString(_353)){
_355=d._filterQueryResult(this,a[0]);
if(a.length==1){
return _355;
}
_356=1;
}
return tnl(d.filter(_355,a[_356],a[_356+1]));
},addContent:function(_357,_358){
var c=d.isString(_357)?d._toDom(_357,this[0]&&this[0].ownerDocument):_357,i,l=this.length-1;
for(i=0;i<l;++i){
d.place(c.cloneNode(true),this[i],_358);
}
if(l>=0){
d.place(c,this[l],_358);
}
return this;
},instantiate:function(_35b,_35c){
var c=d.isFunction(_35b)?_35b:d.getObject(_35b);
_35c=_35c||{};
return this.forEach(function(node){
new c(_35c,node);
});
},at:function(){
var t=new dojo.NodeList();
d.forEach(arguments,function(i){
if(this[i]){
t.push(this[i]);
}
},this);
return t;
}});
d.forEach(["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"],function(evt){
var _oe="on"+evt;
nlp[_oe]=function(a,b){
return this.connect(_oe,a,b);
};
});
})();
}
if(!dojo._hasResource["dojo._base.query"]){
dojo._hasResource["dojo._base.query"]=true;
if(typeof dojo!="undefined"){
dojo.provide("dojo._base.query");
}
(function(d){
var trim=d.trim;
var each=d.forEach;
var qlc=d._queryListCtor=d.NodeList;
var _369=d.isString;
var _36a=function(){
return d.doc;
};
var _36b=(d.isWebKit&&((_36a().compatMode)=="BackCompat"));
var _36c=!!_36a().firstChild["children"]?"children":"childNodes";
var _36d=">~+";
var _36e=false;
var _36f=function(){
return true;
};
var _370=function(_371){
if(_36d.indexOf(_371.slice(-1))>=0){
_371+=" * ";
}else{
_371+=" ";
}
var ts=function(s,e){
return trim(_371.slice(s,e));
};
var _375=[];
var _376=-1,_377=-1,_378=-1,_379=-1,_37a=-1,inId=-1,_37c=-1,lc="",cc="",_37f;
var x=0,ql=_371.length,_382=null,_cp=null;
var _384=function(){
if(_37c>=0){
var tv=(_37c==x)?null:ts(_37c,x);
_382[(_36d.indexOf(tv)<0)?"tag":"oper"]=tv;
_37c=-1;
}
};
var _386=function(){
if(inId>=0){
_382.id=ts(inId,x).replace(/\\/g,"");
inId=-1;
}
};
var _387=function(){
if(_37a>=0){
_382.classes.push(ts(_37a+1,x).replace(/\\/g,""));
_37a=-1;
}
};
var _388=function(){
_386();
_384();
_387();
};
var _389=function(){
_388();
if(_379>=0){
_382.pseudos.push({name:ts(_379+1,x)});
}
_382.loops=(_382.pseudos.length||_382.attrs.length||_382.classes.length);
_382.oquery=_382.query=ts(_37f,x);
_382.otag=_382.tag=(_382["oper"])?null:(_382.tag||"*");
if(_382.tag){
_382.tag=_382.tag.toUpperCase();
}
if(_375.length&&(_375[_375.length-1].oper)){
_382.infixOper=_375.pop();
_382.query=_382.infixOper.query+" "+_382.query;
}
_375.push(_382);
_382=null;
};
for(;lc=cc,cc=_371.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_382){
_37f=x;
_382={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_36e)?this.otag:this.tag;
}};
_37c=x;
}
if(_376>=0){
if(cc=="]"){
if(!_cp.attr){
_cp.attr=ts(_376+1,x);
}else{
_cp.matchFor=ts((_378||_376+1),x);
}
var cmf=_cp.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_cp.matchFor=cmf.slice(1,-1);
}
}
_382.attrs.push(_cp);
_cp=null;
_376=_378=-1;
}else{
if(cc=="="){
var _38b=("|~^$*".indexOf(lc)>=0)?lc:"";
_cp.type=_38b+cc;
_cp.attr=ts(_376+1,x-_38b.length);
_378=x+1;
}
}
}else{
if(_377>=0){
if(cc==")"){
if(_379>=0){
_cp.value=ts(_377+1,x);
}
_379=_377=-1;
}
}else{
if(cc=="#"){
_388();
inId=x+1;
}else{
if(cc=="."){
_388();
_37a=x;
}else{
if(cc==":"){
_388();
_379=x;
}else{
if(cc=="["){
_388();
_376=x;
_cp={};
}else{
if(cc=="("){
if(_379>=0){
_cp={name:ts(_379+1,x),value:null};
_382.pseudos.push(_cp);
}
_377=x;
}else{
if((cc==" ")&&(lc!=cc)){
_389();
}
}
}
}
}
}
}
}
}
return _375;
};
var _38c=function(_38d,_38e){
if(!_38d){
return _38e;
}
if(!_38e){
return _38d;
}
return function(){
return _38d.apply(window,arguments)&&_38e.apply(window,arguments);
};
};
var _38f=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _393=function(n){
return (1==n.nodeType);
};
var _395="";
var _396=function(elem,attr){
if(!elem){
return _395;
}
if(attr=="class"){
return elem.className||_395;
}
if(attr=="for"){
return elem.htmlFor||_395;
}
if(attr=="style"){
return elem.style.cssText||_395;
}
return (_36e?elem.getAttribute(attr):elem.getAttribute(attr,2))||_395;
};
var _399={"*=":function(attr,_39b){
return function(elem){
return (_396(elem,attr).indexOf(_39b)>=0);
};
},"^=":function(attr,_39e){
return function(elem){
return (_396(elem,attr).indexOf(_39e)==0);
};
},"$=":function(attr,_3a1){
var tval=" "+_3a1;
return function(elem){
var ea=" "+_396(elem,attr);
return (ea.lastIndexOf(_3a1)==(ea.length-_3a1.length));
};
},"~=":function(attr,_3a6){
var tval=" "+_3a6+" ";
return function(elem){
var ea=" "+_396(elem,attr)+" ";
return (ea.indexOf(tval)>=0);
};
},"|=":function(attr,_3ab){
var _3ac=" "+_3ab+"-";
return function(elem){
var ea=" "+_396(elem,attr);
return ((ea==_3ab)||(ea.indexOf(_3ac)==0));
};
},"=":function(attr,_3b0){
return function(elem){
return (_396(elem,attr)==_3b0);
};
}};
var _3b2=(typeof _36a().firstChild.nextElementSibling=="undefined");
var _ns=!_3b2?"nextElementSibling":"nextSibling";
var _ps=!_3b2?"previousElementSibling":"previousSibling";
var _3b5=(_3b2?_393:_36f);
var _3b6=function(node){
while(node=node[_ps]){
if(_3b5(node)){
return false;
}
}
return true;
};
var _3b8=function(node){
while(node=node[_ns]){
if(_3b5(node)){
return false;
}
}
return true;
};
var _3ba=function(node){
var root=node.parentNode;
var i=0,tret=root[_36c],ci=(node["_i"]||-1),cl=(root["_l"]||-1);
if(!tret){
return -1;
}
var l=tret.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
root["_l"]=l;
ci=-1;
for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_ns]){
if(_3b5(te)){
te["_i"]=++i;
if(node===te){
ci=i;
}
}
}
return ci;
};
var _3c3=function(elem){
return !((_3ba(elem))%2);
};
var _3c5=function(elem){
return ((_3ba(elem))%2);
};
var _3c7={"checked":function(name,_3c9){
return function(elem){
return !!d.attr(elem,"checked");
};
},"first-child":function(){
return _3b6;
},"last-child":function(){
return _3b8;
},"only-child":function(name,_3cc){
return function(node){
if(!_3b6(node)){
return false;
}
if(!_3b8(node)){
return false;
}
return true;
};
},"empty":function(name,_3cf){
return function(elem){
var cn=elem.childNodes;
var cnl=elem.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(name,_3d6){
var cz=_3d6.charAt(0);
if(cz=="\""||cz=="'"){
_3d6=_3d6.slice(1,-1);
}
return function(elem){
return (elem.innerHTML.indexOf(_3d6)>=0);
};
},"not":function(name,_3da){
var p=_370(_3da)[0];
var _3dc={el:1};
if(p.tag!="*"){
_3dc.tag=1;
}
if(!p.classes.length){
_3dc.classes=1;
}
var ntf=_3de(p,_3dc);
return function(elem){
return (!ntf(elem));
};
},"nth-child":function(name,_3e1){
var pi=parseInt;
if(_3e1=="odd"){
return _3c5;
}else{
if(_3e1=="even"){
return _3c3;
}
}
if(_3e1.indexOf("n")!=-1){
var _3e3=_3e1.split("n",2);
var pred=_3e3[0]?((_3e3[0]=="-")?-1:pi(_3e3[0])):1;
var idx=_3e3[1]?pi(_3e3[1]):0;
var lb=0,ub=-1;
if(pred>0){
if(idx<0){
idx=(idx%pred)&&(pred+(idx%pred));
}else{
if(idx>0){
if(idx>=pred){
lb=idx-idx%pred;
}
idx=idx%pred;
}
}
}else{
if(pred<0){
pred*=-1;
if(idx>0){
ub=idx;
idx=idx%pred;
}
}
}
if(pred>0){
return function(elem){
var i=_3ba(elem);
return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);
};
}else{
_3e1=idx;
}
}
var _3ea=pi(_3e1);
return function(elem){
return (_3ba(elem)==_3ea);
};
}};
var _3ec=(d.isIE)?function(cond){
var clc=cond.toLowerCase();
if(clc=="class"){
cond="className";
}
return function(elem){
return (_36e?elem.getAttribute(cond):elem[cond]||elem[clc]);
};
}:function(cond){
return function(elem){
return (elem&&elem.getAttribute&&elem.hasAttribute(cond));
};
};
var _3de=function(_3f2,_3f3){
if(!_3f2){
return _36f;
}
_3f3=_3f3||{};
var ff=null;
if(!("el" in _3f3)){
ff=_38c(ff,_393);
}
if(!("tag" in _3f3)){
if(_3f2.tag!="*"){
ff=_38c(ff,function(elem){
return (elem&&(elem.tagName==_3f2.getTag()));
});
}
}
if(!("classes" in _3f3)){
each(_3f2.classes,function(_3f6,idx,arr){
var re=new RegExp("(?:^|\\s)"+_3f6+"(?:\\s|$)");
ff=_38c(ff,function(elem){
return re.test(elem.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _3f3)){
each(_3f2.pseudos,function(_3fb){
var pn=_3fb.name;
if(_3c7[pn]){
ff=_38c(ff,_3c7[pn](pn,_3fb.value));
}
});
}
if(!("attrs" in _3f3)){
each(_3f2.attrs,function(attr){
var _3fe;
var a=attr.attr;
if(attr.type&&_399[attr.type]){
_3fe=_399[attr.type](a,attr.matchFor);
}else{
if(a.length){
_3fe=_3ec(a);
}
}
if(_3fe){
ff=_38c(ff,_3fe);
}
});
}
if(!("id" in _3f3)){
if(_3f2.id){
ff=_38c(ff,function(elem){
return (!!elem&&(elem.id==_3f2.id));
});
}
}
if(!ff){
if(!("default" in _3f3)){
ff=_36f;
}
}
return ff;
};
var _401=function(_402){
return function(node,ret,bag){
while(node=node[_ns]){
if(_3b2&&(!_393(node))){
continue;
}
if((!bag||_406(node,bag))&&_402(node)){
ret.push(node);
}
break;
}
return ret;
};
};
var _407=function(_408){
return function(root,ret,bag){
var te=root[_ns];
while(te){
if(_3b5(te)){
if(bag&&!_406(te,bag)){
break;
}
if(_408(te)){
ret.push(te);
}
}
te=te[_ns];
}
return ret;
};
};
var _40d=function(_40e){
_40e=_40e||_36f;
return function(root,ret,bag){
var te,x=0,tret=root[_36c];
while(te=tret[x++]){
if(_3b5(te)&&(!bag||_406(te,bag))&&(_40e(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _415=function(node,root){
var pn=node.parentNode;
while(pn){
if(pn==root){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _419={};
var _41a=function(_41b){
var _41c=_419[_41b.query];
if(_41c){
return _41c;
}
var io=_41b.infixOper;
var oper=(io?io.oper:"");
var _41f=_3de(_41b,{el:1});
var qt=_41b.tag;
var _421=("*"==qt);
var ecs=_36a()["getElementsByClassName"];
if(!oper){
if(_41b.id){
_41f=(!_41b.loops&&_421)?_36f:_3de(_41b,{el:1,id:1});
_41c=function(root,arr){
var te=d.byId(_41b.id,(root.ownerDocument||root));
if(!_41f(te)){
return;
}
if(9==root.nodeType){
return _38f(te,arr);
}else{
if(_415(te,root)){
return _38f(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_41b.classes.length&&!_36b){
_41f=_3de(_41b,{el:1,classes:1,id:1});
var _426=_41b.classes.join(" ");
_41c=function(root,arr){
var ret=_38f(0,arr),te,x=0;
var tret=root.getElementsByClassName(_426);
while((te=tret[x++])){
if(_41f(te,root)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_421&&!_41b.loops){
_41c=function(root,arr){
var ret=_38f(0,arr),te,x=0;
var tret=root.getElementsByTagName(_41b.getTag());
while((te=tret[x++])){
ret.push(te);
}
return ret;
};
}else{
_41f=_3de(_41b,{el:1,tag:1,id:1});
_41c=function(root,arr){
var ret=_38f(0,arr),te,x=0;
var tret=root.getElementsByTagName(_41b.getTag());
while((te=tret[x++])){
if(_41f(te,root)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _439={el:1};
if(_421){
_439.tag=1;
}
_41f=_3de(_41b,_439);
if("+"==oper){
_41c=_401(_41f);
}else{
if("~"==oper){
_41c=_407(_41f);
}else{
if(">"==oper){
_41c=_40d(_41f);
}
}
}
}
return _419[_41b.query]=_41c;
};
var _43a=function(root,_43c){
var _43d=_38f(root),qp,x,te,qpl=_43c.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_43c[i];
x=_43d.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_41a(qp);
while(te=_43d[x--]){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_43d=ret;
}
return ret;
};
var _446={},_447={};
var _448=function(_449){
var _44a=_370(trim(_449));
if(_44a.length==1){
var tef=_41a(_44a[0]);
return function(root){
var r=tef(root,new qlc());
if(r){
r.nozip=true;
}
return r;
};
}
return function(root){
return _43a(root,_44a);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _451=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _452=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _454=(!!_36a()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_451));
var _455=function(_456,_457){
if(_454){
var _458=_447[_456];
if(_458&&!_457){
return _458;
}
}
var _459=_446[_456];
if(_459){
return _459;
}
var qcz=_456.charAt(0);
var _45b=(-1==_456.indexOf(" "));
if((_456.indexOf("#")>=0)&&(_45b)){
_457=true;
}
var _45c=(_454&&(!_457)&&(_36d.indexOf(qcz)==-1)&&(!d.isIE||(_456.indexOf(":")==-1))&&(!(_36b&&(_456.indexOf(".")>=0)))&&(_456.indexOf(":contains")==-1)&&(_456.indexOf("|=")==-1));
if(_45c){
var tq=(_36d.indexOf(_456.charAt(_456.length-1))>=0)?(_456+" *"):_456;
return _447[_456]=function(root){
try{
if(!((9==root.nodeType)||_45b)){
throw "";
}
var r=root[qsa](tq);
r[_452]=true;
return r;
}
catch(e){
return _455(_456,true)(root);
}
};
}else{
var _460=_456.split(/\s*,\s*/);
return _446[_456]=((_460.length<2)?_448(_456):function(root){
var _462=0,ret=[],tp;
while((tp=_460[_462++])){
ret=ret.concat(_448(tp)(root));
}
return ret;
});
}
};
var _465=0;
var _466=d.isIE?function(node){
if(_36e){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_465)||_465);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_465));
};
var _406=function(node,bag){
if(!bag){
return 1;
}
var id=_466(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _46c="_zipIdx";
var _zip=function(arr){
if(arr&&arr.nozip){
return (qlc._wrap)?qlc._wrap(arr):arr;
}
var ret=new qlc();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_465++;
if(d.isIE&&_36e){
var _470=_465+"";
arr[0].setAttribute(_46c,_470);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_46c)!=_470){
ret.push(te);
}
te.setAttribute(_46c,_470);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_393(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_46c]=_465;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_46c]!=_465){
ret.push(te);
}
te[_46c]=_465;
}
}
}
return ret;
};
d.query=function(_473,root){
if(!_473){
return new qlc();
}
if(_473.constructor==qlc){
return _473;
}
if(!_369(_473)){
return new qlc(_473);
}
if(_369(root)){
root=d.byId(root);
if(!root){
return new qlc();
}
}
root=root||_36a();
var od=root.ownerDocument||root.documentElement;
_36e=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&root.doctype)||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));
var r=_455(_473)(root);
if(r&&r.nozip&&!qlc._wrap){
return r;
}
return _zip(r);
};
d.query.pseudos=_3c7;
d._filterQueryResult=function(_477,_478){
var _479=new d._queryListCtor();
var _47a=_3de(_370(_478)[0]);
for(var x=0,te;te=_477[x];x++){
if(_47a(te)){
_479.push(te);
}
}
return _479;
};
})(this["queryPortability"]||this["acme"]||dojo);
}
if(!dojo._hasResource["dojo._base.xhr"]){
dojo._hasResource["dojo._base.xhr"]=true;
dojo.provide("dojo._base.xhr");
(function(){
var _d=dojo;
function _47e(obj,name,_481){
var val=obj[name];
if(_d.isString(val)){
obj[name]=[val,_481];
}else{
if(_d.isArray(val)){
val.push(_481);
}else{
obj[name]=_481;
}
}
};
dojo.formToObject=function(_483){
var ret={};
var _485="file|submit|image|reset|button|";
_d.forEach(dojo.byId(_483).elements,function(item){
var _in=item.name;
var type=(item.type||"").toLowerCase();
if(_in&&type&&_485.indexOf(type)==-1&&!item.disabled){
if(type=="radio"||type=="checkbox"){
if(item.checked){
_47e(ret,_in,item.value);
}
}else{
if(item.multiple){
ret[_in]=[];
_d.query("option",item).forEach(function(opt){
if(opt.selected){
_47e(ret,_in,opt.value);
}
});
}else{
_47e(ret,_in,item.value);
if(type=="image"){
ret[_in+".x"]=ret[_in+".y"]=ret[_in].x=ret[_in].y=0;
}
}
}
}
});
return ret;
};
dojo.objectToQuery=function(map){
var enc=encodeURIComponent;
var _48c=[];
var _48d={};
for(var name in map){
var _48f=map[name];
if(_48f!=_48d[name]){
var _490=enc(name)+"=";
if(_d.isArray(_48f)){
for(var i=0;i<_48f.length;i++){
_48c.push(_490+enc(_48f[i]));
}
}else{
_48c.push(_490+enc(_48f));
}
}
}
return _48c.join("&");
};
dojo.formToQuery=function(_492){
return _d.objectToQuery(_d.formToObject(_492));
};
dojo.formToJson=function(_493,_494){
return _d.toJson(_d.formToObject(_493),_494);
};
dojo.queryToObject=function(str){
var ret={};
var qp=str.split("&");
var dec=decodeURIComponent;
_d.forEach(qp,function(item){
if(item.length){
var _49a=item.split("=");
var name=dec(_49a.shift());
var val=dec(_49a.join("="));
if(_d.isString(ret[name])){
ret[name]=[ret[name]];
}
if(_d.isArray(ret[name])){
ret[name].push(val);
}else{
ret[name]=val;
}
}
});
return ret;
};
dojo._blockAsync=false;
dojo._contentHandlers={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return _d.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!dojo.config.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _4a0=xhr.responseText;
var _4a1=_4a0.indexOf("/*");
var _4a2=_4a0.lastIndexOf("*/");
if(_4a1==-1||_4a2==-1){
throw new Error("JSON was not comment filtered");
}
return _d.fromJson(_4a0.substring(_4a1+2,_4a2));
},javascript:function(xhr){
return _d.eval(xhr.responseText);
},xml:function(xhr){
var _4a5=xhr.responseXML;
if(_d.isIE&&(!_4a5||!_4a5.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_d.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_4a5=dom;
}
catch(e){
return false;
}
return true;
});
}
return _4a5;
}};
dojo._contentHandlers["json-comment-optional"]=function(xhr){
var _4ac=_d._contentHandlers;
if(xhr.responseText&&xhr.responseText.indexOf("/*")!=-1){
return _4ac["json-comment-filtered"](xhr);
}else{
return _4ac["json"](xhr);
}
};
dojo._ioSetArgs=function(args,_4ae,_4af,_4b0){
var _4b1={args:args,url:args.url};
var _4b2=null;
if(args.form){
var form=_d.byId(args.form);
var _4b4=form.getAttributeNode("action");
_4b1.url=_4b1.url||(_4b4?_4b4.value:null);
_4b2=_d.formToObject(form);
}
var _4b5=[{}];
if(_4b2){
_4b5.push(_4b2);
}
if(args.content){
_4b5.push(args.content);
}
if(args.preventCache){
_4b5.push({"dojo.preventCache":new Date().valueOf()});
}
_4b1.query=_d.objectToQuery(_d.mixin.apply(null,_4b5));
_4b1.handleAs=args.handleAs||"text";
var d=new _d.Deferred(_4ae);
d.addCallbacks(_4af,function(_4b7){
return _4b0(_4b7,d);
});
var ld=args.load;
if(ld&&_d.isFunction(ld)){
d.addCallback(function(_4b9){
return ld.call(args,_4b9,_4b1);
});
}
var err=args.error;
if(err&&_d.isFunction(err)){
d.addErrback(function(_4bb){
return err.call(args,_4bb,_4b1);
});
}
var _4bc=args.handle;
if(_4bc&&_d.isFunction(_4bc)){
d.addBoth(function(_4bd){
return _4bc.call(args,_4bd,_4b1);
});
}
d.ioArgs=_4b1;
return d;
};
var _4be=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _at=typeof xhr.abort;
if(_at=="function"||_at=="object"||_at=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _4c3=function(dfd){
var ret=_d._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _4c6=function(_4c7,dfd){
console.error(_4c7);
return _4c7;
};
var _4c9=null;
var _4ca=[];
var _4cb=function(){
var now=(new Date()).getTime();
if(!_d._blockAsync){
for(var i=0,tif;i<_4ca.length&&(tif=_4ca[i]);i++){
var dfd=tif.dfd;
var func=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_4ca.splice(i--,1);
}else{
if(tif.ioCheck(dfd)){
_4ca.splice(i--,1);
tif.resHandle(dfd);
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_4ca.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
if(!_4ca.length){
clearInterval(_4c9);
_4c9=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_d.forEach(_4ca,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
if(_d.isIE){
_d.addOnWindowUnload(_d._ioCancelAll);
}
_d._ioWatch=function(dfd,_4d4,_4d5,_4d6){
var args=dfd.ioArgs.args;
if(args.timeout){
dfd.startTime=(new Date()).getTime();
}
_4ca.push({dfd:dfd,validCheck:_4d4,ioCheck:_4d5,resHandle:_4d6});
if(!_4c9){
_4c9=setInterval(_4cb,50);
}
if(args.sync){
_4cb();
}
};
var _4d8="application/x-www-form-urlencoded";
var _4d9=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _4db=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _4dd=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_d._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_4e1){
if(_4e1.query.length){
_4e1.url+=(_4e1.url.indexOf("?")==-1?"?":"&")+_4e1.query;
_4e1.query=null;
}
};
dojo.xhr=function(_4e2,args,_4e4){
var dfd=_d._ioSetArgs(args,_4be,_4c3,_4c6);
dfd.ioArgs.xhr=_d._xhrObj(dfd.ioArgs.args);
if(_4e4){
if("postData" in args){
dfd.ioArgs.query=args.postData;
}else{
if("putData" in args){
dfd.ioArgs.query=args.putData;
}
}
}else{
_d._ioAddQueryToUrl(dfd.ioArgs);
}
var _4e6=dfd.ioArgs;
var xhr=_4e6.xhr;
xhr.open(_4e2,_4e6.url,args.sync!==true,args.user||undefined,args.password||undefined);
if(args.headers){
for(var hdr in args.headers){
if(hdr.toLowerCase()==="content-type"&&!args.contentType){
args.contentType=args.headers[hdr];
}else{
xhr.setRequestHeader(hdr,args.headers[hdr]);
}
}
}
xhr.setRequestHeader("Content-Type",args.contentType||_4d8);
if(!args.headers||!args.headers["X-Requested-With"]){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(dojo.config.debugAtAllCosts){
xhr.send(_4e6.query);
}else{
try{
xhr.send(_4e6.query);
}
catch(e){
dfd.ioArgs.error=e;
dfd.cancel();
}
}
_d._ioWatch(dfd,_4d9,_4db,_4dd);
xhr=null;
return dfd;
};
dojo.xhrGet=function(args){
return _d.xhr("GET",args);
};
dojo.rawXhrPost=dojo.xhrPost=function(args){
return _d.xhr("POST",args,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(args){
return _d.xhr("PUT",args,true);
};
dojo.xhrDelete=function(args){
return _d.xhr("DELETE",args);
};
})();
}
if(!dojo._hasResource["dojo._base.fx"]){
dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
(function(){
var d=dojo;
var _4ee=d.mixin;
dojo._Line=function(_4ef,end){
this.start=_4ef;
this.end=end;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
d.declare("dojo._Animation",null,{constructor:function(args){
_4ee(this,args);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
},duration:350,repeat:0,rate:10,_percent:0,_startRepeatCount:0,_fire:function(evt,args){
if(this[evt]){
if(dojo.config.debugAtAllCosts){
this[evt].apply(this,args||[]);
}else{
try{
this[evt].apply(this,args||[]);
}
catch(e){
console.error("exception in animation handler for:",evt);
console.error(e);
}
}
}
return this;
},play:function(_4f5,_4f6){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
if(_4f6){
_t._stopTimer();
_t._active=_t._paused=false;
_t._percent=0;
}else{
if(_t._active&&!_t._paused){
return _t;
}
}
_t._fire("beforeBegin");
var de=_4f5||_t.delay,_p=dojo.hitch(_t,"_play",_4f6);
if(de>0){
_t._delayTimer=setTimeout(_p,de);
return _t;
}
_p();
return _t;
},_play:function(_4fa){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
_t._startTime=new Date().valueOf();
if(_t._paused){
_t._startTime-=_t.duration*_t._percent;
}
_t._endTime=_t._startTime+_t.duration;
_t._active=true;
_t._paused=false;
var _4fc=_t.curve.getValue(_t._percent);
if(!_t._percent){
if(!_t._startRepeatCount){
_t._startRepeatCount=_t.repeat;
}
_t._fire("onBegin",[_4fc]);
}
_t._fire("onPlay",[_4fc]);
_t._cycle();
return _t;
},pause:function(){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
_t._stopTimer();
if(!_t._active){
return _t;
}
_t._paused=true;
_t._fire("onPause",[_t.curve.getValue(_t._percent)]);
return _t;
},gotoPercent:function(_4fe,_4ff){
var _t=this;
_t._stopTimer();
_t._active=_t._paused=true;
_t._percent=_4fe;
if(_4ff){
_t.play();
}
return _t;
},stop:function(_501){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
if(!_t._timer){
return _t;
}
_t._stopTimer();
if(_501){
_t._percent=1;
}
_t._fire("onStop",[_t.curve.getValue(_t._percent)]);
_t._active=_t._paused=false;
return _t;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _t=this;
if(_t._active){
var curr=new Date().valueOf();
var step=(curr-_t._startTime)/(_t._endTime-_t._startTime);
if(step>=1){
step=1;
}
_t._percent=step;
if(_t.easing){
step=_t.easing(step);
}
_t._fire("onAnimate",[_t.curve.getValue(step)]);
if(_t._percent<1){
_t._startTimer();
}else{
_t._active=false;
if(_t.repeat>0){
_t.repeat--;
_t.play(null,true);
}else{
if(_t.repeat==-1){
_t.play(null,true);
}else{
if(_t._startRepeatCount){
_t.repeat=_t._startRepeatCount;
_t._startRepeatCount=0;
}
}
}
_t._percent=0;
_t._fire("onEnd");
_t._stopTimer();
}
}
return _t;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_507=[],_508=null,_509={run:function(){
}};
dojo._Animation.prototype._startTimer=function(){
if(!this._timer){
this._timer=d.connect(_509,"run",this,"_cycle");
ctr++;
}
if(!_508){
_508=setInterval(d.hitch(_509,"run"),this.rate);
}
};
dojo._Animation.prototype._stopTimer=function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_508);
_508=null;
ctr=0;
}
};
var _50a=d.isIE?function(node){
var ns=node.style;
if(!ns.width.length&&d.style(node,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(args){
args.node=d.byId(args.node);
var _50e=_4ee({properties:{}},args),_50f=(_50e.properties.opacity={});
_50f.start=!("start" in _50e)?function(){
return +d.style(_50e.node,"opacity")||0;
}:_50e.start;
_50f.end=_50e.end;
var anim=d.animateProperty(_50e);
d.connect(anim,"beforeBegin",d.partial(_50a,_50e.node));
return anim;
};
dojo.fadeIn=function(args){
return d._fade(_4ee({end:1},args));
};
dojo.fadeOut=function(args){
return d._fade(_4ee({end:0},args));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _514=function(_515){
this._properties=_515;
for(var p in _515){
var prop=_515[p];
if(prop.start instanceof d.Color){
prop.tempColor=new d.Color();
}
}
};
_514.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var prop=this._properties[p],_51c=prop.start;
if(_51c instanceof d.Color){
ret[p]=d.blendColors(_51c,prop.end,r,prop.tempColor).toCss();
}else{
if(!d.isArray(_51c)){
ret[p]=((prop.end-_51c)*r)+_51c+(p!="opacity"?prop.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(args){
args.node=d.byId(args.node);
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d._Animation(args);
d.connect(anim,"beforeBegin",anim,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var prop=this.properties[p];
prop=pm[p]=_4ee({},(d.isObject(prop)?prop:{end:prop}));
if(d.isFunction(prop.start)){
prop.start=prop.start();
}
if(d.isFunction(prop.end)){
prop.end=prop.end();
}
var _522=(p.toLowerCase().indexOf("color")>=0);
function _523(node,p){
var v={height:node.offsetHeight,width:node.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(node,p);
return (p=="opacity")?+v:(_522?v:parseFloat(v));
};
if(!("end" in prop)){
prop.end=_523(this.node,p);
}else{
if(!("start" in prop)){
prop.start=_523(this.node,p);
}
}
if(_522){
prop.start=new d.Color(prop.start);
prop.end=new d.Color(prop.end);
}else{
prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);
}
}
this.curve=new _514(pm);
});
d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));
return anim;
};
dojo.anim=function(node,_528,_529,_52a,_52b,_52c){
return d.animateProperty({node:node,duration:_529||d._Animation.prototype.duration,properties:_528,easing:_52a,onEnd:_52b}).play(_52c||0);
};
})();
}
if(!dojo._hasResource["dojo._base.browser"]){
dojo._hasResource["dojo._base.browser"]=true;
dojo.provide("dojo._base.browser");
dojo.forEach(dojo.config.require,function(i){
dojo["require"](i);
});
}
if(!dojo._hasResource["plugd.base"]){
dojo._hasResource["plugd.base"]=true;
dojo.provide("plugd.base");
(function(d){
var _52f=d.place,_530=d.style,_531="display",_532="visibility",_533={"slow":1800,"fast":420,"mild":900},_534=d.config.keepLayout||false,_535=_534?_532:_531,_536=_534?"hidden":"none",_537=_534?"visible":(d.config.useBlock?"block":""),_538=function(arg){
return (arg in _533)?_533[arg]:_533.fast;
},_53a=d.NodeList,_53b=_53a.prototype,_53c=_53a._adaptAsForEach,_53d,_53e=0,_53f="mouse"+(d.isIE?"enter":"over");
d.unique=function(_540,b){
do{
_53d=(b||"djid_")+(++_53e);
}while(_540(_53d));
return _53d;
};
d.generateId=function(b){
return d.unique(d.byId,b);
};
d.show=function(n,arg){
if(!arg){
_530(n,_535,_537);
}else{
if(d.isString(arg)){
_530(n,"opacity",0);
d.show(n);
d.anim(n,{opacity:1},_538(arg));
}
}
};
d.hide=function(n,arg){
if(!arg){
_530(n,_535,_536);
}else{
if(d.isString(arg)){
_530(n,"opacity",1);
d.anim(n,{opacity:0},_538(arg),null,d.hitch(d,"hide",n));
}
}
};
d.wrap=function(n,_548){
var _549=d.create(_548);
_52f(_549,n,"before");
_52f(n,_549,"first");
return _549;
};
d.toggle=function(n,_54b){
n=d.byId(n);
d[(n.style[_535]==_536?"show":"hide")](n,_54b);
};
d.qw=function(str){
return str?d.map(str.split(/\ +/),d.trim):[];
};
d._createFrom=d._toDom;
d.create=function(_54d,_54e,_54f,pos){
var n=_54d.charAt(0)=="<"?d._createFrom(_54d):d.doc.createElement(_54d);
if(_54e){
d.attr(n,_54e);
}
if(_54f){
_52f(n,_54f,pos);
}
return n;
};
d.sub=d.subscribe;
d.pub=function(){
var a=d._toArray(arguments);
d.publish(a.shift(),a);
};
if(!_53a._mapIn){
_53a._mapIn=function(func,nyet,s){
return _53c(func,s||d);
};
}
d.extend(_53a,{show:_53c(d.show),hide:_53c(d.hide),toggle:_53c(d.toggle),destroy:_53c(d.destroy),create:function(_556){
return this._stash(this.map(function(){
return d.create(_556);
}));
},clone:function(){
return this._stash(this.map(function(n){
return d.clone(n);
}));
},animate:function(_558,_559,_55a,_55b){
return this.forEach(function(n,i,a){
var anim=d.anim(n,_558,_559,_55a);
if(_55b&&i==a.length-1){
d.connect(anim,"onEnd",_55b);
}
});
},wrap:function(_560,_561){
var nl=new _53a();
this.forEach(function(n){
nl.push(d.wrap(n,_560));
});
return !_561?this:this._stash(nl);
},appendTo:function(_564){
var _565=d.query(_564);
return _565.length?this.forEach(function(n){
_52f(n,_565[0]);
}):this;
},append:function(_567,_568){
var _569=d.query(_567);
if(_569.length){
_569=_569[0];
this.forEach(function(n){
_52f((_568?d.clone(_569):_569),n);
});
}
return this;
},val:function(_56b){
var v,a="value";
if(_56b){
return this.attr(a,_56b);
}else{
v=this.attr(a);
return v.length===1?v[0]:v;
}
},hover:function(over,out){
return this.onmouseenter(over).onmouseleave(out||over);
},hoverClass:function(_570){
return this.hover(function(e){
d[(e.type==_53f?"addClass":"removeClass")](e.target,_570);
});
},_stash:function(nl){
nl.__last=this;
return nl;
},end:function(){
return this.__last||this;
}});
var _573=d.query;
d.query=function(_574,_575){
var c=d.isString(_574)&&_574.charAt(0)=="<";
return _573(c?d.create(_574):_574,_575);
};
d.conflict=function(){
$=d.mixin(function(){
return d.mixin(d.query.apply(this,arguments),$.fn);
},{fn:{}});
$.fn.ready=d.addOnLoad;
d.config.conflict=true;
};
if(d.config.conflict){
d.conflict();
}
})(dojo);
}
if(dojo.config.afterOnLoad&&dojo.isBrowser){
window.setTimeout(dojo._loadInit,1000);
}
})();
