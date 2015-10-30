(function(host, S, undef) {
    var API_T = 'http://192.168.1.100/tracker/index.php/api/transform',
        seed = (host && host[S]) || {},        
        args = location.search.match(/\??(.*)/)[1],    
        tracker = new Image(),
        data = {
            t: document.title,
            u: host.location,
            r: document.referrer,
            col: navigator.appName=="Netscape" ? screen.pixelDepth 
                : a5color=screen.colorDepth,
	          res: screen.width+'x'+screen.height,
	          java: navigator.javaEnabled()?'1':'0',
            cookied: navigator.cookieEnabled?'1':'0'
        };

    host = seed.__HOST || (seed.__HOST = host || {});
    S = host[S] = seed;

    function serialize() {
        var a = [];
        for (key in data) {
            a.push(key + '=' + data[key]);
        }
        return '?' + a.join('&') + (args.length ? '&' + args : '') + '&' + Math.random();
    }

    var url = API_T + serialize(data);
    tracker.src = url;

    S.transform = function(tid) {
        data.tid = tid;
        var url = API_T + serialize(data);
        tracker.src = url;
    };

})(this, 'At');
