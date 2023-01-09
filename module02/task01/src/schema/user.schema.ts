import Joi from "joi";

export const createUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
    .message("password must contain letters and numbers")
    .required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.bool().required(),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string()
    .regex(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"))
    .message("password must contain letters and numbers")
    .required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.bool().required(),
});
