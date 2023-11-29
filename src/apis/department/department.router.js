import express from "express";

import {
  addDepartmentController,
  deleteDepartmentController,
  listController,
  searchController,
  updateDepartmentController,
} from "./department/department.controller.js";

export const DepartmentRouter = express.Router();
DepartmentRouter.get("/list", listController);
DepartmentRouter.get("/search", searchController);
DepartmentRouter.post("/add", addDepartmentController);
DepartmentRouter.put("/update", updateDepartmentController);
DepartmentRouter.delete("/remove", deleteDepartmentController);

// { "fullName":"Vikas", "userId":"VikasT581", "password":"VikasT581", "role":"manager" }
