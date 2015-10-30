var XDialog = {
    init: function() {
    },
    show: function(el) {
        var $el = $(el),
            elc = $el.getCoordinates(),
            wic = $(document).getCoordinates(),
            left = (wic.width - elc.width) / 2,
            top = (wic.height - elc.height) / 2;

        $ES('.dialog').setStyle('visibility', 'hidden');
        $el.setStyles({
            left: left > 0 ? left : 0,
            top: top > 0 ? top : 0,
            visibility: 'visible'
        });
    }
};

window.addEvent('domready',function(){
    $ES('.s-login').addEvent('click', function(evt) {
        if(Cookie.get('S[MEMBER]')) return true;
        evt.stop();
        XDialog.show('dialog-login');
        return false;
    });

    $ES('.s-register').addEvent('click', function(evt) {
        evt.stop();
        XDialog.show('dialog-register');
        return false;
    });

    $ES('.dialog .close').addEvent('click', function(evt) {
        $ES('.dialog').setStyle('visibility', 'hidden');
    });

    $ES('.dialog form.loginform').addEvent('submit',function(e){
        e.stop();
        var form = this;
        new Request({
            method:form.get('method'),
            url:form.get('action'),
            onRequest:function(){
                form.getElement('input[type=submit]').set({disabled:true,styles:{opacity:.4}});
            },
            onComplete:function(re){
                form.getElement('input[type=submit]').set({disabled:false,styles:{opacity:1}});
                var rep = JSON.decode(re, true);
                if (rep.status == 500) {
                    alert(rep.msg);
                } else if (rep.status == 302) {
                    location.href = rep.redirect;
                } else {
                    location.reload();
                }
            }}).send(form);
    });


    return false;
    var curLH = location.href;

    // if(["-?login\.html","-?signup\.html","-?loginBuy\.html"].some(function(r){
    //     return curLH.test(new RegExp(r));
    // })){return false;}

    var MiniPassport = new Object();
    var miniPassportDialog = new Element('div',{'class':'dialog mini-passport-dialog','id':'dialog1'}).set('html',$E('#template-modal .dialog').get('html').substitute({
            title:'登录',
            content:''
        })).setStyles({
            display:'none',
            width:0,
            height:'auto'
        }).adopt(new Element('iframe',{src:'javascript:void(0);',styles:{
            position:'absolute',
            zIndex:-1,
            border:'none',
            top:0,
            left:0,
            'filter':'alpha(opacity=0)'
        },width:'100%',height:'100%'})).inject(document.body);

    var mpdSize = {
        loginBuy:{width:577},
        signup:{width:445,height:'auto'},
        login:{width:400,height:175},
        chain:{width:450}              
    };


    $extend(MiniPassport,{
        show:function(from,options){
            var handle = this.handle = from;
            options = this.options = options ||{};
            var remoteURL = options.remoteURL||(handle?handle.get('href'):false);
            var act ="login";
            act = remoteURL.match(/-([^-]*?)\.html/)[1];
            if(miniPassportDialog.style.display=='none'){
                var _styles  = {display:'block'};
                miniPassportDialog.setStyles(_styles);
            }
            miniPassportDialog.getElement('.dialog-content').empty();
            var fxValue  = mpdSize[act];
            fxValue.opacity = 1;            
            miniPassportDialog.setStyles(fxValue).amongTo(window);
            // if(window.ie6) remoteURL=(remoteURL.substring(0,4)=='http')?remoteURL:remoteURL;
            $pick(this.request,{cancel:$empty}).cancel();
            this.request = new Request.HTML({update:miniPassportDialog.getElement('.dialog-content').set('html','&nbsp;&nbsp;正在加载...'),onComplete:function(){
                MiniPassport.onload.call(MiniPassport);
            }}).get(remoteURL,$H({mini_passport:1}));
        },

        hide:function(chain){
            miniPassportDialog.getElement('.dialog-content').empty();
            miniPassportDialog.hide();
            if($type(chain)=='function'){chain.call(this);}
            miniPassportDialog.eliminate('chain');
            miniPassportDialog.eliminate('margedata');
        },

        onload:function(){
            var dialogForm = miniPassportDialog.getElement('form');
            miniPassportDialog.retrieve('margedata',[]).each(function(item){
                item.t =  item.t||'hidden';
                new Element('input',{type:item.t,name:item.n,value:item.v}).inject(dialogForm);
            });
            dialogForm.addEvent('submit',function(e){
                e.stop();
                var form = this;
                if(!MiniPassport.checkForm.call(MiniPassport))return MessageBox.error('请完善必填信息!');
                new Request({
                    method:form.get('method'),
                    url:form.get('action'),
                    onRequest:function(){
                        form.getElement('input[type=submit]').set({disabled:true,styles:{opacity:.4}});
                    },onComplete:function(re){
                        form.getElement('input[type=submit]').set({disabled:false,styles:{opacity:1}});
                        var _re = [];
                        re.replace(/\\?\{([^{}]+)\}/g, function(match){
                            if (match.charAt(0) == '\\') return _re.push(JSON.decode(match.slice(1)));
                            _re.push(JSON.decode(match));
                        });

                        var errormsg = [];
                        var plugin_url;
                        _re.each(function(item){
                            if(item.status =='failed'){
                                errormsg.push(item.msg);
                            }
                            if(item.status =='plugin_passport'){
                                plugin_url = item.url;
                            }
                        });

                        if(errormsg.length)return MessageBox.error(errormsg.join('<br/>'));
                        if(plugin_url){
                            MiniPassport.hide.call(MiniPassport,$pick(miniPassportDialog.retrieve('chain'),function(){
                                MessageBox.success('正在转向...');
                                location.href = plugin_url;
                            }));
                        }else{
                            MiniPassport.hide.call(MiniPassport,$pick(miniPassportDialog.retrieve('chain'),function(){
                                MessageBox.success('用户登录成功,正在转向...');
                                location.reload();
                            }));
                        }
                    }}).send(form);
            });
            miniPassportDialog.getElement('.close').addEvent('click',this.hide.bind(this));

            miniPassportDialog.amongTo(window);

            

            

        },

        checkForm:function(){

            var inputs = miniPassportDialog.getFormElements();

            var ignoreIpts = $$(miniPassportDialog.getElements('form input[type=hidden]'),miniPassportDialog.getElements('form input[type=submit]'));

            ignoreIpts.each(inputs.erase.bind(inputs));

            

            if(inputs.some(function(ipt){

                if(ipt.value.trim()==''){

                    

                    ipt.focus();

                    return true;

                }

                

            })){

                

                return false;

            }

            return true;

            

        }

        

    });

    

    

    /*统一拦截*/

    $(document.body).addEvent('click',function(e){

        

        if(Cookie.get('S[MEMBER]'))return true;

        

        var tgt = $(e.target);

        

        if(!tgt.match('a'))tgt = tgt.getParent('a');

        

        if((!tgt)||!tgt.match('a'))return;

        

        if(tgt.href.test(/-?login\.html/)||tgt.href.test(/-?signup\.html/)){

            e.stop();

            return MiniPassport.show(tgt);

            

        }

        if(tgt.href.test(/\/[\?]?member/i)){

            e.stop();   

            MiniPassport.show(tgt,{remoteURL:'http://www.qu.cc/?passport-login.html'});

            miniPassportDialog.store('chain',function(){

                

                MessageBox.success('会员认证成功,正在进入...');

                location.href= 'http://www.qu.cc/?member.html';

                

            });              

        }

    });

    

    

    

    /*checkout*/

    $$('form[action$=checkout.html]').addEvent('submit',function(e){

        if(Cookie.get('S[MEMBER]'))return this.submit();

        e.stop();

        var form = this;

        MiniPassport.show(this,{remoteURL:'http://www.qu.cc/?cart-loginBuy.html'});

        if(this.get('extra') == 'cart'){

            miniPassportDialog.store('margedata',[{t:'hidden',n:'regType',v:'buy'}]);

        }

        miniPassportDialog.store('chain',function(){

            MessageBox.success('正在转入...');

            form.submit();

        });        

    });

MiniPassport.show();    
});

