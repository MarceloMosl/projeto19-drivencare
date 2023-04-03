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

async function findByToken({ token }) {
  return await db.query(
    `
        SELECT * FROM doctors_sessions WHERE token = $1
    `,
    [token]
  );
}

async function findSession({ id }) {
  return await db.query(
    `
        SELECT * FROM doctors_sessions WHERE doctor_id = $1
    `,
    [id]
  );
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

async function updateToken({ token, docId }) {
  return await db.query(
    `
        UPDATE doctors_sessions SET token = $1 WHERE doctor_id = $2
    `,
    [token, docId]
  );
}

async function changeStatus({ visitId, status }) {
  return await db.query(
    `
    UPDATE visits SET status = $1 WHERE id = $2
  `,
    [status, visitId]
  );
}

async function historyVisits({ doctor_id }) {
  return db.query(
    `
    SELECT d.specialty as doctor_specialty, c.date, c.time, p.name as patient_name, c.status
    FROM doctors d
    JOIN visits c ON c.doctor_id = d.id
    JOIN patients p ON c.patient_id = p.id
    WHERE d.id = $1 AND c.status = 'concluida';
  `,
    [doctor_id]
  );
}

export default {
  create,
  findByEmail,
  findById,
  sessionsCreate,
  findByToken,
  findSession,
  updateToken,
  changeStatus,
  historyVisits,
};
