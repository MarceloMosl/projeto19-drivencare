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

export default {
  create,
  checkDate,
  findPatient,
  findDoctor,
};
