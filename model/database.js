require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "sayang",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

    let sql = "DROP TABLE if exists users;\
    CREATE TABLE users(\
      userID INT NOT NULL AUTO_INCREMENT,\
      username VARCHAR(50) NOT NULL,\
      password VARCHAR(255) NOT NULL,\
      email VARCHAR(50),\
      PRIMARY KEY (userID));\
    INSERT INTO users \
    (username, password)\
    values ('testusername01', 'testpassword01');\
    DROP TABLE if exists dependent;\
    CREATE TABLE dependent (depID int NOT NULL AUTO_INCREMENT, dep_name varchar(255) NOT NULL, meds varchar(255), PRIMARY KEY(depID));\
    DROP TABLE if exists medsup;\
    CREATE TABLE medsup (medID int NOT NULL AUTO_INCREMENT, medName varchar(255), medType varchar(255), medCondition varchar(255), dosage varchar(255), frequency varchar(255), depID int, PRIMARY KEY (medID), FOREIGN KEY (depID) REFERENCES dependent(depID));\
    DROP TABLE if exists contact;\
    INSERT INTO medsup (medName, medType, medCondition, dosage, frequency, depID)\
    VALUES ('Aricept', 'Medication', 'Dementia', '2 tablets', '2 times/day', 1);\
    CREATE TABLE contact (contactID int NOT NULL AUTO_INCREMENT, contactName varchar(255) NOT NULL, telNo varchar(255), relationship varchar(255), PRIMARY KEY(contactID));"
  
    con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Tables creations successful:\
    `users (userID, username, password, email)`, \
    `dependent (depID, dep_name, meds)`,\
    `medsup (medID, medName, medType, medCondition, dosage, frequency)`\
    `contact (contactID, contactName, telNo, relationship ) ");

    console.log("Closing...");
  });

  con.end();
});
