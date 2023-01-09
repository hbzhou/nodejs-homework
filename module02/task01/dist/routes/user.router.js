"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const express_joi_validation_1 = require("express-joi-validation");
const user_schema_1 = require("../schema/user.schema");
const validator = (0, express_joi_validation_1.createValidator)();
const router = express_1.default.Router();
router.get("/", user_controller_1.getUsers);
router.get("/:id", user_controller_1.getUserById);
router.post("/", validator.body(user_schema_1.createUserSchema), user_controller_1.createUser);
router.put("/", validator.body(user_schema_1.updateUserSchema), user_controller_1.updateUser);
router.delete("/:id", user_controller_1.deleteUser);
exports.default = router;
