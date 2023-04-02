import dayjs from "dayjs";
import visitRepo from "../repositories/visitRepo.js";

async function create({ time, date, doctorId, patientId }) {
  const { rowCount } = await visitRepo.checkDate({
    time,
    date: dayjs(date).format("DD/MM/YYYY"),
    doctorId,
  });
  if (rowCount) throw new Error("Data indisponivel");

  return await visitRepo.create({
    time,
    date: dayjs(date).format("DD/MM/YYYY"),
    doctorId,
    patientId,
  });
}

async function findPatient({ patient_id }) {
  return await visitRepo.findPatient({ patient_id });
}

async function findDoctor({ id }) {
  return await visitRepo.findDoctor({ id });
}

async function findVisits({ patient_id }) {
  return await visitRepo.findVisits({ patient_id });
}

export default {
  create,
  findPatient,
  findDoctor,
  findVisits,
};
