import mongoose = require('mongoose');

export class ChatServer {

    public mainConfig: JSON;
    public dbPath: string;

    constructor(){

    }

    public static Init(): ChatServer {
        return new ChatServer();
    }

    public LoadConfig(config: JSON): void {
        this.mainConfig = config;
        console.log("Load config done!");
        this.MongoDBSetup();
    }

    public MongoDBSetup(): void {
        this.dbPath = 'mongodb://' + this.mainConfig['database']['ip'] + ":" + this.mainConfig['database']['port'] + '/' + this.mainConfig['database']['name'];
        console.log('Connect to MongoDB with path: ' + this.dbPath);
        mongoose.connect(this.dbPath, { useNewUrlParser: true });
        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB!!!');
            // Do something
        });
        mongoose.connection.on('error', () => {
            console.log('MongoDB connection error!');
            process.exit();
        });
    }
}