const   express = require('express'),
        passport = require('passport'),
        keys = require("../config/keys"),
        LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
        FacebookStrategy = require('passport-facebook').Strategy;


    
//  PASSPORT FACEBOOK LOGIN CONFIGURATION
    
    passport.use(new FacebookStrategy(
        {
            clientID: keys.facebookClientID ,
            clientSecret: keys.facebookClientSecret ,
            callbackURL: 'https://outloud-react-civilizador.c9users.io/auth/facebook/callback',
            profileFields: ['id', 'emails', 'name']
        },
        (accessToken, refreshToken, profile, done)  => {
            console.log(accessToken, refreshToken, profile)  
        }
    ));
    
//  PASSPORT LINKED IN CONFIGURATION
    
    passport.use(new LinkedInStrategy(
        {
            clientID: keys.linkedinClientID ,
            clientSecret: keys.linkedinClientSecret ,
            callbackURL: 'https://outloud-react-civilizador.c9users.io/auth/linkedIn/callback',
            scope: ['r_emailaddress', 'r_basicprofile']
            
        },
        (accessToken, refreshToken, profile, done)  => {
            console.log('LinkedIN:' + "AccessToken: " + accessToken+ "  refreshToken: " + refreshToken +"  Profile: " + profile.id)  
        }
    ));