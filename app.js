var express = require ("express");
var app = express();
var server = require("http").createServer(app).listen(1606,function(){
	console.log("Connected!");
});
app.use(express.static(__dirname + '/assets'));
var io = require("socket.io").listen(server);
app.get("/chatsocket",function (req, res){
	res.sendFile(__dirname + '/pages/chatui.html');
});
app.get("/assets/css/style.css",function (req, res){
	res.sendFile(__dirname + '/assets/css/style.css');
});
app.get("/assets/js/javascript.js",function (req, res){
	res.sendFile(__dirname + '/assets/js/javascript.js');
});

var connections = [];
io.on('connection', function (socket) {
  	connections.push(socket);
  	socket.on('send messages', function (data) {
	    socket.broadcast.emit('new messages', { msg: data.msg });
	    io.emit('online',{count: connections.length});
	});
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket),1);
		io.emit('online',{count: connections.length});
	});
	io.emit('online',{count: connections.length});
});