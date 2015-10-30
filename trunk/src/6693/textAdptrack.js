function adptrack(ws,s, graph){
	this.s=s=='db1.adpower.cn'?'ana.adpower.cn':s;
	this.ct=null;
	this.g={};
	this.set('w',ws);
	this.set('r',document.referrer);
	this.set('url',document.location.href);
	this.set('bw',this.ua());
	this.listen();
	this.done=0;
	document.write('<a href="http://www.adpower.cn" target="_blank">ADPower</a>');
};
adptrack.prototype.set=function(key,value){
	this.g[key]=value;
};
adptrack.prototype.pageCut=function(isc,level){
	if(typeof isc=='number'){
		this.set('isc',isc);
		this.set('lev',level||0);
	}
};
adptrack.prototype.setTitle=function(y,t){
	this.set('t',(t&&t)||(y==1&&document.title)||'');
};
adptrack.prototype.scr=function(){
	this.set('res',screen.width+'x'+screen.height);
};
adptrack.prototype.ja=function(){
	this.set('java',navigator.javaEnabled()?'1':'0');
};
adptrack.prototype.co=function(){
	this.set('cookied',navigator.cookieEnabled?'1':'0');
};
adptrack.prototype.col=function(){
	this.set('col',screen.colorDepth);
};
adptrack.prototype.ua=function(){
	var _ua=navigator.userAgent.toLowerCase();
	if(_ua.indexOf('msie ')>-1){
		if(_ua.indexOf('msie 8.')>-1){
			return 4;
		}
		if(_ua.indexOf('msie 7.')>-1){
			return 3;
		}
		if(_ua.indexOf('msie 6.')>-1){
			return 2;
		}
		return 1;
	}else if(_ua.indexOf('firefox')>-1){
		return 5;
	}else if(_ua.indexOf('chrome')>-1){
		return 8;
	}else if(_ua.indexOf('opera')>-1){
		return 7;
	}else if(_ua.indexOf('safari')>-1){
		return 6;
	}
	return 0;
};
adptrack.prototype.es=function(s){
	return typeof(encodeURIComponent)=='function'?encodeURIComponent(s):escape(s);
};

adptrack.prototype.trackConvert=function(c,v,ref){
	if(!c)return;
	this.set('u',ref||document.location);
	this.set('imp',c);
	this.set('pri',v||1);
	this.send('invert.php');
};
adptrack.prototype.trackAction=function(c,v,ref,cid){
	if(!c)return;
	this.set('u',(ref&&ref)||document.location);
	this.set('imp',c);
	this.set('pri',v||1);
	this.set('cid',cid||'');
	this.send('action.php');
};
adptrack.prototype.initCornvert=function(c){
	if(!c)return;
	this.set('cid',c);
	this.send('setcorn.php');
};
adptrack.prototype._track=function(){
	if(this.done)return;
	this.send('ana.php');
};
adptrack.prototype.send=function(url){
	if(window.location.href.indexOf('file:\/\/\/')==0)return;
	this.scr();
	this.ja();
	this.co();
	this.col();
	var p=this.getG();
	var o=this;
	var u = url.indexOf('?')>-1?url+'&'+p:url+'?'+p;
	var tracker = new Image(1,1);
	tracker.id='adpTracker';
	tracker.src='http://'+this.s+'/ana/'+u+'&rnd='+Math.random();
	tracker.onload=function() {
		o.done=2;
	}
};
adptrack.prototype.trackEvent=function(cate,action,opt){
	this.set('cate',cate);
	this.set('action',action);
	this.set('opt',opt);
	this.send('event.php');
};

adptrack.prototype.mouseClick=function(e){
	if(parseInt(Math.random()*10) < 0 )return;
	var clickTime = new Date();
	var uc='';
	if (clickTime.getTime() - this.ct < 1000)return;
	this.ct=clickTime.getTime();
	
	e=e||window.event;
	var ev = (e.srcElement) ? e.srcElement : e.target;
	
	if(ev.tagName=='IMG'){
		if(ev.parentNode.tagName=='A')
			uc=ev.parentNode.href;
	}
	if(ev.tagName=='A'||ev.tagName=='AREA')uc=ev.href;
	if(uc)_adpt.set('uc',uc);
	var xy=_adpt.position(e);
	if(xy.x>0 && xy.y>0){
		_adpt.set('wi',screen.width);
		_adpt.set('x',xy.x);
		_adpt.set('y',xy.y);
	}
	_adpt.send('ifconver.php?do=conver');
};
adptrack.prototype.position=function(e){
	var X = 0;
	var Y = 0;
	e = e||window.event;
	if (typeof e.pageY == 'number'){
		Y = e.pageY;X = e.pageX;
	}else{
		Y = (e.clientY) + document.documentElement.scrollTop;
		X = (e.clientX);
	}
	return {x:X, y:Y};
};
adptrack.prototype.getG=function(){
	var p=[];
	for(o in this.g){
		if(o == 'toJSONString')continue;
		p.push(o+'='+this.es(this.g[o]));
	}
	return p.join("&");
};
adptrack.prototype.listen=function(){
	if(document.addEventListener){
		document.addEventListener("mousedown",this.mouseClick,false);
	}else{
		document.attachEvent("onmousedown",this.mouseClick);
	}
};

function adpConvert(c,v,ref){
	if(!c)return;
	if(typeof _adpt=='undefined')return;
	_adpt.trackConvert(c,v,ref);
}
function setCornvert(c){
	if(!c)return;
	if(typeof _adpt=='undefined')return;
	_adpt.initCornvert(c);
}
