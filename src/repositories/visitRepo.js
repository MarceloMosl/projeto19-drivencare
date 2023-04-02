import { db } from "../config/database.js";

async function create({ time, date, doctorId, patientId }) {
  return await db.query(
    `
        INSERT INTO visits (time, date, doctor_id, patient_id)
        VALUES ($1, $2, $3, $4)
        `,
    [time, date, doctorId, patientId]
  );
}

async function checkDate({ time, date, doctorId }) {
  return await db.query(
    `
        SELECT * FROM visits 
        WHERE date = $1 AND doctor_id = $2 AND time = $3
    `,
    [date, doctorId, time]
  );
}

async function findPatient({ patient_id }) {
  console.log(patient_id);
  return await db.query(
    `
    SELECT * FROM visits WHERE patient_id = $1
  `,
    [patient_id]
  );
}

async function findDoctor({ id }) {
  return await db.query(
    `
    SELECT * FROM visits WHERE doctor_id = $1
  `,
    [id]
  );
}

async function findVisits({ patient_id }) {
  return await db.query(
    `
    SELECT c.date, c.time, d.name as doctor_name, d.specialty as doctor_specialty, c.status
  FROM visits c
  JOIN doctors d ON c.doctor_id = d.id
  WHERE c.patient_id = $1;

  `,
    [patient_id]
  );
}

async function findVisitsAsDoc({ doctor_id }) {
  return await db.query(
    `SELECT d.specialty as doctor_specialty, c.date, c.time, p.name as patient_name
        FROM doctors d
        JOIN visits c ON c.doctor_id = d.id
        JOIN patients p ON c.patient_id = p.id
      WHERE d.id = $1;`,
    [doctor_id]
  );
}

export default {
  create,
  checkDate,
  findPatient,
  findDoctor,
  findVisits,
  findVisitsAsDoc,
};
