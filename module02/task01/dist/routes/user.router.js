"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const joi_1 = __importDefault(require("joi"));
const express_joi_validation_1 = require("express-joi-validation");
const validator = (0, express_joi_validation_1.createValidator)();
const createUserSchema = joi_1.default.object({
    login: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
        .message("password must contain letters and numbers")
        .required(),
    age: joi_1.default.number().min(4).max(130).required(),
    isDeleted: joi_1.default.bool().required(),
});
const updateUserSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    login: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
        .message("password must contain letters and numbers")
        .required(),
    age: joi_1.default.number().min(4).max(130).required(),
    isDeleted: joi_1.default.bool().required(),
});
const router = express_1.default.Router();
router.get("/", user_controller_1.getUsers);
router.get("/:id", user_controller_1.getUserById);
router.post("/", validator.body(createUserSchema), user_controller_1.createUser);
router.put("/", validator.body(updateUserSchema), user_controller_1.updateUser);
router.delete("/:id", user_controller_1.deleteUser);
exports.default = router;
