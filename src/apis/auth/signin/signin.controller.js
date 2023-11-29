import {
  SERVER_ERROR,
  SUCCESS,
} from "../../../utilities/constants/http-constants.js";

import {
  generateJwtTokens,
  updatingJwtTokensInDb,
} from "../../../utilities/tokenGenerators/jwt.js";
import { secretKey } from "../../../utilities/constants/keys.js";
import { isPasswordVerified } from "../../../utilities/otherMiddlewares/password.js";

export const SigninController = async (req, res) => {
  const { userId, password, role } = req.body;

  try {
    console.log("fghjkvbnm");
    const { authToken, refreshToken } = generateJwtTokens(
      { userId, role },
      secretKey
    );

    const user = await updatingJwtTokensInDb(authToken, { userId, role });

    if (
      user?.hasData &&
      (await isPasswordVerified(password, user?.resultSet?.password))
    ) {
      return res.status(200).json({
        authToken,
        refreshToken,
        message: "SignIn Complete",
      });
    }
    return res.status(404).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Error signing in user" });
  }
};
