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
	profileFields: ['id', 'emails', 'name'],
	proxy:true
}, async (accessToken, refreshToken, profile, done) => {
	// console.log(accessToken, refreshToken, profile)  
	const existingUser = await User.findOne({fbId: profile.id});
		if (existingUser) {
			console.log('User exist with following FBID: ' + existingUser)
			done(null, existingUser)
		} else {
			console.log('User was created with following FBID: ' + profile.id)
			const user = await new User({fbId: profile.id}).save()
			done(null, user)
		}
}));

//  PASSPORT LINKED IN CONFIGURATION

passport.use(new LinkedInStrategy({
	clientID: keys.linkedinClientID,
	clientSecret: keys.linkedinClientSecret,
	callbackURL: '/auth/linkedIn/callback',
	// will allow to run app on cloud 9 in dev and heroku in production.
	// the other way is specify fqdn with https in keys file
	proxy:true,
	// scope: ['r_emailaddress', 'r_basicprofile']
	profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
}, async (accessToken, refreshToken, profile, done) => {
	// console.log(accessToken, refreshToken, profile)  
	const existingUser = await User.findOne({lnId: profile.id});
		if (existingUser) {
			console.log('User exist with following LNID: ' + existingUser)
			done(null, existingUser)
		} else {
			console.log('User was created with following LNID: ' + profile.id)
			const user = await new User({lnId: profile.id}).save()
			done(null, user)
		}
	})
);


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