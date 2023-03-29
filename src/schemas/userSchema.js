import joi from "joi";

export const userSchemma = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});
