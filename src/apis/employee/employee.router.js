import express from "express";

import {
  addEmployeeController,
  deleteEmployeeController,
  listController,
  searchController,
  updateEmployeeController,
} from "./employee/employee.controller.js";

export const EmployeeRouter = express.Router();
EmployeeRouter.get("/list", listController);
EmployeeRouter.get("/search", searchController);
EmployeeRouter.post(
  "/add",

  addEmployeeController
);
EmployeeRouter.put(
  "/change",

  updateEmployeeController
);
EmployeeRouter.delete(
  "/remove",

  deleteEmployeeController
);
