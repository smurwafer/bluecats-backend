import mongoose, { mongo } from 'mongoose';
import { app } from './app';
import socket from './socket';
import * as http from 'http';

const start = async () => {
    const mongoUserName = process.env.MONGO_DB_USERNAME;
    const mongoPassword = process.env.MONGO_DB_PASSWORD;

    try {
        await mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0.fnmec.mongodb.net/bluecats`);
        console.log('Connected to mongoose');
    } catch (error) {
        throw new Error('Error connecting to database!');
    }

    const port = process.env.PORT || 2000;

    const server: http.Server = app.listen(port, () => {
        console.log('Listening on port:' + port);
    });

    // const io = socket.init(server);
    // io.on('connection', (socket) => {
    //     socket.on('disconnect', (reason) => {
    //         console.log('disconnected '+ reason);
    //     });
    // });
}

start();