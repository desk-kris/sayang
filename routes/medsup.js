const db = require("../model/helper");
const express = require('express');
const router = express.Router();

const getAllMedSup = (req, res) => {
  db(`SELECT * FROM medsup ORDER BY medID DESC;`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => console.log(err));
};
/* 
//GET All MEDS and SUP (by Dependent ID)
router.get('/dep/:depID', function(req, res, next) {
  //res.send('respond with a resource');
  //SELECT dependent.dep_name, medsup.medName, medsup.medCondition, medsup.dosage, medsup.frequency FROM dependent, medsup WHERE dependent.depID=medsup.depID;
  db(`SELECT * FROM medsup WHERE depID=${req.params.depID};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});
 */
//GET All MEDS and SUPPLEMENTS (by Dependent ID)
router.get('/dep/:depID', function(req, res, next) {
  //res.send('respond with a resource');
  //
  db(`SELECT dependent.dep_name, medsup.medName, medsup.medType, medsup.medCondition, medsup.dosage, medsup.frequency FROM dependent, medsup WHERE dependent.depID=${req.params.depID}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//GET All MEDS and SUP (by Name of Meds) e.g. localhost:5000/medsup - WORKS
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db(`SELECT * FROM medsup ORDER BY medID DESC;`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET Meds Only by Name e.g. localhost:5000/medsup/medName/Aricept - WORKS
router.get("/medName/:medName", function(req, res, next) {
  db(`SELECT * FROM medsup WHERE medName ="${req.params.medName}";`)
    .then(results => {
     console.log(results.data); // for checking
     res.send(results.data);
    })
    .catch(err => res.status(404).send("There is no meds or supplements with this name"));
});


// ADD new Meds
router.post("/", function(req, res, next) {
  //let newContact = req.body;
  db(
    `INSERT INTO medsup (medName, medType, medCondition, dosage, frequency, depID) VALUES("${req.body.medName}", "${req.body.medType}", "${req.body.medCondition}", "${req.body.dosage}", "${req.body.frequency}", ${req.body.depID});`
  ).then(results => {
      getAllMedSup(req, res); // get full list of contacts
      //res.status(201).send("New contact added");
    })
    .catch(err => res.status(500).send(err));
});

// Update Existing Entry
router.put("/:medID", (req, res, next) => {
  console.log(`UPDATE medsup SET 
  medName ="${req.body.medName}", 
  medType ="${req.body.medType}", 
  medCondition ="${req.body.medCondition}", 
  dosage ="${req.body.dosage}",
  frequency ="${req.body.frequency}" 
  WHERE medID =${req.params.medID};`);
  // console.log(req.params.id); // just to check, not necessary
  db(`UPDATE medsup SET 
  medName ="${req.body.medName}", 
  medType ="${req.body.medType}", 
  medCondition ="${req.body.medCondition}", 
  dosage ="${req.body.dosage}",
  frequency ="${req.body.frequency}" 
  WHERE medID =${req.params.medID};`)
    .then(results => {
      getAllMedSup(req, res); // should get back full list of Meds and Supplements
      //res.status(201).send("Meds Updated");
    })
    .catch(err => res.status(500).send(err));
});

// DELETE an Entry by ID
router.delete("/:medID", function(req, res, next) {
  console.log(req.params);
  db(`DELETE FROM medsup WHERE medID=${req.params.medID}`)
    .then(results => {
      getAllMedSup(req, res);
      //res.send("Contact deleted");
    })
    .catch(err => res.status(404).send(err));
});

module.exports = router;
