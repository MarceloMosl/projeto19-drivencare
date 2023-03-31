import { db } from "../config/database.js";

async function create({ name, email, password, specialty }) {
  return await db.query(
    `
      INSERT INTO doctors (name, email, password, specialty)
      VALUES ($1,$2,$3, $4)`,
    [name, email, password, specialty]
  );
}
async function findByEmail(email) {
  return await db.query(`SELECT * FROM doctors WHERE email = $1`, [email]);
}

async function findById(id) {
  return await db.query(`SELECT * FROM doctors WHERE id = $1`, [id]);
}

async function sessionsCreate({ token, doctorId }) {
  return await db.query(
    `
      INSERT INTO doctors_sessions (token, doctor_id)
      VALUES ($1,$2)`,
    [token, doctorId]
  );
}

export default {
  create,
  findByEmail,
  findById,
  sessionsCreate,
};
