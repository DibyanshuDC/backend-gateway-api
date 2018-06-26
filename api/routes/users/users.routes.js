'use strict';
/**
 * Module dependencies
 */
const router = require('express').Router();
const _ = require('lodash');
const axios = require('axios');
const {User} = require('./../../models/User');
// User Routes

router.route('/login')
    .get((req, res) => {
        res.send('this might be used in future for login links');
    })
    .post((req, res) => {
      let body = _.pick(req.body, ['email', 'password']);
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic Y3VzdG9tZXJDbGllbnQ6elJwSmJsNzNpRThY"},
            data: `grant_type=password&username=${body.email}&password=${body.password}&scope=UserProfile.me+UserProfile.secretkey.management`,
            url: 'http://10.0.5.53:8888/ms_oauth/oauth2/endpoints/oauthservice/tokens',
        };

        axios(options).then((response) =>{
            let data = response.data;
            if(data.access_token){
                axios({
                    method: 'GET',
                    headers: { "Authorization": `Bearer ${data.access_token}`},
                    url: 'http://10.0.5.53:14000/idaas/im/scim/v1/Me',
                }).then((response) =>{
                    data = response.data;
                    //Find if user exists if yes generate a token
                    User.findByUserName(data.userName).then((user) => {
                        if(user){
                            return user.generateAuthToken(data.userType).then((token) => {
                              let userObject = _.omit(user, 'access', '_id', 'tokens', 'createdAt', 'updatedAt', '__v');
                                res.status(200).header('x-auth', token).send(userObject);
                              });
                        }else{
                            var newuser = new User({
                                email: data.userName,
                                usrkey: data.id,
                                access : "auth"
                            });
                            newuser.save().then(()=>{
                                return newuser.generateAuthToken(data.userType);
                            }).then((token)=>{
                                var userObject = _.omit(newuser, 'access', '_id', 'tokens', 'createdAt', 'updatedAt', '__v');
                                res.status(201).header('x-auth', token).send(userObject);
                            }).catch((e)=>{
                                res.status(400).send();
                            })
                        }
                    }).catch((e) => {
                        res.status(e).send();
                    });
                });
            }else{
                throw "Something cracked";
            }

          }).catch((e) => {
            res.status(406).send(e.response.data);
        });

    });


module.exports = router;