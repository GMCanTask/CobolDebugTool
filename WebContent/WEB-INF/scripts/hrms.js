$(function(){var socket=io.connect('http://localhost:3006/');var user={},flg={};init();function init(){flg.upd=0;user.name=localStorage.getItem('user');if(user.name==null){register()}else{search(user.name)}$('#huser').text('Waiting...')}function register(users){if(users==null){user.name=rand(7);localStorage.setItem('user',user.name);socket.emit('register',user.name)}else{socket.emit('register',users)}}function search(user){socket.emit('search',user)}function rand(n,b){b=b||'';var a='abcdefghijklmnopqrstuvwxyz'+'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+'0123456789'+b;a=a.split('');var s='';for(var i=0;i<n;i++){s+=a[Math.floor(Math.random()*a.length)]}return s};function status(cnt,sta){localStorage.setItem('position',cnt);localStorage.setItem('status',sta)}socket.on('position',function(cnt,sta){status(cnt,sta);if(sta=='new'){$('#huser').text('User: Guest')}else{$('#huser').text('User: '+localStorage.getItem('user'))}});socket.on('nullu',function(){$('#huser').text('User: Guest');register(user.name)})});