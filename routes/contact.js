const express = require('express')
const router = express.Router();
const db = require("../model/helper");

const getAllContacts = (req, res) => {
  db("SELECT * FROM contact ORDER BY contactName ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => console.log(err));
};

//GET All Contacts (by Name) - WORKING
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT * FROM contact ORDER BY contactName ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


//GET All contacts (by Relationship) - WORKING
router.get('/relationship', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT * FROM contact ORDER BY relationship ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


// GET Contact by Name - NOT WORKING
router.get("/contactName/:contactName", function(req, res, next) {
  db(`SELECT * FROM contact WHERE contactName ="${req.params.contactName}";`)
    .then(results => {
     console.log(results.data); // for checking
     res.send(results.data);
    })
    .catch(err => res.status(404).send("There is no contact with this name"));
});


// ADD new Contact - WORKING
router.post("/", function(req, res, next) {
  //let newContact = req.body;
  db(
    `INSERT INTO contact (contactName, telNo, relationship) VALUES("${req.body.contactName}", "${req.body.telNo}", "${req.body.relationship}");`
  ).then(results => {
      getAllContacts(req, res); // get full list of contacts
      //res.status(201).send("New contact added");
    })
    .catch(err => res.status(500).send(err));
});

// Update Existing Contact - WORKING
router.put("/:contactID", (req, res, next) => {
  console.log("Hello");
  // let newItems = req.body;
  console.log(`UPDATE contact SET 
  contactName ="${req.body.contactName}", 
  telNo ="${req.body.telNo}", 
  relationship ="${req.body.relationship}" 
  WHERE contactID =${req.params.contactID};`);
  // console.log(req.params.id); // just to check, not necessary
  db(`UPDATE contact SET 
      contactName ="${req.body.contactName}", 
      telNo ="${req.body.telNo}",
      relationship ="${req.body.relationship}"  
      WHERE contactID =${req.params.contactID};`)
    .then(results => {
      getAllContacts(req, res); // should get back full list of contacts
      //res.status(201).send("Contacts Updated");
    })
    .catch(err => res.status(500).send(err));
});

// DELETE a contact by ID - WORKING
router.delete("/:contactID", function(req, res, next) {
  console.log(req.params);
  db(`DELETE FROM contact WHERE contactID=${req.params.contactID}`)
    .then(results => {
      getAllContacts(req, res);
      //res.send("Contact deleted");
    })
    .catch(err => res.status(404).send(err));
});

module.exports = router;
