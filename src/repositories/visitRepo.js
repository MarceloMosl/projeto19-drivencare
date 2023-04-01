import dayjs from "dayjs";
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

export default {
  create,
  checkDate,
};
