import { db } from "../config/database";

async function create({ patient, date, doctor }) {
  try {
    await db.query(
      `
        INSERT INTO visits (patient, date, doctor)
        VALUES ($1,$2,$3)
        `,
      [patient, date, doctor]
    );
  } catch (error) {
    return res.send(error);
  }
}

async function checkDate({ date, doctor }) {
  try {
    return await db.query(
      `
        SELECT * FROM visits 
        WHERE date = $1 AND doctor = $2
    `,
      [date, doctor]
    );
  } catch (error) {
    return res.send(error);
  }
}

export default {
  create,
  checkDate,
};
