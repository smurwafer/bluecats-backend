"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let io;
exports.default = {
    init: (httpServer) => {
        io = new socket_io_1.Server(httpServer, {
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
        if (!io) {
            throw new Error('Socket not defined!');
        }
        return io;
    }
};
