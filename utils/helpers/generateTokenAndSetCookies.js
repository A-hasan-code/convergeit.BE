const jwt = require("jsonwebtoken");

const generteTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (match expiresIn)
        sameSite: isProduction ? "none" : "lax", // lax for local (http://localhost)
        secure: isProduction, // false for local so cookie works on HTTP
    });

    return token;
}

module.exports = generteTokenAndSetCookie;



// const jwt = require("jsonwebtoken");

// const generteTokenAndSetCookie = (userId, res) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.cookie("jwt", token, {
//         httpOnly: true,
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         sameSite: "lax", // Use lax for local development
//         secure: false, // Use false for local development
//     });

//     return token;
// }

// module.exports = generteTokenAndSetCookie;
