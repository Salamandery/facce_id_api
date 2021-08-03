
module.exports.getMachine = function(application, req, res, callback) {
    /* var _ip      = req.connection.remoteAddress; _ip = _ip.split(':')[3];
    var _ipMe    = _ip.split('.')[0];
    var _Me      = 0;
    var today    = new Date();
    var hours    = today.getHours();
    
    if (_ipMe == '10') {
        _Me = 1;
    } else if (_ipMe == '172') {
        _Me = 2;
    }
    req.session.me = _Me; */

    var _back = {
        'ip': '_ip',
        'me': '_Me',
        'today': 'today',
        'hours': 'hours'
    };

    callback(_back);
}