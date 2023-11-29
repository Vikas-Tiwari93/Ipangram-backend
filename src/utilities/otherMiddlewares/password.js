import bcrypt from "bcrypt";
export const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
export const isPasswordVerified = async (password, dbPassword) => {
  const passwordMatch = await bcrypt.compare(password, dbPassword);
  return passwordMatch;
};
