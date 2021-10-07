const express = require('express');
const router = express.Router();
const db = require("../model/helper");

const getAllDependents = (req, res) => {
  db("SELECT * FROM dependent ORDER BY depID ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
};

// GET ALL Dependents - e.g. localhost:5000/dependent - WORKING
router.get('/', function(req, res, next) {
  db("SELECT * FROM dependent ORDER BY depID ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET Dependent by ID - e.g. localhost:5000/dependent/1 - WORKING
router.get("/:id", function(req, res, next) {
  db(`SELECT * FROM dependent WHERE depID=${req.params.id};`)
    .then(results => {
      console.log(results.data);
      res.send(results.data[0]);
    })
    .catch(err => res.status(404).send("There is no Dependent with this ID"));
});

// ADD New Dependent - WORKING
router.post("/", function (req, res, next) {
  db(
    `INSERT INTO dependent (dep_name) VALUES ('${req.body.dep_name}');`
  )
    .then(results => {
      getAllDependents(req, res);
    })
    .catch(err => res.status(500).send(err));
});

// Update Existing Dependent - WORKING
router.put("/:depID", (req, res, next) => {
  console.log("Hello");
  // let newItems = req.body;
  console.log(`UPDATE dependent SET 
  dep_name ="${req.body.dep_name}"
  WHERE depID =${req.params.depID};`);
  // console.log(req.params.depID); // just to check, not necessary
  db(`UPDATE dependent SET 
      dep_name ="${req.body.dep_name}"
      WHERE depID =${req.params.depID};`)
    .then(results => {
      getAllDependents(req, res); // should get back full list of items
      res.status(201).send("Updated");
    })
    .catch(err => res.status(500).send(err));
});

// DELETE a Dependent by ID - WORKING
router.delete("/:depID", function(req, res, next) {
  console.log(req.params);
  db(`DELETE FROM dependent WHERE depID=${req.params.depID}`)
    .then(results => {
      getAllDependents(req, res);
      //res.send("Dependent deleted");
    })
    .catch(err => res.status(404).send(err));
});

module.exports = router;
