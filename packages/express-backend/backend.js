// backend.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);
const app = express();
const port = 8000;

// connect to MongoDB database using mongoose
mongoose
  .connect("mongodb://localhost:27017/users")
  .catch((error) => console.log(error));

// get users with an optional query
function getUsers(name, job) {
  let optionalQuery = {};
  if (name) optionalQuery.name = name;
  if (job) optionalQuery.job = job;
  return userModel.find(optionalQuery);
}

// add a new user
function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

// find user by id
function findUserById(id) {
  return userModel.findById(id);
}

// delete a user by id
function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  const result = await getUsers(name, job);
  res.json({ users_list: result });
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const createdUser = await addUser(userToAdd);
  console.log("Added user:", createdUser);
  res.status(201).json(createdUser);
});

app.delete("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const deletedUser = await deleteUserById(id);
    if (deletedUser) {
      res.status(204).send("User deleted.");
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
  deleteUserById,
};