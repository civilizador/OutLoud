const   express =           require('express'),
        mongoose =          require('mongoose'),
        bodyParser =        require("body-parser"),
        flash    =          require("connect-flash"),
        methodOverride =    require("method-override"),
        keys =              require("./config/keys"),
        passport =          require("passport"),
        cookieSession =     require("cookie-session"),
        LinkedInStrategy =  require('passport-linkedin-oauth2').Strategy,
        FacebookStrategy =  require('passport-facebook').Strategy,
        passportConfig =    require("./services/passport.js");
  
//APP CONFIG

    //  Connecting to DB 
    mongoose.connect(`mongodb://${keys.mongoUserName}:${keys.mongoPassword}@ds219055.mlab.com:19055/outloud-dev`);
      
    // SETTING UP EXPRESS
        const app = express();
  
    //  Cookie-session configuration
    app.use(cookieSession({
        maxAge: 15 * 24 * 60 * 60 * 1000,
        keys: [keys.cookie_session_secret]
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    // config default engine for views
    app.set("view engine", "ejs");
    
    // connecting flash messages,method overrride and body-parser libs
    app.use(flash());
    app.use(bodyParser.urlencoded({
    	extended: true
    }));
    app.use(methodOverride("_method"));
    
    // defining default path to public directory
    app.use(express.static("public"));
    app.use(express.static(__dirname + "/public"));
    
    
    //   Creating a function that will check if there is a username/i.e is user loged in or not.
    app.use(function(req, res, next) {
    	res.locals.currentUser = req.user; // req.user will either be empty or contain information about user from the request
    	res.locals.error = req.flash("error");
    	res.locals.success = req.flash("success");
    	next();
    });
   require("./routes/authRoutes.js")(app);
    
app.listen(5000 || process.env.PORT,function(){console.log(`Server had been started ${process.env.PORT}`)})


