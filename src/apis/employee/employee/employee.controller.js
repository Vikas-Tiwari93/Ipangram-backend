import {
  SERVER_ERROR,
  SUCCESS,
} from "../../../utilities/constants/http-constants.js";

import {
  generateJwtTokens,
  isJWTExpired,
  updatingJwtTokensInDb,
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

import { User } from "../../../utilities/schemas/users.js";
import { paginate } from "../../../utilities/otherMiddlewares/paginatedQuery.js";
import { encryptPassword } from "../../../utilities/otherMiddlewares/password.js";

export const listController = async (req, res) => {
  const authToken = req.headers.authorization;
  const { page, pageSize } = req.query;

  try {
    const user = await verifyJWT(authToken, secretKey);

    if (user?.userId && !isJWTExpired(authToken)) {
      const employees = await getRecords(User, { role: "employee" });
      const paginatedEmployees = paginate(employees, page, pageSize);
      return res.status(200).json({
        paginatedEmployees,
        message: "list of all employees",
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(employees.length / pageSize),
        totalItems: employees.length,
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Error signing in user" });
  }
};
export const searchController = async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId } = req.body;

  try {
    const user = await verifyJWT(authToken, secretKey);

    if (user?.userId && !isJWTExpired(authToken)) {
      const employee = getRecordDetails(User, { userId, role: "employee" });
      return res.status(200).json({
        employee,
        message: "employee found",
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Error signing in user" });
  }
};
export const addEmployeeController = async (req, res) => {
  const { fullName, userId, password, role, isDisabled = false } = req.body;
  const authToken = req.headers.authorization;
  const hashedPassword = await encryptPassword(password);
  const payload = {
    fullName,
    userId,
    password: hashedPassword,
    role,
    isDisabled,
    authToken,
  };

  try {
    const user = await verifyJWT(authToken, secretKey);

    if (user?.userId && !isJWTExpired(authToken)) {
      const employee = await createSingleRecord(User, payload);
      return res.status(200).json({
        employee,
        message: "employee created",
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Error signing in user" });
  }
};
export const updateEmployeeController = async (req, res) => {
  const { fullName, userId, password, role, isDisabled = false } = req.body;
  const authToken = req.headers.authorization;

  try {
    const user = await verifyJWT(authToken, secretKey);

    if (user?.userId && !isJWTExpired(authToken)) {
      const employee = await updateRecord(
        User,
        { userId },
        { fullName, userId, password, role, isDisabled }
      );
      return res.status(200).json({
        employee,
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Server Error" });
  }
};
export const deleteEmployeeController = async (req, res) => {
  const { userId } = req.body;
  const authToken = req.headers.authorization;

  try {
    const user = await verifyJWT(authToken, secretKey);

    if (user?.userId && !isJWTExpired(authToken)) {
      const employee = await deleteRecord(User, { userId });
      return res.status(200).json({
        employee,
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Server Error" });
  }
};
