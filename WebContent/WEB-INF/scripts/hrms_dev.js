$(function () {
    var socket = io.connect(':3006');
    var user = localStorage.getItem('user');
    if (user == null) {
        user = rand(7);
        localStorage.setItem('user', user);
        register(user)
    } else {
        search(user)
    }

    function register(user) {
        socket.emit('register', user)
    }

    function search(user) {
        socket.emit('search', user)
    }

    function rand(n, b) {
        b = b || '';
        var a = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789' + b;
        a = a.split('');
        var s = '';
        for (var i = 0; i < n; i++) {
            s += a[Math.floor(Math.random() * a.length)]
        }
        return s
    };
    socket.on('position', function (cnt) {
        localStorage.setItem('position', cnt);
        $('#huser').text('User: ' + localStorage.getItem('user'))
    })
});