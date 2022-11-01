import bcrypt from "bcryptjs";
export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (bodyPassword: string, dbPassword: string) => {
  return bcrypt.compare(bodyPassword, dbPassword);
};
