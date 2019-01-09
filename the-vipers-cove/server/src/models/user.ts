import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import config from '../config/database';

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User = mongoose.model('User', UserSchema);

export const getUserById = (id: Number, callback: any) => {
    User.findById(id, callback);
};

export const getUserByUsername = (username: String, callback: any) => {
    const query = {username: username};
    User.findOne(query, callback);
};

export const addUser = (newUser: any, callback: any) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
                throw error;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

export const comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    });
};
