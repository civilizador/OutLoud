const express = require('express'),
		passport = require('passport'),
		keys = require("../config/keys"),
		mongoose = require("mongoose"),
		LocalStrategy =    require("passport-local"),
	    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
		FacebookStrategy = require('passport-facebook').Strategy;
	
const User = require("../models/User");


passport.serializeUser((user, done)=>{
	done(null,user.id);
});

// id is id of the user entry in MongoDB.
passport.deserializeUser((id, done)=>{
	User.findById(id)
		.then((user)=>{
			done(null, user)
		})
});
    

//  PASSPORT FACEBOOK LOGIN CONFIGURATION

passport.use(new FacebookStrategy({
	clientID: keys.facebookClientID,
	clientSecret: keys.facebookClientSecret,
	callbackURL: '/auth/facebook/callback',
	profileFields: ['id', 'emails', 'name']
}, (accessToken, refreshToken, profile, done) => {
	// console.log(accessToken, refreshToken, profile)  
	User.findOne({
		fbId: profile.id
	}).then(existingUser => {
		if (existingUser) {
			console.log('User exist with following FBID: ' + existingUser)
			done(null, existingUser)
		} else {
			console.log('User was created with following FBID: ' + profile.id)
			new User({
				fbId: profile.id
			}).save().then(user => done(null, user))
		}
	})
}));


//  PASSPORT LINKED IN CONFIGURATION

passport.use(new LinkedInStrategy({
	clientID: keys.linkedinClientID,
	clientSecret: keys.linkedinClientSecret,
	callbackURL: '/auth/linkedIn/callback',
	// scope: ['r_emailaddress', 'r_basicprofile']
	profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
}, (accessToken, refreshToken, profile, done) => {
	// console.log(accessToken, refreshToken, profile)  
	User.findOne({
		lnId: profile.id
	}).then(existingUser => {
		if (existingUser) {
			console.log('User exist with following LNID: ' + existingUser)
			done(null, existingUser)
		} else {
			console.log('User was created with following LNID: ' + profile.id)
			new User({
				lnId: profile.id
			}).save().then(user => done(null, user))
		}
	})
}));







// Google Strategy

 // passport.use(
    //     new GoogleStrategy(
    //         {
    //          clientID: keys.googleClientID ,
    //          clientSecret: keys.googleClientSecret ,
    //          callbackURL: 'https://outloud-react-civilizador.c9users.io/auth/google/callback'
    //         },
    //         (accessToken, refreshToken, profile, done)  => {
    //             console.log(accessToken, refreshToken, profile)
    //         }
    //     )
    // );