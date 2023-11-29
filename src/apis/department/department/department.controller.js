import { SERVER_ERROR } from "../../../utilities/constants/http-constants.js";

import {
  isJWTExpired,
  verifyJWT,
} from "../../../utilities/tokenGenerators/jwt.js";
import { secretKey } from "../../../utilities/constants/keys.js";

import {
  getRecords,
  createSingleRecord,
  getRecordDetails,
  updateRecord,
  deleteRecord,
} from "../../../utilities/db/dbwrapper.js";
import { Department } from "../../../utilities/schemas/departments.js";
import { paginate } from "../../../utilities/otherMiddlewares/paginatedQuery.js";

export const listController = async (req, res) => {
  const authToken = req.headers.authorization;

  const { page, pageSize } = req.query;

  try {
    const user = await verifyJWT(authToken, secretKey);

    if (user.userId && !isJWTExpired(authToken)) {
      const departments = await getRecords(Department);

      const paginatedDepartments = paginate(departments, page, pageSize);
      return res.status(200).json({
        paginatedDepartments,
        message: "list of all departments",
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(departments.length / pageSize),
        totalItems: departments.length,
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Server Error" });
  }
};
export const searchController = async (req, res) => {
  const authToken = req.headers.authorization;
  const { name } = req.body;

  try {
    const user = await verifyJWT(authToken, secretKey);

    if (user?.userId && !isJWTExpired(authToken)) {
      const department = await getRecordDetails(Department, { name });

      return res.status(200).json({
        department,
        message: "department found",
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Server Error" });
  }
};
export const addDepartmentController = async (req, res) => {
  const { name, description, departmentId } = req.body;
  const authToken = req.headers.authorization;

  try {
    const user = await verifyJWT(authToken, secretKey);

    if (user?.userId && !isJWTExpired(authToken)) {
      const department = await createSingleRecord(Department, {
        name,
        description,
        departmentId,
      });
      return res.status(200).json({
        department,
        message: "department created",
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Error signing in user" });
  }
};
export const updateDepartmentController = async (req, res) => {
  const { name, description, departmentId } = req.body;
  const authToken = req.headers.authorization;

  try {
    const user = await verifyJWT(authToken, secretKey, res);

    if (user?.userId && !isJWTExpired(authToken)) {
      const department = await updateRecord(
        Department,
        { departmentId },
        { name, description }
      );
      return res.status(200).json({
        department,
        message: "department updated",
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Server Error" });
  }
};
export const deleteDepartmentController = async (req, res) => {
  const { departmentId } = req.body;
  const authToken = req.headers.authorization;

  try {
    const user = await verifyJWT(authToken, secretKey);
    console.log("fghj");

    if (user?.hasData && !isJWTExpired(authToken)) {
      const department = await deleteRecord(Department, { departmentId });
      return res.status(200).json({
        department,
        message: "department deleted",
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Server Error" });
  }
};
