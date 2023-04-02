import joi from "joi";

export const userSchemma = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const sessionSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const getDoctor = joi.object({
  name: joi.string(),
  specialty: joi.string(),
});
