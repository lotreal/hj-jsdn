var XDialog = {
    init: function() {
    },
    show: function(el) {
        var $el = $(el),
            elc = $el.getCoordinates(),
            wins = $(document).getSize(),
            left = (wins.x - elc.width) / 2 + wins.scroll.x,
            top = (wins.y - elc.height) / 2 + wins.scroll.y;

        $ES('.dialog').setStyle('visibility', 'hidden');
        $el.setStyles({
            left: left > 0 ? left : 0,
            top: top > 0 ? top : 0,
            visibility: 'visible'
        });
    }
};

window.addEvent('domready',function(){
    var login_callback;

    var login_state = (document.cookie.test(/ECS\[login\]/));
    var H = Ux.Hook;
    H.register('fastbuy-login-pre', function() {
        if (!login_state) {XDialog.show('dialog-fastbuy-login');}
        else {if (login_callback) login_callback();}
        return false;
    });
    $ES('.s-login').addEvent('click', function(evt) {
        // if (Cookie.get('S[MEMBER]')) return true;
        evt.stop();
        var target = $(evt.target), id=target.id;
        login_callback = (id && LoginCallback[id]) ? LoginCallback[id] : false;
        if (hook = H.at(target.getProperty('ux-hook-key') + '-pre')) {
            if (H.stop(hook())) return;
        }
        if (!login_state) {XDialog.show('dialog-login');}
        else {if (login_callback) login_callback();}
        return false;
    });

    $ES('.s-register').addEvent('click', function(evt) {
        evt.stop();
        XDialog.show('dialog-register');
        return false;
    });

    $ES('.s-fastbuy').addEvent('click', function(evt) {
        evt.stop();
        if (window['goods_id']) {
            addToCart(goods_id, 0, 1);
        } else {
            window.location = '/flow.php?step=checkout';
        }
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
                var rep = JSON.parse(re, true);
                if (rep.status == 500) {
                    alert(rep.msg);
                } else if (rep.status == 302) {
                    location.href = rep.redirect;
                } else {
                    if (login_callback) return login_callback();
                    location.reload();
                }
                return true;
            }}).send(form);
    });


    $ES('.dialog form.mini-signupform').addEvent('submit',function(e){
        e.stop();
        var form = this,
            username = form.getElement('input[name=username]'),
            password = form.getElement('input[name=password]'),
            password_r = form.getElement('input[name=password_r]'),
            err = [];
        //if (!username.value.test(/[a-zA-Z0-9]{6}/)) err.push('用户名不能少于六位');
        if (username.value.length < 2) err.push('用户名不能少于两个字');
        if (password_r.value != password.value) err.push('两次密码输入不一样');
        if (password_r.value.length < 4) err.push('密码长度不能少于四位');
        
        if (err.length > 0) {
            alert(err.join());
            return;
        }
        new Request({
            method:form.get('method'),
            url:form.get('action'),
            onRequest:function(){
                form.getElement('input[type=submit]').set({disabled:true,styles:{opacity:.4}});
            },
            onComplete:function(re){
                form.getElement('input[type=submit]').set({disabled:false,styles:{opacity:1}});
                var rep = JSON.parse(re, true);
                if (rep.status == 500) {
                    alert(rep.msg);
                } else if (rep.status == 302) {
                    location.href = rep.redirect;
                } else {
                    location.reload();
                }
            }}).send(form);
    });
});
