import express from "express";
import { SigninController } from "./signin/signin.controller.js";

import { signInSchema, validator } from "./signin/signin.validation.js";

export const AuthRouter = express.Router();
AuthRouter.post("/signin", validator.body(signInSchema), SigninController);
