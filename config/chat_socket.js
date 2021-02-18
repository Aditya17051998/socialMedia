const cors=require('cors');

//////////  cors is neccessary for using socket.io////////////
const options={
    cors:true,
    origins:["http://localhost:800"],
   }
//    origins:["http://127.0.0.1:5347"],
module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer,options);
    io.sockets.on('connection',function(socket){
        console.log('new connection',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnection');
        });

        socket.on('join_room',function(data){
            console.log('join room connect',data);
            socket.join(data.chatroom);
            io.in(data.chatRoom).emit('user_joined',data);
        });
         // CHANGE :: detect send_message and broadcast to everyone in the room
         socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });

    })
}