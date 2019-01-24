const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require("./config/keys");


// setting up express
  const app = express();

// passport config

passport.use(
    new GoogleStrategy(
        {
         clientID: keys.googleClientID ,
         clientSecret: keys.googleClientSecret ,
         callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken)
        }
    )
);

app.get(
    '/auth/google', passport.authenticate('google', 
    {
    scope: ['profile', 'email']    
    })
);

app.listen(process.env.PORT)
















// Linked In strategy

// passport.use(new LinkedInStrategy({
//   clientID: keys.linkedinClientID ,
//   clientSecret: keys.linkedinClientSecret ,
//   callbackURL: "http://127.0.0.1:5000/auth/linkedin/callback",
//   scope: ['r_emailaddress', 'r_basicprofile'],
// }, function(accessToken, refreshToken, profile, done) {
//   // asynchronous verification, for effect...
//   process.nextTick(function () {
//     // To keep the example simple, the user's LinkedIn profile is returned to
//     // represent the logged-in user. In a typical application, you would want
//     // to associate the LinkedIn account with a user record in your database,
//     // and return that user instead.
//     return done(null, profile);
//   });
// }));
// and then authenticate as:

// app.get('/auth/linkedin',
//   passport.authenticate('linkedin', { state: 'SOME STATE'  }),
//   function(req, res){
//     // The request will be redirected to LinkedIn for authentication, so this
//     // function will not be called.
//   });
// the login callback:

// app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));