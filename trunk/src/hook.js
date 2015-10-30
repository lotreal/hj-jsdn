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
