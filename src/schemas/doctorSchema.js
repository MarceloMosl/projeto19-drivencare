import joi from "joi";

export const docSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  specialty: joi.string().required(),
});

export const sessionSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
