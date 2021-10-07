const express = require("express");
const router = express.Router();
const db = require("../model/helper");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

const auth = require("../guards/auth");

router.get("/", function (req, res, next) {
  db("SELECT * FROM users ORDER BY userID ASC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/register", async (req, res) => {
  const { usernameReg, passwordReg, passwordRepeat } = req.body;
  //validate if username already exists
  const exists = await db(
    `SELECT * FROM users WHERE username = "${usernameReg}"`
  );
  if (exists.data.length >= 1)
    return res
      .status(400)
      .send({ message: `User ${usernameReg} already exists. Please proceed to login or choose a different username to create your new account.` });
  // validate fields not entered
  if (!usernameReg || !passwordReg || !passwordRepeat)
    return res
      .status(400)
      .send({ message: "Please enter all required fields" });
  //validate password too short
  if (passwordReg.length < 6)
    return res
      .status(400)
      .send({
        message: "Please enter a minimum of 6 characters for your password",
      });
  //validate repeat password
  if (passwordReg !== passwordRepeat)
    return res.status(400).send({ message: "Password does not match" });
  try {
    //passed all validation, now to hash the password
    const hash = await bcrypt.hash(passwordReg, saltRounds);
    //register the user
    await db(
      `INSERT INTO users (username, password) VALUES ("${usernameReg}", "${hash}")`
    );
    res.send({ message: "Registration successful. Please login to continue" });

    
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // validate fields not entered
  if (!username || !password)
    return res
      .status(400)
      .send({ message: "Please enter all required fields" });
  // validate fields not entered
  try {
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;
      //compare password
      const correctPassword = await bcrypt.compare(password, user.password);
      //if wrong password
      if (!correctPassword)
        //return res.status(401).json({ errorMessage: "Wrong email or password"})
        //throw new Error("Wrong email or password");
        return res.status(400).send({ message: "Wrong username or password" }); //convention to throw off hackers by not giving exact error
      let token = jwt.sign({ user_id }, supersecret);
      //res.send({ message: "Login successful"});
      res.send({ message: "Login successful", token });
      //send token in cookie
      //res.cookie("token", token, {httpOnly:true}).send();
    } else {
      //if user does not exist
      //return res.status(401).json({ errorMessage: "Wrong email or password"})
      //throw new Error("Wrong email or password");
      return res.status(400).send({ message: "Wrong username or password" }); //convention to throw off hackers by not giving exact error
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/loggedIn", auth, (req, res) => {
  res.send({ status: true });
});

module.exports = router;

/* 
router.get("/loggedIn", auth, (req, res) => {
  
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).send(false);
  } else {
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.status(401).send(false);
      else {
        //everything is awesome
        req.user_id = decoded.user_id;
        res.send(true)
      }
    });
  }
});
 */

/* 
    //login after registered - not yet
    const results = await db(
      `SELECT * FROM users WHERE username = "${usernameReg}"`
    );
    const user = results.data[0];
    const user_id = user.id;
    let token = jwt.sign({ user_id }, supersecret);
    res.send({ message: "Login successful", token })
    //send token in cookie
    //res.cookie("token", token, {httpOnly:true}).send();  
    */