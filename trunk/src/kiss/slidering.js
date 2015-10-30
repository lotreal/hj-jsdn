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

// S.one('#slid_r_b_bql') && S.SlideRing('#slid_r_b_bql', {
//     step: 246,
//     dir: 'x',
//     interval: 3,
//     duration: 1
// }).start();

// function Marquee4(cnt){
//     var speed=30,
//     mars=document.getElementById(cnt+"1"),
//     clone=document.getElementById(cnt+'2'),
//     container=document.getElementById(cnt);
//     clone.innerHTML=mars.innerHTML;
//     function _marquee(){
//         if(container.scrollLeft<=0)
//             container.scrollLeft+=clone.offsetWidth;
//         else{
//             container.scrollLeft--;
//         }
//     }
//     var MyMar4=setInterval(_marquee,speed);
//     container.onmouseover=function() {clearInterval(MyMar4);};
//     container.onmouseout=function() {MyMar4=setInterval(_marquee,speed);};
// }
// Marquee4('x_rights');


KISSY.use("switchable/slidering", function(S, SlideRing) {
    S.ready(function(S) {
        S.one('#top-hot-rec') && SlideRing('#top-hot-rec', {
            step: 64,
            dir: 'y',
            interval: 0,
            duration: 8
        }).start();
        S.one('#top-hot-com') && SlideRing('#top-hot-com', {
            step: 133,
            dir: 'y',
            interval: 0,
            duration: 8
        }).start();

    });
});
