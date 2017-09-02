import express from 'express';
import sha512 from 'sha512';
import _ from 'lodash';
import AuthController from 'controllers/auth-controller.js';

let auth = express();

/* Route for sign in with username and password*/
/* @return : a object that contains user and token*/
auth.post('/signin', async (req, res) => {
    /* Get parameter from a request */
    let email = req.body.email;
    let password = sha512(req.body.password).toString('hex'); //use sha512 to hash the password before checking
    try{
        let user = await AuthController.signin(email, password); //calling controller to get user from database
        res.status(200).send({
            success: true,
            user: user
        });
    }catch(err) { /* Otherwise, send an error */
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
    }
});

/*
  Route for signup.
  @return: a object that contains token and user.
*/
auth.post('/signup', async (req ,res) => {
    /*Get parameters from a request */
    let email = req.body.email;
    let password = sha512(req.body.password).toString('hex'); // hash pass with sha512

    /* Call signup() from auth-controller. */
    try{
        console.log(req.body);
        console.log(_.merge(req.body,{password}));
        await AuthController.signup(_.merge(req.body,{password}));
        /*If able to create new user, then call signin from controller to get the user that has been created. */
        let user = await AuthController.signin(email, password);
        res.status(200).send({
            success: true,
            user: user
        });
    }catch (err) {
        res.status(401).send({
            success: false,
            message: err
        });
    }
});

export default auth;