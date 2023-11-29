import jwt from "jsonwebtoken";
import { updateRecord } from "../db/dbwrapper.js";
import { User } from "../schemas/users.js";

export const generateJwtTokens = (payloadObject, secretKey) => {
  const authToken = jwt.sign(payloadObject, secretKey, {
    expiresIn: "35m",
  });

  const refreshToken = jwt.sign(payloadObject, secretKey, {
    expiresIn: "7d",
  });

  return { authToken, refreshToken };
};
export const updatingJwtTokensInDb = async (authToken, query) => {
  const searchQuery = query;
  const payload = { authToken: authToken };

  return await updateRecord(User, searchQuery, payload);
};

export const verifyJWT = async (token, secretKey) => {
  let payload;
  token = token.split(" ")[1];
  const user = jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      console.log(err);
    }
    return decode;
  });

  try {
    payload = {
      userId: user?.userId,
      role: user?.role,
    };

    return payload;
  } catch (err) {
    return undefined;
  }
};
export const isJWTExpired = (token) => {
  token = token.split(" ")[1];
  try {
    const decoded = jwt.decode(token, { complete: true });

    if (decoded?.payload?.exp) {
      const expirationTime = new Date(decoded.payload.exp * 1000);
      const isExpired = expirationTime < new Date() ? true : false;

      return isExpired;
    }
    return false;
  } catch (error) {
    return false;
  }
};
