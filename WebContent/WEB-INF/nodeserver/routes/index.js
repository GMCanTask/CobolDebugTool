var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var node_find_files = require("node-find-files");
var io = require('socket.io').listen(3006);
io.sockets.on('connection', function (socket) {
    var flgs = {}, us = {};
    socket.on('register', function (user) {
        var str = [];
        flgs.search = 0;
        str = require('../../user/user.json');
        var num = hashLen(str[0]);
        str[0][user] = user;
        var arr = JSON.stringify(str[0]);
        //str.push(user);
        //fs.writeFile('.././user/user.json', '[' + str.toString().split(',').join('","') + ']', function (err) {
            //console.log(err);
        //});
        fs.writeFile('.././user/user.json', '[' + arr + ']', function (err) {
            console.log(err);
        });
        us.fnum = num;
        //gposition(us.fnum);
        gposition(user);
        mkdirp('.././users/' + user, function (err) {
            fs.writeFile('.././users/' + user + '/status.json', '[{"status":"new"}]', function (err) {
                console.log(err);
            });
        });
        delete require.cache[require.resolve('../../user/user.json')]
    });
    socket.on('search', function (user) {
        console.log(user);
        var str = [];
        str = require('../../user/user.json');
        flgs.search = 0;
        console.log(str[0][user]);
        if(str[0][user] != null){
          flgs.search = 1;
          flgs.url = str[0][user];
          gstatus(flgs.url);
          getfile(flgs.url);
        }
        if (flgs.search == 0) {
            socket.emit('nullu');
        }
        delete require.cache[require.resolve('../../user/user.json')]
    });
    socket.on('signup', function(name, pass, user){
        console.log(name+' : '+pass+' : '+user);
        var str = [];
        str = require('../../user/user.json');
        if(str[0][user] != null){
          flgs.url = str[0][user];
          updname(flgs.url, name, pass);
        }
        delete require.cache[require.resolve('../../user/user.json')]
    });
    socket.on('delete', function(user){
        console.log('delete');
        var str = [];
        str = require('../../user/user.json');
        if(str[0][user] != null){
          flgs.url = str[0][user];
          deletename(flgs.url, user);
        }
        delete require.cache[require.resolve('../../user/user.json')]
    });

    socket.on('upload', function(text, file,user){
        console.log('upload');
        var str = [];
        str = require('../../user/user.json');
        if(str[0][user] != null){
          flgs.url = str[0][user];
          upload(flgs.url, text, file);
        }
        delete require.cache[require.resolve('../../user/user.json')]
    });

    socket.on('uploadg', function(text, file,user){
        console.log('gagaga');
          upload(user, text, file);
    });
    socket.on('open', function(url, user){
       var rurl = '../users/' + user + '/'+url;
fs.readFile(rurl, 'utf8', function (err, text) {
socket.emit('suop', text, url);
});
    });

    function gstatus(cnt) {
        var status = require('../../users/' + cnt + '/status.json');
        console.log('getstatus: ' + cnt);
        socket.emit('position', cnt, status[0]['status']);
        if(status[0]['status'] == 'new'){
          socket.emit('new');  
        }else{
          var name = require('../../users/' + cnt + '/name.json');
          socket.emit('exi', name[0]['name']);
          delete require.cache[require.resolve('../../users/' + cnt + '/name.json')]
        }
        delete require.cache[require.resolve('../../users/' + cnt + '/status.json')]
    }

    function updname(cnt, name, pass) {
        var status = require('../../users/' + cnt + '/status.json');
        console.log('updname: ' + cnt);
        fs.writeFile('.././users/' + cnt + '/status.json', '[{"status":"registered"}]', function (err) {console.log(err);});
        fs.writeFile('.././users/' + cnt + '/name.json', '[{"name":"'+name+'","pass":"'+pass+'"}]', function (err) {console.log(err);socket.emit('susu',name)});
        delete require.cache[require.resolve('../../users/' + cnt + '/status.json')]       
    }

    function upload(cnt, text, file) {
        console.log('updname: ' + cnt);
        fs.writeFile('.././users/' + cnt + '/'+file, text, function (err) {console.log(err);socket.emit('suup', file);getfile(cnt);});     
    }

    
    function deletename(cnt, name){
       console.log(name);
       var str = require('../../user/user.json');
       delete str[0][name];
       var arr = JSON.stringify(str[0]);
       fs.writeFile('.././user/user.json', '[' + arr + ']', function (err) {
           console.log(err);
           socket.emit('delsu');
       });
       rimraf('.././users/'+cnt, function (err) {console.log(err);});
       delete require.cache[require.resolve('../../user/user.json')]
    }


    function gposition(cnt) {
        socket.emit('position', cnt, 'new');
    }

function hashLen(array){
  var len = 0;
  for(var key in array) { len++; }
  return len;
}

function getfile(url){
var d = new Date()
d.setDate(d.getDate() - 1);

var finder = new node_find_files({
    rootFolder : "../users/"+url,
    fileModifiedDate : d
});

finder.on("match", function(strPath, stat) {
    console.log(strPath + " - " + stat.mtime);
    var file = strPath.split(' ');
    file = file[0].split('\\');
    if(file[3] != 'name.json' && file[3] != 'status.json'){
    socket.emit('fileresult', file[3], stat.mtime);
    }
})
finder.on("complete", function() {
    console.log("Finished")
})
finder.on("patherror", function(err, strPath) {
    console.log("Error for Path " + strPath + " " + err)
})
finder.on("error", function(err) {
    console.log("Global Error " + err);
})
finder.startSearch();
}



});