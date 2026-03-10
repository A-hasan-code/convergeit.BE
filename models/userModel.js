const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
    },
    profilePic: {
        type: String,
        default: "",
    },
    userType: {
        type: String,
        default: "client",
    },
    phone: {
        type: String,
        require: true,
    },
    mobile: {
        type: String,
        require: true,
    },
    failedAttempts: {
        type: Number,
        default: 0,
    },
    accountStatus: {
        type: String,
        default: "active",
    },
    resetPassword: {
        type: String,
        default: "",
    },
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }] // New field


}, {
    timestamps: true,
});

userSchema.pre("save", async function(next) {
    const user = this;

    user.email = user.email.toLowerCase();

    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = 10;
        const hashedPassword = await bCrypt.hash(user.password, saltRound);
        user.password = hashedPassword;    
    } catch (error) {
        next(error);
    }
});

const User = new mongoose.model("User", userSchema);

module.exports=User;