// require mootools(1.2.4), UA
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
