const express = require('express');
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();

router.post('/login', async (req, res, next) => {
  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const collection = database.collection('Users');
  const users = await collection.find({ Username: req.body.username, Password: req.body.password}).toArray();
  res.json({
      msg: users
    });
  await client.close();
});

router.post('/register', async (req, res, next) => {
  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const collection = database.collection('Users');
  const users = await collection.find({ Username: req.body.username}).toArray();
  if (users.length > 0) {
    res.json({
      err: "Username is taken!"
    });
    await client.close();
    return;
  }
  const id = new ObjectId();
  const date = new Date();
  await collection.insertOne({
    _id: id,
    FirstName: req.body.firstname,
    LastName: req.body.lastname,
    Username: req.body.username,
    Password: req.body.password,
    DateCreated: date,
    DateLastLoggedIn: "",
    Email: req.body.email,
    Ingredients: [],
    Badges: []
  })
  res.json({
      msg: "User registered"
  });
  await client.close();
});

module.exports = router;
