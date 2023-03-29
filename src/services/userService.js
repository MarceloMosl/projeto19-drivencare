import bcrypt from "bcrypt";
import userRepo from "../repositories/userRepo.js";

async function create({ username, email, password }) {
  const { rowsCount } = await userRepo.findByEmail(email);
  if (rowsCount) return "Vai da não, to mó cansado";

  const hashPassword = await bcrypt.hash(password, 10);

  await userRepo.create({ username, email, password: hashPassword });
}

export default {
  create,
};
