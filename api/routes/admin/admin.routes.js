'use strict';
/**
 * Module dependencies
 */
const router = require('express').Router();
const {privilaged} = require('./../../middleware/privilaged');

// User Routes

router.route('/hello').get(privilaged);


module.exports = router;

// bs: {
//     o: 'http://10.0.5.53:7001/',
//     m: 'http://10.0.5.52:8081/api/',
//     im: 'http://10.0.5.53:14000/',
//     am: 'http://10.0.5.53:8888/'
// },



// $http({
//     url: cons.bs.am + 'ms_oauth/oauth2/endpoints/oauthservice/tokens',
//     method: "POST",
//     data: "grant_type=password&username=" + $scope.email + "&password=" + $scope.password + "&scope=UserProfile.me+UserProfile.secretkey.management",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Authorization": "Basic Y3VzdG9tZXJDbGllbnQ6elJwSmJsNzNpRThY"
//     }
// })
// .then(function (token_response) {
//         localStorage.setItem("token", token_response.data.access_token);
//         localStorage.setItem("refresh", token_response.data.refresh_token);
//         $http({
//             url: cons.bs.im + 'idaas/im/scim/v1/Me',
//             method: "GET",
//             headers: {
//                 "Authorization": 'Bearer ' + token_response.data.access_token
//             }
//         }).then(function (response) {
//             localStorage.setItem("userkey", response.data.id);
//             localStorage.setItem("name", response.data.name.givenName);
//             localStorage.setItem("email", response.data.emails[0].value);
//             $window.location.href = '/#!/dashboard';
//         });
//     },
//     function (e) {
//         console.log("Errors in request", e);
//     });