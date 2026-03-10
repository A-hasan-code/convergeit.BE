const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const validateResult = require("../utils/validators/validateResult");

const protectRoute = async (req, res, next) => {
    // validateResult(req, res, next);
    try {
        const token = req.cookies.jwt;

        console.log(token)
        if(!token) {
         return res.status(401).json({error: "Unauthorized User"});
            }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({error: "Unauthorized User"});
           }

        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in ProtectRoute", error.message)
    }
    
};

module.exports = protectRoute;