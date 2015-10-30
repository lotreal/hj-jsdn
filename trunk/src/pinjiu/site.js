KISSY.add("switchable/menu", function(S, SW, DOM, Anim, undefined) {
    var Event = S.Event;
    function trigpanel($triggers, $panels) {
        var c;
        function hide_allp() {
            DOM.removeClass($triggers, 'hover');
            DOM.hide($panels);
        }
        S.each($triggers, function($target, idx) {
            Event.on($target, 'mouseenter', function(evt) {
                c && c.cancel && c.cancel();
                hide_allp();
                DOM.addClass($target, 'hover');
                DOM.css($panels[idx], 'display', 'block');
            });
            Event.on($target, 'mouseleave', function(evt) {
                c = S.later(hide_allp, 50);
            });
        });
        Event.on($panels, 'mouseenter', function(evt) {
            c && c.cancel && c.cancel();
        });
        Event.on($panels, 'mouseleave', function(evt) {
            c = S.later(hide_allp, 50);
        });
    }
    S.Menu = trigpanel;
    return S.Menu;
}, { requires:["switchable", "dom", 'anim'] });

KISSY.add("switchable/slidering", function(S, SW, DOM, Anim, undefined) {
    function SlideRing(container, config) {

        var self = this;

        // factory or constructor
        if (!(self instanceof SlideRing)) {
            return new SlideRing(container, config);
        }

        config = config || {};
        var host = this.constructor;
        while (host) {
            config = S.merge(host.Config, config);
            host = host.superclass ? host.superclass.constructor : null;
        }
        self.config = config;
        self.container = S.one(container);
        self.panels = DOM.children(self.container);
        self.length = self.panels.length;
        self.first = 0;
        self.anim = null;

        // S.Event.on(self.container, 'mouseenter', function(evt) {
        //     self.running = false;
        //     self.anim && self.anim.stop();
        // });
        // S.Event.on(self.container, 'mouseleave', function(evt) {
        //     self.running = true;
        //     self.anim && self.anim.run();
        // });
    }

    SlideRing.Config={
        autoplay: true,
        circular: true,
        easing: '',
        interval: 6,
        duration: 1
    };

    S.augment(SlideRing, {
        start: function() {
            this.running = true;
            var self = this;
            // 设置自动播放
            self.timer = S.later(self.run, self.config.interval * 1000, false, self);
        },

        run: function() {
            var self = this,
                cfg = self.config,
                isX = cfg.dir === 'x',
                cssprop = isX ? 'margin-left' : 'margin-top', 
                props = { };

            props[cssprop] = -cfg.step + 'px';

            var target = self.panels[self.first];
            var last = self.first == 0 ? self.length - 1 : self.first - 1;

            self.anim = Anim(target, props, cfg.duration, cfg.easing, function() {
                DOM.remove(target);
                DOM.css(target, cssprop, '0px');
                DOM.insertAfter(target, self.panels[last]);
                self.first++;
                self.first = self.first < self.length ? self.first : 0;
                self.running && self.start();
            });
            self.anim.run();
        }
    });

    SW.SlideRing = SlideRing;
    S.SlideRing = SlideRing;
    return SlideRing;
}, { requires:["switchable", "dom", 'anim'] });

// 延迟加载
KISSY.use('datalazyload', function(S, DataLazyload) {
    S.ready(function(S) {
        S.DataLazyload();
    });
});

KISSY.use("event,switchable,switchable/slidering,switchable/menu", function(S, Event, Switchable) {
    window.S = S;
    var DOM = S.DOM, Slide = S.Slide;

    S.ready(function(S) {
        S.Menu(S.query('.menu_t'), S.query('.menu_s'));

        var billboard_t = S.query('#ra_jsnav_bql a'),
            billboard_p = DOM.children(DOM.get('#ra_bql_panels'));
        S.one('#slid_r_a_bql') && billboard_t.length > 0 
            && Slide('#slid_r_a_bql', {
                triggers: billboard_t,
                panels: billboard_p,
                effect: 'fade',
                easing: 'easeBoth',
                interval: 6,
                duration: 1,
                switchTo: 0
            });

        S.one('#slid_r_b_bql') && S.SlideRing('#slid_r_b_bql', {
            step: 246,
            dir: 'x',
            interval: 3,
            duration: 1
        }).start();

        S.one('#sr_comment') && S.SlideRing('#sr_comment', {
            step: 79,
            dir: 'y',
            interval: 0,
            duration: 8
        }).start();

        var hot_tops = S.all('#hot-top li'), hot_top_detail;
        Event.on(hot_tops, 'mouseenter', function(evt) {
            if (hot_top_detail == this) return;
            DOM.hide(DOM.get('.xix', hot_top_detail));
            DOM.show(DOM.get('.xix', this));
            hot_top_detail = this;
        });

        // S.Menu(S.all('#hot-goods-t li'), S.all('#hot-goods-p div.nr'));

        var pj_tabs_prop = {
            effect: 'fade',
            switchTo: 0,
            aria: false
            // duration: 0.2
        };

        var bind_more = function(ev) {
            var idx = ev.currentIndex, t = this.triggers[idx],
                more = S.get('.more', this.container),
                cata = S.get('a',t);
            more.href = cata.href;
        };
        if (S.one('#hot-goods')) {
            S.Tabs('#hot-goods', pj_tabs_prop).on('switch', bind_more);
            S.Tabs('#new-goods', pj_tabs_prop).on('switch', bind_more);
            S.Tabs('#wine', pj_tabs_prop).on('switch', bind_more);
        }
        function validateEmail(elementValue){  
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
            return emailPattern.test(elementValue);  
        }  
        var $ssform = S.get('#subscribe_form');
        $ssform && Event.on(S.get('input.submit', $ssform), 'click', function(evt) {
            var email = S.get('input.input1', $ssform).value;
            if (validateEmail(email)) {
                S.IO.post($ssform.action, {
                    type:'post',
                    subemail: email
                }, function(o) {
                    // S.log('POST ' + o);
                    alert('订阅成功！');
                });
            } else {
                alert('对不起，电子邮件格式错误。');
            }
            return false;
        });

        // 产品页：加减购买数量
        (function(container) {
            if (!container) return;
            var num = S.get('#number'),
                plus = S.get('.increase', container),
                decr = S.get('.decrease', container);
            Event.on(plus, 'click', function(evt) {
                var v = num.value*1 + 1;
                num.value = v < goods_number ? v : goods_number;
                num.onblur();
            });
            Event.on(decr, 'click', function(evt) {
                var v = num.value*1 - 1;
                num.value = v >= 1 ? v : 1;
                num.onblur();
            });
        })(S.get('.Numinput'));
    });
});

KISSY.use('dom, dom/fixed', function(S, DOM, fixed) {
    var pane = DOM.get('#windows_fc'),
        close = DOM.get('#fcclosebtn'), 
        expand = false;
    fixed(pane, {}, { top: 229, right: function() {
        var docw = DOM.docWidth(),
            pagew = 960,
            right = (docw - pagew) / 2 - 44;
        return right > 0 ? right : 0;
    }});

    DOM.css(pane, 'width', expand ? '120px'  : '33px');
    // S.Event.on(close, 'click', function(evt) {
    //     expand = !expand;
    //     DOM.css(pane, 'width', expand ? '120px'  : '33px');
    // });
});
