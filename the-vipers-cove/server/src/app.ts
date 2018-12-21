import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import config from './config/database';
import passportConfig from './config/passport';
import users from './routes/users';

// Connect to DataBase
mongoose.connect(config.database);

// Checks DB connection
mongoose.connection.on('connected', () => {
    console.log('Connected to DB ' + config.database);
});

// Checks On Error
mongoose.connection.on('error', (err) => {
    console.log('Failed to connect ' + err);
});

// Cors Middleware
export const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.passport();
    }

    private passport(): void {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passportConfig(passport);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
    }

    private routes(): void {
        this.app.use('/users', users);
    }
}

export default new App().app;
