import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    const mongoUserName = process.env.MONGO_DB_USERNAME;
    const mongoPassword = process.env.MONGO_DB_PASSWORD;
    const mongoDbName = process.env.MONGO_DB_NAME;

    try {
        await mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0.fnmec.mongodb.net/${mongoDbName}`);
        console.log('Connected to mongoose');
    } catch (error) {
        throw new Error('Error connecting to database!');
    }

    const port = process.env.PORT || 2000;

    app.listen(port, () => {
        console.log('Listening on port:' + port);
    });
}

start();