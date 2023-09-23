const UserController = require("../controllers/UserController");

const users = require("express").Router();

users.get("/", UserController.getUser);
users.post("/", UserController.addUser);
users.get("/excel", UserController.exportExcel);
users.get("/:id", UserController.getUser);
users.put("/:id", UserController.editUser);
users.delete("/:id", UserController.deleteUser);

module.exports = users;