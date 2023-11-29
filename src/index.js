import express from "express";
import cors from "cors";

import bodyParser from "body-parser";
import { dbInit } from "./utilities/db/index.js";
import { AuthRouter } from "./apis/auth/auth.router.js";

import { initalServicesInit } from "./utilities/initialservices/initialServices.js";
import { DepartmentRouter } from "./apis/department/department.router.js";
import { EmployeeRouter } from "./apis/employee/employee.router.js";

dbInit();
const app = express();
initalServicesInit();
const port = 5000;

// MongoDB connection

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/department", DepartmentRouter);
app.use("/employee", EmployeeRouter);
// Sign-up route

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
