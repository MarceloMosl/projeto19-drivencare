import { db } from "../config/database.js";

async function create({ name, email, password }) {
  return await db.query(
    `
    INSERT INTO patients (name, email, password)
    VALUES ($1,$2,$3)`,
    [name, email, password]
  );
}

async function findByEmail(email) {
  return await db.query(`SELECT * FROM patients WHERE email = $1`, [email]);
}

async function findById(id) {
  return await db.query(`SELECT * FROM patients WHERE id = $1`, [id]);
}

async function createSession({ token, patientId }) {
  return await db.query(
    `
    INSERT INTO patients_sessions (token, patient_id)
    VALUES ($1,$2)`,
    [token, patientId]
  );
}

async function findByToken({ token }) {
  return await db.query(
    `
        SELECT * FROM patients_sessions WHERE token = $1
    `,
    [token]
  );
}

async function findSession({ id }) {
  return await db.query(
    `
        SELECT * FROM patients_sessions WHERE patient_id = $1
    `,
    [id]
  );
}

async function updateToken({ token, userId }) {
  return await db.query(
    `
        UPDATE patients_sessions SET token = $1 WHERE patient_id = $2
    `,
    [token, userId]
  );
}

export default {
  create,
  findByEmail,
  createSession,
  findById,
  findByToken,
  updateToken,
  findSession,
};
