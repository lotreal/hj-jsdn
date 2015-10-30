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
