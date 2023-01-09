"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    login: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
        .message("password must contain letters and numbers")
        .required(),
    age: joi_1.default.number().min(4).max(130).required(),
    isDeleted: joi_1.default.bool().required(),
});
exports.updateUserSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    login: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
        .message("password must contain letters and numbers")
        .required(),
    age: joi_1.default.number().min(4).max(130).required(),
    isDeleted: joi_1.default.bool().required(),
});
