// require mootools(1.2.4)
var ProductList = new Class({
    // 为剧中显示，pagesize 必须为奇数
    initialize: function(pid, pagesize) {
        this.pid = pid;
        this.pagesize = pagesize;
        this.page = 0; // 0 为当前页， -1 为前一页
        this.cache_page = 1;
        var cp = this.cache_page,
            ps = this.pagesize,
            limit = (ps * (cp * 2 + 1) - 1) / 2;
        // 默认读取 3 页 数据
        this.start = -limit;
        this.end = limit;
        this.getData(this.pid, -limit, limit, true);
    },
    // init_hold: 初始 ajax 请求，等 ajax 请求完成后继续初始化。
    getData: function(pid, start, end, init_hold) {
        console.log('json request:', pid, start, end, init_hold);
        // 检查是否已缓存
        var list = this.list || {}, hit100 = true;
        for (var i = start, j = 0; i <= end; i++ ) {
            if (!list[i]) {
                hit100 = false;
                break;
            }
        }
        if (hit100) {
            console.log('json request is cached: all data cached', list);
            return;
        }

        var url = "/pleft.php";
        var req = new Request({
            'url': url,
            'data': {pid:pid, start:start,end:end},
            'method': 'post',
            'onComplete': (function(response) {
                var rep = JSON.parse(response, true);
                if (!rep) return;
                console.log('json response, start, end :', rep, start, end);
                var i, j, data = rep.data || [], len = data.length,
                    F = rep.first, L = rep.end;

                this.FIRST_SN = F;
                this.LAST_SN = L;

                if (init_hold) {
                    this.list = {};
                    var rs = start > F ? start : F,
                        re = end < L ? end : L;
                    for (i = rs, j = 0; i <= re; i++ ) {
                        this.list[i] = data[j++];
                    }

                    var ps = this.pagesize, vl = (ps - 1) / 2;
                    this.show(-vl);
                } else {
                    this.addData(data, start, end);
                }
            }).bind(this),
            'onException': (function() {
                console.log('error');
            }).bind(this)
        });
        req.send();
    },
    addData: function(data, start, end) {
        console.log('add Data:', data, start, end);
        var i, j, list = this.list, miss = this.miss || [], hitmiss = false;
        for (i = start, j = 0; i <= end; i++ ) {
            list[i] = data[j++];
            if (list[i] && miss.contains(i)) {
                hitmiss = true;
                console.log('rend missed vo: ',i, list[i]);
            }
        }
        // todo fine rend miss
        if (hitmiss) {
            var vo = [], keys = this.vo_keys;
            for (i = 0; i < keys.length; i++) {
                vo.push(list[keys[i]]);
            }
            this.rend(vo, this.vo_keys);
        }
        console.log('this.list:',this.list);
    },
    get_rlist_range: function(start) {
        var first = this.FIRST_SN, last = this.LAST_SN,
            size = this.pagesize;
        var range = [];
        for (var i = 0; i < size; i++) {
            var idx = start + i;
            idx = idx >= first ? idx : last - (first - idx - 1);
            idx = idx <= last ? idx : first + (idx - last - 1);
            range.push(idx);
        }
        return range;
    },
    rlist_up: function() {
        var first = this.FIRST_SN, last = this.LAST_SN,
            start = this.vr_start,
            size = this.pagesize,
            s = start - size;
        s = s >= first ? s : last - (first - s - 1);
        return s;
    },
    rlist_down: function() {
        var first = this.FIRST_SN, last = this.LAST_SN,
            end = this.vr_end,
            size = this.pagesize,
            s = end + 1;
        s = s <= last ? s : first + (s - last - 1);
        return s;
    },

    // vr_start = view range start, direction = 动画方向，true 为向下翻页
    show: function(vr_start, direction) {
        console.log('show start / dir :', vr_start, direction);
        // if (this.vr_start == vr_start) return;
        var pagesize = this.pagesize,
            vo = [], vo_keys = [],
            i, list = this.list, miss = 0,
            idx, obj;

        vo_keys = this.get_rlist_range(vr_start);
        this.vr_start = vo_keys[0];
        this.vr_end = vo_keys[pagesize - 1];

        for (i = 0; i < pagesize; i++) {
            obj = list[vo_keys[i]];
            vo.push(obj);
        }
        console.log('view_object, vo_keys, vr_start,  vr_end, pagesize :', vo, vo_keys, this.vr_start, this.vr_end, pagesize);
        this.viewobjects = vo;
        this.vo_keys = vo_keys;
        this.rend(vo, vo_keys, direction);
        this.cacheData();
    },
    rendProduct: function(v) {
        return [
            '<dl>',
            '  <dt>',
            '     <a class="proname">' + v.name + '</a>',
            '     <span>￥'+v.price+'</span>',
            '  </dt>',
            '  <dd><a href="'+v.url+'"><img src="'+v.img+'"></a></dd>',
            '</dl>'
        ].join('');
    },
    rend: function(vo, keys, direction) {
        console.log('rend for: ', vo, keys);
        var h = [], len = vo.length, loading = {
            name: '读取中', price:'', url:'', img:''
        }, miss = [];
        for (var i=0; i<len; i++) {
            var v = vo[i];
            if (!v) {
                miss.push(keys[i]);
                v = loading;
            }
            h.push(this.rendProduct(v));
        }
        html = h.join('');
        this.miss = miss;
        console.log('miss view:', miss);
        this.container.innerHTML = html;
    },
    cacheData: function(direction) {
        var ps = this.pagesize * 2, pso= ps -1, start, end;
        // 缓存更上一页
        start = this.vr_start - ps;
        end = start + pso;
        end = end + ps > this.LAST_SN ? this.LAST_SN : end;
        this.getData(this.pid, start, end);
        if (start <= this.FIRST_SN) {
            this.getData(this.pid, this.LAST_SN - pso, this.LAST_SN);
        }

        // 缓存更下一页
        end = this.vr_end + ps;
        start = end - pso;
        start = start - ps < this.FIRST_SN ? this.FIRST_SN : start;
        this.getData(this.pid, start, end);
        if (end >= this.LAST_SN) {
            this.getData(this.pid, this.FIRST_SN, this.FIRST_SN + pso);
        }
    },
    setContainer: function(cnt) {
        this.container = cnt;
        cnt.addEvent('mousemove', function(evt){
            evt.stopPropagation().preventDefault();
            var target = $(evt.target).getParent('dl');
            if (target) {
                target.addClass('hover');
            }
        });

        cnt.addEvent('mouseout', function(evt){
            evt.stopPropagation().preventDefault();
            var target = $(evt.target).getParent('dl');
            if (target) {
                var hidep_timer,hide_delay = 50;
                function hidep() { target.removeClass('hover'); }
                hidep_timer = hidep.delay(hide_delay);
            }
        });
    },
    setPager: function(up, down) {
        up.addEvent('click', this.onUp.bind(this));
        down.addEvent('click', this.onDown.bind(this));
    },
    onUp: function() {
        console.log('up');
        this.show(this.rlist_up(), false);
        return false;
    },
    onDown: function() {
        console.log('down');
        this.show(this.rlist_down(), true);
        return false;
    }
});
window.addEvent('domready', function() {
    (function() {
        var formBuy = document.getElementById('ECS_FORMBUY'),
            spec_arr = getSelectedAttributes(formBuy),
            ga = $('good_attrs');
        spec_arr.each(function(id) {
            var a = $$('a[name='+id+']', $('good_attrs'));
            a.addClass('cattsel');
        });
    })();

    // var pid = window.location.href.match(/product-(\d+)\.html/)[1],
    var pid = goods_id,
        pagesize = 5,
        list = new ProductList(pid, pagesize),
        container = $('sp_gd'),
        up = $('sp_up'),
        down = $('sp_down');
    list.setContainer(container);
    list.setPager(up, down);
    window.list = list;
});
