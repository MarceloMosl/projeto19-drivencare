import bcrypt from "bcrypt";
import userRepo from "../repositories/userRepo.js";

async function create({ username, email, password }) {
  const { rowCount } = await userRepo.findByEmail(email);
  if (rowCount) throw new Error("email invalido");

  const hashPassword = await bcrypt.hash(password, 10);

  await userRepo.create({ username, email, password: hashPassword });
}

export default {
  create,
};
