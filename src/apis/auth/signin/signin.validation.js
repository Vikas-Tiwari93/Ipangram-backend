import Joi from "joi";
import { createValidator } from "express-joi-validation";

export const validator = createValidator();
export const signInSchema = Joi.object({
  userId: Joi.string().required(),

  password: Joi.string().required(),
  role: Joi.string().valid("employee", "manager").required(),
});
