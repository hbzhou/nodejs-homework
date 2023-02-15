import express, { Router } from "express";
import { createGroup, deleteGroup, getGroupById, getGroups, updateGroup } from "../controller/group.controller";

const router: Router = express.Router();

router.get("/", getGroups);
router.get("/:id", getGroupById);
router.post("/", createGroup);
router.put("/", updateGroup);
router.delete("/", deleteGroup);

export default router;
