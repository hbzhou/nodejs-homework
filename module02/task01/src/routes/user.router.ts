import express, { Router, Request, Response } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controller/user.controller";

const router: Router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/:id", deleteUser);

export default router;
