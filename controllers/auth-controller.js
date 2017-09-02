import User from 'models/User';
import Database from 'utils/database';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const SECRET = 'fiowjf8dvn213s!k!dc!nopq~iod3123==';

class AuthController {

    async signin(email, password) {
        let sequelize = await Database.start();
        return new Promise((resolve, reject) => {
            User(sequelize).sync()
                .then(() => {
                    User(sequelize).findOne({ where: {email: email, password: password} })
                        .then(user => {
                            if(user)
                                resolve(this.filterUserInfo(user));
                            else
                                reject();
                        })
                        .catch(err => {
                            reject(err);
                        });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    async isExist(username) {
        let sequelize = await Database.start();
        return new Promise((resolve, reject) => {
            User(sequelize).sync()
                .then(() => {
                    User(sequelize).findOne({ where: {email: username} })
                        .then(user => {
                            resolve(user);
                        })
                        .catch(err => {
                            reject(err);
                        });
                });
        });
    }

    async signup(args) {
        console.log(args);
        let sequelize = await Database.start();
        let isExist = await this.isExist(args['email']);
        return new Promise((resolve, reject) => {
            if(isExist) { reject('Username is already taken');}
            else {
                User(sequelize).sync()
                    .then(() => {
                        User(sequelize).create(args)
                            .then(user => {
                                resolve(user);
                            })
                            .catch(err => {
                                reject(err);
                            });
                    });
            }
        });
    }

    async dropAll() {
        let sequelize = await Database.start();
        return new Promise((resolve, reject) => {
            User(sequelize).drop()
                .then(() => { resolve(200);})
                .catch((err) => { reject(err);} );
        });
    }

    createToken(user) {
        return jwt.sign(user, SECRET, {
            expiresIn: 1440*60 //24 hours
        });
    }

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET, (err, decoded) => {
                if(err)
                    reject(null);
                else
                    resolve(decoded);
            });
        });
    }

    getTokenErrorMessage() {
        return {
            success: false,
            message: 'Invalid Token'
        };
    }

    filterUserInfo(user) {
        const publicInfo = ['email'];
        return _.pick(user, publicInfo);
    }
}

export default new AuthController();
