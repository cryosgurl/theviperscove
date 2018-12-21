import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

import { User, addUser, getUserByUsername, comparePassword } from '../models/user';
import { corsOptions } from '../app';
import config from '../config/database';

const router = express.Router();

// Register
router.post('/register', cors(corsOptions), (req, res, next) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', cors(corsOptions), (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        comparePassword(password, user.password, (error, isMatch) => {
            if (error) {
                throw error;
            }
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 60400 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// profile
router.get('/profile', cors(corsOptions), (req, res, next) => {
    res.send(
        {hello: [
            1, 2
        ]}
    );
});

// validate
router.get('/validate', cors(corsOptions), (req, res, next) => {
    res.send(
        {hello: [
            1, 2
        ]}
    );
});

export default router;
