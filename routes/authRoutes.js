const  passport = require('passport');
       

module.exports = (app) => {
   app.get('/',(req,res) => {
        res.redirect('login.ejs')
    })
    
    
// FACEBOOK AUTH ROUTES
    
    app.get('/auth/facebook', passport.authenticate('facebook', { 
        scope : ['email'] }));
 
    app.get('/auth/facebook/callback',passport.authenticate('facebook', { 
        successRedirect: '/',
        failureRedirect: '/login' 
    }));


// LINKED IN AUTH ROUTES

    app.get('/auth/linkedIn',   passport.authenticate('linkedin', { 
        scope: ['r_basicprofile', 'r_emailaddress'] }));

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        successRedirect: '/landing.ejs',
        failureRedirect: '/login.ejs'
    }));

// LOGOUT ROUTE
    app.get("/api/logout", (req,res)=>{
        req.logout();
        res.send(req.user)
    })
// TESTING LOGGED IN USER ROUTE

    app.get('/loggedInUser', (req,res) => {
        res.send(req.user);
    }) 
 
}
    
