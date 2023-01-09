"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const users_db_1 = require("../db/users.db");
const express_joi_validation_1 = require("express-joi-validation");
function getUsers(_, response) {
    response.json(users_db_1.users.filter((user) => !user.isDeleted));
}
exports.getUsers = getUsers;
function getUserById(request, response) {
    const id = request.params.id;
    const user = users_db_1.users.find((user) => user.id === id);
    if (!user) {
        response.status(401).json({
            error: "user not found",
        });
    }
    response.json(user);
}
exports.getUserById = getUserById;
function createUser(request, response) {
    const createUserReq = request.body;
    const user = Object.assign({ id: (0, uuid_1.v4)() }, createUserReq);
    users_db_1.users.push(user);
    response.status(201).json(user);
}
exports.createUser = createUser;
function updateUser(request, response) {
    const updateUserRequest = request.body;
    console.log(updateUserRequest);
    const index = users_db_1.users.findIndex((user) => updateUserRequest.id === user.id);
    if (index < 0) {
        throw new Error("user not found");
    }
    users_db_1.users[index].login = updateUserRequest.login;
    users_db_1.users[index].password = updateUserRequest.password;
    users_db_1.users[index].age = updateUserRequest.age;
    users_db_1.users[index].isDeleted = updateUserRequest.isDeleted;
    return response.status(201).json(users_db_1.users[index]);
}
exports.updateUser = updateUser;
function deleteUser(request, response) {
    const id = request.params.id;
    const index = users_db_1.users.findIndex((user) => user.id === id);
    if (index < 0) {
        throw new Error("user not found");
    }
    users_db_1.users[index].isDeleted = true;
    return response.sendStatus(200);
}
exports.deleteUser = deleteUser;
