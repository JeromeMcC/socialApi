const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Now connected to database.");

  
  await User.deleteMany({});

 
  await Thought.deleteMany({});

  
  await User.collection.insertMany(users);


  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding done.");
  process.exit(0);
});

