import express, { Router } from "express";
import { getGroups } from "../controller/group.controller";

const router: Router = express.Router();

router.get("/", getGroups);

export default router;
