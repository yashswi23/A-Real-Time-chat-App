import express from 'express';
import {createServer} from 'node:http'
import { fileURLToPath } from 'node:url';
import { dirname,join } from 'node:path';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
const dir_name = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => {
    res.sendFile(join(dir_name, 'public/index.html'));
});

// io.on('connection',(socket)=>{
//     console.log('a user connected');
//     socket.on('disconnect',()=>{
//         console.log('user disconnected');
//     })
// });

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.broadcast.emit('hi', 'A new user has Joined!');

    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
})

server.listen(3000,()=>{
    console.log(`Server is running on 3000`);
})