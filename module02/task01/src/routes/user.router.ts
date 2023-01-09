import express, { Router, Request, Response } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controller/user.controller";

import Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator();

const createUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
    .message("password must contain letters and numbers")
    .required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.bool().required(),
});

const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string()
    .regex(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
    .message("password must contain letters and numbers")
    .required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.bool().required(),
});

const router: Router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validator.body(createUserSchema), createUser);
router.put("/", validator.body(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
