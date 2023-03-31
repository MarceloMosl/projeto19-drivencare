import bcrypt from "bcrypt";
import userRepo from "../repositories/userRepo.js";
import { v4 as uuidV4 } from "uuid";

async function create({ username, email, password, type }) {
  const { rowCount } = await userRepo.findByEmail(email);
  if (rowCount) throw new Error("invalid email");

  const hashPassword = await bcrypt.hash(password, 10);

  await userRepo.create({ username, email, password: hashPassword, type });
}

async function sessionsCreate({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await userRepo.findByEmail(email);
  if (!rowCount) throw new Error("invalid email or password ");

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) throw new Error("invalid email or password");

  const token = uuidV4();

  await userRepo.sessionsCreate({
    userId: user.id,
    token,
  });

  return token;
}

export default {
  create,
  sessionsCreate,
};
