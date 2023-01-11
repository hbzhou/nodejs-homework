import express, { Router, Request, Response } from "express";
import { createUser, deleteUser, getAutoSuggestUsers, getUserById, getUsers, updateUser } from "../controller/user.controller";

import { createValidator } from "express-joi-validation";
import { createUserSchema, updateUserSchema } from "../schema/user.schema";

const validator = createValidator();

const router: Router = express.Router();

router.get("/", getUsers);
router.get("/suggest", getAutoSuggestUsers);
router.get("/:id", getUserById);
router.post("/", validator.body(createUserSchema), createUser);
router.put("/", validator.body(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
