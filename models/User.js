const       mongoose = require("mongoose"),
            passportLocalMongoose = require("passport-local-mongoose"),
            // Schema = mongoose.Schema;
            { Schema } = mongoose;

const        UserSchema = new mongoose.Schema({
                fbId: String,
                lnId: String,
                username: String,
                password: String,
                avatar : String,
                email: String,
            });


//  adds additional methods from passportLocalMongoose to our User Schema.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);