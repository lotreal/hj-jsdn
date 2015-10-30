/*
Copyright 2011, HJS v1.20dev
build time: 2011-09-15 17:30:23.809
*/
var config = {
    head_ad: {small:70, big:390, delay: 6000},
    tcp:{width:494, height:164}
};
(function(host, S, undef) {
    var seed = (host && host[S]) || {};
    host = seed.__HOST || (seed.__HOST = host || {});
    S = host[S] = seed;

    var _hook = {}, H = S.Hook = {};
    H.hooks = _hook;
    H.register = function(point, callback) {
        _hook[point || '__noname__'] = callback;
    };
    H.at = function(point) {
        return _hook[point] || false;
    };
    H.stop = function(ret) {
        return !ret;
    };
    // Ux.Hook.register();
})(this, 'Ux');
var UA = (function() {
    var ua = navigator.userAgent,
        EMPTY = '', MOBILE = 'mobile',
        core = EMPTY, shell = EMPTY, m,
        o = {},
        numberify = function(s) {
            var c = 0;
            // convert '1.2.3.4' to 1.234
            return parseFloat(s.replace(/\./g, function() {
                return (c++ === 0) ? '.' : '';
            }));
        };

    // WebKit
    if ((m = ua.match(/AppleWebKit\/([\d.]*)/)) && m[1]) {
        o[core = 'webkit'] = numberify(m[1]);

        // Chrome
        if ((m = ua.match(/Chrome\/([\d.]*)/)) && m[1]) {
            o[shell = 'chrome'] = numberify(m[1]);
        }
        // Safari
        else if ((m = ua.match(/\/([\d.]*) Safari/)) && m[1]) {
            o[shell = 'safari'] = numberify(m[1]);
        }

        // Apple Mobile
        if (/ Mobile\//.test(ua)) {
            o[MOBILE] = 'apple'; // iPad, iPhone or iPod Touch
        }
        // Other WebKit Mobile Browsers
        else if ((m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))) {
            o[MOBILE] = m[0].toLowerCase(); // Nokia N-series, Android, webOS, ex: NokiaN95
        }
    }
    // NOT WebKit
    else {
        // Presto
        // ref: http://www.useragentstring.com/pages/useragentstring.php
        if ((m = ua.match(/Presto\/([\d.]*)/)) && m[1]) {
            o[core = 'presto'] = numberify(m[1]);
            
            // Opera
            if ((m = ua.match(/Opera\/([\d.]*)/)) && m[1]) {
                o[shell = 'opera'] = numberify(m[1]); // Opera detected, look for revision

                if ((m = ua.match(/Opera\/.* Version\/([\d.]*)/)) && m[1]) {
                    o[shell] = numberify(m[1]);
                }

                // Opera Mini
                if ((m = ua.match(/Opera Mini[^;]*/)) && m) {
                    o[MOBILE] = m[0].toLowerCase(); // ex: Opera Mini/2.0.4509/1316
                }
                // Opera Mobile
                // ex: Opera/9.80 (Windows NT 6.1; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00
                // issue: 由于 Opera Mobile 有 Version/ 字段，可能会与 Opera 混淆，同时对于 Opera Mobile 的版本号也比较混乱
                else if ((m = ua.match(/Opera Mobi[^;]*/)) && m){
                    o[MOBILE] = m[0];
                }
            }
            
        // NOT WebKit or Presto
        } else {
            // MSIE
            if ((m = ua.match(/MSIE\s([^;]*)/)) && m[1]) {
                o[core = 'trident'] = 0.1; // Trident detected, look for revision
                // 注意：
                //  o.shell = ie, 表示外壳是 ie
                //  但 o.ie = 7, 并不代表外壳是 ie7, 还有可能是 ie8 的兼容模式
                //  对于 ie8 的兼容模式，还要通过 documentMode 去判断。但此处不能让 o.ie = 8, 否则
                //  很多脚本判断会失误。因为 ie8 的兼容模式表现行为和 ie7 相同，而不是和 ie8 相同
                o[shell = 'ie'] = numberify(m[1]);

                // Get the Trident's accurate version
                if ((m = ua.match(/Trident\/([\d.]*)/)) && m[1]) {
                    o[core] = numberify(m[1]);
                }

            // NOT WebKit, Presto or IE
            } else {
                // Gecko
                if ((m = ua.match(/Gecko/))) {
                    o[core = 'gecko'] = 0.1; // Gecko detected, look for revision
                    if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
                        o[core] = numberify(m[1]);
                    }

                    // Firefox
                    if ((m = ua.match(/Firefox\/([\d.]*)/)) && m[1]) {
                        o[shell = 'firefox'] = numberify(m[1]);
                    }
                }
            }
        }
    }

    o.core = core;
    o.shell = shell;
    o._numberify = numberify;
    return o;
})();// require mootools(1.2.4), UA
(function(){
    var BrowserSupportFixed = (function(){
        return !(UA.ie < 7);
    })();

    function getV(a) {
        return $type(a) == 'function' ? a() : a;
    }

    function fixed_scroll(dir) {
        return BrowserSupportFixed ? 0 :
            $(document.body).getScroll()[dir];
    }

    function fixedplus(el, size, position) {
        var bsf = BrowserSupportFixed,
            compute_position = {},
            distory = [];

        for (var dir in position) {
            compute_position[dir] = getV(position[dir]);
        }

        el.hide();
        el.setStyles($merge({
            'position': bsf ? 'fixed' : 'absolute'
        }, size, compute_position));


        // el.set('tween', {duration: 150});
        if ('bottom' in position) {
            var fix_bottom = function() {
                var bottom = getV(position.bottom);
                el.setStyle('bottom', bottom - 1);
                el.setStyle('bottom', bottom);
            };
            fix_bottom();
            if (!bsf) window.addEvent('scroll', fix_bottom);
            window.addEvent('resize', fix_bottom);

            if (!bsf) {
                distory.push(function() {
                    window.removeEvent('scroll', fix_bottom);
                });
            };
            distory.push(function() {
                window.removeEvent('resize', fix_bottom);
            });

            // var fix_bottom = function() {
            //     var bottom = getV(position.bottom) - fixed_scroll('y');
            //     el.setStyle('bottom', bottom);
            // };
            // fix_bottom();
            // if (!bsf) window.addEvent('scroll', fix_bottom);
            // window.addEvent('resize', fix_bottom);
            // TODO FIX ie6 浮动层加速向下移动
            // position.top = function() {
            //     return $(document.body).getSize().size.y - size.height 
            //         - getV(position.bottom);
            // };
        }

        // if ('right' in position) {
        //     position.left = function() {
        //         return $(document.body).getSize().size.x - size.width 
        //             - getV(position.right);
        //     };
        // }

        if ('top' in position) {
            var fix_top = function() {
                var top = getV(position.top) + fixed_scroll('y');
                el.setStyle('top', top);
                // el.tween('top', top);
            };
            fix_top();
            if (!bsf) window.addEvent('scroll', fix_top);
            window.addEvent('resize', fix_top);

            if (!bsf) {
                distory.push(function() {
                    window.removeEvent('scroll', fix_top);
                });
            };
            distory.push(function() {
                window.removeEvent('resize', fix_top);
            });
        }

        if ('left' in position) {
            var fix_left = function() {
                var left = getV(position.left) + fixed_scroll('x');
                el.setStyle('left', left);
            };
            fix_left();
            if (!bsf) window.addEvent('scroll', fix_left);
            window.addEvent('resize', fix_left);
            if (!bsf) {
                distory.push(function() {
                    window.removeEvent('scroll', fix_left);
                });
            };
            distory.push(function() {
                window.removeEvent('resize', fix_left);
            });

        }

        if ('right' in position) {
            var fix_right = function() {
                var right = getV(position.right) + fixed_scroll('x');
                el.setStyle('right', right);
            };
            fix_right();
            if (!bsf) window.addEvent('scroll', fix_right);
            window.addEvent('resize', fix_right);

            if (!bsf) {
                distory.push(function() {
                    window.removeEvent('scroll', fix_right);
                });
            };
            distory.push(function() {
                window.removeEvent('resize', fix_right);
            });

        }

        el.show();

        return function() {
            for (var i = 0, n = distory.length; i < n; i++) {
                var fn = distory[i];
                fn();
            }
        };
    }

    window.fixedplus = fixedplus;
})();
// <script src="/js/mootools/mootools-1.2.4.js"></script>
// <script src="/js/ua.js"></script>
// <script src="/js/fixedplus.js"></script>
// fixedplus(tcp, { width: 494, height: 210 }, { bottom: 0, left: 0 });
// fixedplus($cs, { width: 119, height: 260 }, { top: 200, right: function() {
//     var docw = $(document.body).getSize().x,
//         pagew = 960,
//         right = (docw - pagew) / 2 - 44;
//     return right > 0 ? right : 0;
// } });
var $shim, ie6 = true;
function initshim() {
    // self.shim = DOM.create('<iframe class="' + SHIM_CLS + '" style="display:none;position:absolute;border:none;filter:alpha(opacity=0);"></iframe>');
    // doc.body.appendChild(self.shim);
    if (!$shim) {
        $shim = new Element('iframe', { style: "display:none;position:absolute;border:none;filter:alpha(opacity=0);z-index:9;" });
        $(document.body).adopt($shim);
    }
}

