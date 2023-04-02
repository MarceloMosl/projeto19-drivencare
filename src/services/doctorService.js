import bcrypt from "bcrypt";
import doctorRepo from "../repositories/doctorRepo.js";
import { v4 as uuidV4 } from "uuid";

async function create({ name, email, password, specialty }) {
  const { rowCount, rows } = await doctorRepo.findByEmail(email);
  console.log(rows);
  if (rowCount) throw new Error("invalid email");

  const hashPassword = await bcrypt.hash(password, 10);

  return await doctorRepo.create({
    name,
    email,
    password: hashPassword,
    specialty,
  });
}

async function sessionsCreate({ email, password }) {
  const {
    rowCount,
    rows: [doc],
  } = await doctorRepo.findByEmail(email);
  if (!rowCount) throw new Error("invalid email or password ");

  const validatePassword = await bcrypt.compare(password, doc.password);
  if (!validatePassword) throw new Error("invalid email or password");

  const token = uuidV4();

  const {
    rows: [docToken],
  } = await doctorRepo.findSession({ id: doc.id });

  if (docToken) {
    await doctorRepo.updateToken({ token, docId: docToken.doctor_id });
    return token;
  }

  await doctorRepo.sessionsCreate({
    doctorId: doc.id,
    token,
  });

  return token;
}

export default {
  create,
  sessionsCreate,
};
