import joi from "joi";

export const userSchemma = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  type: joi
    .string()
    .length(1)
    .pattern(/^[1-2]+$/)
    .required(),
});

export const sessionSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
