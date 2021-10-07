let jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function auth(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(200).send({ message: "please provide a token", status:false });
  } else {
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.status(200).send({ message: err.message, status:false });
      else {
        //everything is awesome
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
}

module.exports = auth;
