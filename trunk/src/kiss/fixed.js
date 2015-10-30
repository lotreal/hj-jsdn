KISSY.add('dom/fixed', function(S, DOM, UA, Event, undefined) {
    var win = window, doc = document,
        SCROLL = 'scroll', RESIZE = 'resize';

    var BrowserSupportFixed = (function(){
        return !(S.UA.ie < 7);
    })();

    function getV(a) {
        return S.isFunction(a) ? a() : a;
    }

    function fixed_scroll(dir) {
        return BrowserSupportFixed ? 0 :
            (dir == 'x' ? DOM.scrollLeft() : DOM.scrollTop());
    }

    function fixedplus(el, size, position) {
        var bsf = BrowserSupportFixed,
            compute_position = {},
            distory = [];

        for (var dir in position) {
            compute_position[dir] = getV(position[dir]);
        }

        DOM.hide(el);
        DOM.css(el, S.merge({
            'position': bsf ? 'fixed' : 'absolute'
        }, size, compute_position));

        if ('top' in position) {
            var fix_top = function() {
                var top = getV(position.top) + fixed_scroll('y');
                DOM.css(el, 'top', top);
                // el.tween('top', top);
            };
            fix_top();

            bsf || Event.on(win, SCROLL, fix_top);
            Event.on(win, RESIZE, fix_top);

            if (!bsf) {
                distory.push(function() {
                    Event.detach(win, SCROLL, fix_top);
                });
            };
            distory.push(function() {
                Event.detach(win, RESIZE, fix_top);
            });
        }

        if ('bottom' in position) {
            var fix_bottom = function() {
                var bottom = getV(position.bottom);
                DOM.css(el, 'bottom', bottom - 1);
                DOM.css(el, 'bottom', bottom);
            };
            fix_bottom();
            bsf || Event.on(win, SCROLL, fix_bottom);
            Event.on(win, RESIZE, fix_bottom);

            if (!bsf) {
                distory.push(function() {
                    Event.detach(win, SCROLL, fix_bottom);
                });
            };
            distory.push(function() {
                Event.detach(win, RESIZE, fix_bottom);
            });
        }

        if ('left' in position) {
            var fix_left = function() {
                var left = getV(position.left) + fixed_scroll('x');
                DOM.css(el, 'left', left);
            };
            fix_left();
            bsf || Event.on(win, SCROLL, fix_left);
            Event.on(win, RESIZE, fix_left);

            if (!bsf) {
                distory.push(function() {
                    Event.detach(win, SCROLL, fix_left);
                });
            };
            distory.push(function() {
                Event.detach(win, RESIZE, fix_left);
            });
        }

        if ('right' in position) {
            var fix_right = function() {
                var right = getV(position.right) + fixed_scroll('x');
                DOM.css(el, 'right', right);
            };
            fix_right();
            bsf || Event.on(win, SCROLL, fix_right);
            Event.on(win, RESIZE, fix_right);

            if (!bsf) {
                distory.push(function() {
                    Event.detach(win, SCROLL, fix_right);
                });
            };
            distory.push(function() {
                Event.detach(win, RESIZE, fix_right);
            });
        }

        DOM.show(el);
    }

    S.mix(DOM, {
        fixed: fixedplus
    });

    return fixedplus;
}, {
    requires:["dom","ua","event"]
});
/*
KISSY.use('dom, dom/fixed', function(S, DOM, fixed) {
    var $cs = DOM.get('#webqq');
    fixed($cs, { width: 33, height: 260 }, { top: 200, right: function() {
        var docw = DOM.docWidth(),
            pagew = 960,
            right = (docw - pagew) / 2 - 44;
        return right > 0 ? right : 0;
    }});

    var tcp = $('tc_panel'),
        tcpw = config.tcp.width,
        tcph = config.tcp.height;
    fixed(tcp, { width: tcpw, height: tcph }, { bottom: 0, left: 0 });
});
*/
