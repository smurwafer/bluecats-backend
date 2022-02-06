import ioserver, { Server } from 'socket.io';
import * as http from 'http';

let io : Server;

export default {
    init: (httpServer: http.Server) => {
        io = new Server(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                credentials: true
            },
            upgradeTimeout: 30000,
            pingTimeout: 180000,
            pingInterval: 25000,
        });
        return io;
    },
    getIo: () => {
        if(!io) {
            throw new Error('Socket not defined!');
        }
        return io;
    }
}