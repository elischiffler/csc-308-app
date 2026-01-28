// backend.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from "./user";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let results = users.users_list;
  if (name) {
    results = results.filter((user) => user.name === name);
  }
  if (job) {
    results = results.filter((user) => user.job === job);
  }
  res.json({ users_list: results });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// get a new user given a name and job
app.get("/users/:name/:job", (req, res) => {
  const name = req.params["name"];
  const job = req.params["job"];
  const result = users["users_list"].find(
    (user) => user["name"] === name && user["job"] === job,
  );
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const userWithId = {
    ...userToAdd,
    id: String(Math.floor(Math.random() * 1_000_000)),
  };
  const createdUser = addUser(userWithId);

  console.log("Added user:", createdUser);

  res.status(201).json(createdUser);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const userIndex = users["users_list"].findIndex((user) => user["id"] === id);
    if (userIndex !== -1) {
        users["users_list"].splice(userIndex, 1);
        res.status(204).send("User deleted successfully.");
    } else {
        res.status(404).send("User not found.");
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};