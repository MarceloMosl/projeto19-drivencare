import bcrypt from "bcrypt";
import userRepo from "../repositories/userRepo.js";
import { v4 as uuidV4 } from "uuid";

async function create({ name, email, password }) {
  const { rowCount } = await userRepo.findByEmail(email);
  if (rowCount) throw new Error("invalid email");

  const hashPassword = await bcrypt.hash(password, 10);

  return await userRepo.create({
    name,
    email,
    password: hashPassword,
  });
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

  const {
    rows: [userToken],
  } = await userRepo.findSession({ id: user.id });

  if (userToken) {
    await userRepo.updateToken({ token, userId: userToken.patient_id });
    return token;
  }

  await userRepo.createSession({
    patientId: user.id,
    token,
  });

  return token;
}

async function getDocs({ name, specialty }) {
  if (!name && specialty) {
    return await userRepo.getDocBySpec({ specialty });
  } else if (name && !specialty) {
    return await userRepo.getDocByName({ name });
  } else if (name && specialty) {
    return await userRepo.getDocByNameNSpec({ name, specialty });
  } else {
    throw new Error("Preencha os campos nome ou especialidade");
  }
}

async function historyVisits({ patient_id }) {
  return await userRepo.historyVisits({ patient_id });
}

export default {
  create,
  sessionsCreate,
  getDocs,
  historyVisits,
};
