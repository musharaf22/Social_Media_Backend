import jwt from "jsonwebtoken";

const tokentGenerate = (id: string) => {
  return jwt.sign({ id: id }, process.env.SECRET_KEY as string, {
    expiresIn: "1d",
  });
};

export default tokentGenerate;