function showshim(el) {
    initshim();
    if (!el) return;
    var coord = el.getCoordinates();
    $shim.setStyles(coord);
    $shim.show();
}

function hideshim() {
    initshim();
    $shim.hide();
}

function trigpanel($triggers, $panels) {
    var hidep_timer;
    function hide_allp() {
        $triggers.removeClass('hover');
        $panels.hide();
        ie6 && hideshim();
    }
    $triggers.each(function($target, idx) {
        $target.addEvent('mouseenter', function(evt) {
            clearTimeout(hidep_timer);
            hide_allp();
            $target.addClass('hover');
            $panels[idx].setStyle('display', 'block');
            ie6 && showshim($panels[idx].getChildren('.subNav_main')[0]);
        });
        $target.addEvent('mouseleave', function(evt) {
            hidep_timer = hide_allp.delay(50);
        });
    });
    $panels.addEvent('mouseenter', function(evt) {clearTimeout(hidep_timer);});
    $panels.addEvent('mouseleave', function(evt) {hidep_timer = hide_allp.delay(50);});
}
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
// require mootools(1.2.4), UA, fixedplus, trigpanel
window.addEvent('domready', function() {
    var href = window.location.href,
        isHome = (href == "http://qu.cc/" || href == "http://www.qu.cc/");
    // -----------------------------------------------
    (function () {
        var a = $$('div.Headadzone div');
        if (a.length <2) return;
        var mini = a[0], 
            big = a[1],
            bigfx = new Fx.Tween(big),
            minih = config.head_ad.small,
            bigh = config.head_ad.big,
            hide_delay = config.head_ad.delay,
            ck = 'headad_big_shown',
            shown = Cookie.read(ck) || false;

        if (!isHome) {
            mini.show();
        } else {
            big.show();
            (function() {
                bigfx.start('height', bigh, minih);
                (function() {
                    big.hide();
                    mini.show();
                    Cookie.write(ck, 1);
                }).delay(800);
            }).delay(hide_delay);
        }
    })();

    (function() {
        var el = $('public_rbad'), close = $$('.public_rbad_top'), h = 305,
            clear = fixedplus(el, {}, { bottom: 29 }),
            fx = new Fx.Tween(el), is_expand;

        function expand() {
            is_expand = true;
            fx.start('height', 26, 276);
        }
        function shrink() {
            is_expand = false;
            fx.start('height', 276, 26);
        }

        expand();

        close.addEvent('click', function() {
            is_expand ? shrink() : expand();
        });
        $('close_rbad').addEvent('click', function(evt) {
            evt.stop();
            el.hide();
            clear();
        });
    })();

    // -----------------------------------------------
    // var btnback = $('history_back');
    // btnback && btnback.addEvent('click', function() {window.history.back();});

    // 首页商品分类切换
    // var nav_triggers = $$('div.Nav li:nth-child(odd)'),
    //     nav_panels = $$('div.subNav_bg');
    var nav_triggers = $$('.ver3_pagenav_navzone>ul li'),
        nav_panels = $$('div.subNav_bg');
    nav_triggers.shift();
    trigpanel(nav_triggers, nav_panels);

    // 微博
    trigpanel($$('.weiblog'), $$('.ver3_header_top_zone_wb'));


    // -----------------------------------------------
    // var tcp = $('tc_panel'),
    //     tcpw = config.tcp.width,
    //     tcph = config.tcp.height,
    //     tc = $$('.tc_server')[0],
    //     tcFx = new Fx.Tween(tc),

    //     pagew = 960;
    //     // $csp_open = $('csp_open'),
    //     // $csp_close = $('csp_close'),
    //     // $btn_open = $('btn_open'),
    //     // $btn_close = $('btn_close');

    // (function () {
    //     var ckie = 'notc', disable = $('tc_disable');
    //     var enableTcPanel = (function () {
    //         if (Cookie.read(ckie)) return false;
    //         var H = (new Date()).getHours();
    //         return H >= 9;
    //     })();
    //     if (!enableTcPanel) return;
    //     (function() {
    //         fixedplus(tcp, { width: tcpw, height: tcph }, { bottom: 0, left: 0 });
    //         tcFx.start('margin-top', 210, 0);
    //     }).delay(1000 * 10);

    //     function hide_tc() {
    //         tcFx.start('margin-top', 0, 210);
    //         (function() {tcp.hide();}).delay(150);
    //     }

    //     // tcFx.addEvent('complete', );
    //     $('tc_close').addEvent('click', hide_tc);

    //     disable && disable.addEvent('click', function() {
    //         Cookie.write(ckie, 1);
    //         hide_tc();
    //     });
    // })();

    // -----------------------------------------------
    var $cs = $('webqq');
    $cs && fixedplus($cs, { width: 33, height: 260 }, { top: 200, right: function() {
        var docw = $(document.body).getSize().x,
            pagew = 960,
            right = (docw - pagew) / 2 - 44;
        return right > 0 ? right : 0;
    } });


    // $btn_open.addEvent('click', function() {$csp_close.hide();$csp_open.show();});
    // $btn_close.addEvent('click', function() {$csp_open.hide();$csp_close.show();});

    // -----------------------------------------------
    // 跟踪 800 点击
    // var btn800 = $('btn_800'), btnQQ = $('btn_webqq');
    // btn800 && btn800.addEvent('click', function() {adpConvert('NTE4',1);});
    // btnQQ && btnQQ.addEvent('click', function() {adpConvert('NTE3',1);});
    var start_talk = $$('.tc_jt');
    start_talk.length && start_talk.addEvent('click', function() {At.transform(2);});

    // -----------------------------------------------
    // 顶部工具条
    (function() {
        var bar = $('public_hotkey'),
            t1, t2, shown;

        function showbar() {
            if (shown) return;
            bar.show();
            shown = true;
        }
        function hidebar() {
            if (!shown) return;
            bar.hide();
            shown = false;
        }
        function togglebar() {
            var y = $(document.body).getScroll()['y'];
            y > 152 ? showbar() : hidebar();
        }

        fixedplus(bar, { height: 27 }, { top: 0 });
        bar.hide();
        window.addEvent('scroll', togglebar);
        window.addEvent('resize', togglebar);
    })();

    // 底部工具条
    (function() {
        var bar = $('tc_bottom'),
            tips = $('tc_bottom_ts'),
            t1, t2, shown;

        fixedplus(bar, { height: 29 }, { bottom: 0 });

        function cleart() {
            $clear(t1);
            $clear(t2);
        }
        function showtips() {
            tips.fade('in');
        }
        function hidetips() {
            cleart();
            tips.fade('out');
        }
        function showbar() {
            if (shown) return;
            bar.show();
            shown = true;
            t1 = showtips.delay(300);
            t2 = hidetips.delay(3800);
        }
        function hidebar() {
            if (!shown) return;
            bar.hide();
            hidetips();
            shown = false;
        }
        function togglebar() {
            var y = $(document.body).getScroll()['y'];
            y > 152 ? showbar() : hidebar();
        }
        window.addEvent('scroll', togglebar);
        window.addEvent('resize', togglebar);
    })();

    // // iframe height
    // window.if_subject = function(height) {
    //     var iframe = $('iframe_subject');
    //     iframe && iframe.setStyle('height', height);
    // };

});
// var k = 'openwinnum', num = Cookie.read(k) || 0;
// num = num * 1 + 1;
// Cookie.write(k, num);
// window.onbeforeunload = function(){
//     num--;
//     Cookie.write(k, num);
//     if (num <= 1) return "是否需要注销";
// };
