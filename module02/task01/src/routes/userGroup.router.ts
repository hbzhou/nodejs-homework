import express, { Router } from "express";
import { addUsersToGroup } from "../controller/userGroup.controller";

const router: Router = express.Router();

router.post("/", addUsersToGroup);

export default router;
