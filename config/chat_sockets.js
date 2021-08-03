//this is going to be the observer(server side) for receiving the message

module.exports.chatSockets = function(socketServer){

        let io = require('socket.io')(socketServer);

        io.sockets.on('connection', function(socket){
            console.log('new connection has been estalished', socket.id);

            socket.on('disconnect', function(){
                console.log('socket disconnect');
            });


            ///letting the user joining the room
            socket.on('join_room', function(data){
            console.log('joining request receive', data);

                socket.join(data.chatroom);

                //telling all the user in that chatroom  that user has joined by emitting
                io.in(data.chatroom).emit('user_joined', data);
                
            });

            //detect send_messages and broadcast to everyone
            socket.on('send_message', function(data){
                io.in(data.chatroom).emit('received_message', data);


            });



        });



}