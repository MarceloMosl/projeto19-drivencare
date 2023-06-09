import dayjs from "dayjs";
import visitRepo from "../repositories/visitRepo.js";
import userRepo from "../repositories/userRepo.js";

async function create({ time, date, doctorId, patientId }) {
  const { rowCount } = await visitRepo.checkDate({
    time,
    date: dayjs(date).format("DD/MM/YYYY"),
    doctorId,
  });
  if (rowCount) throw new Error("Data indisponivel");

  const {
    rows: [doctor],
  } = await userRepo.getDocById({ doctorId });
  if (!doctor) throw new Error("Doctor doesnt exists");

  return await visitRepo.create({
    time,
    date: dayjs(date).format("DD/MM/YYYY"),
    doctorId,
    patientId,
  });
}

async function findVisits({ patient_id }) {
  return await visitRepo.findVisits({ patient_id });
}

async function findVisitsAsDoc({ doctor_id }) {
  return await visitRepo.findVisitsAsDoc({ doctor_id });
}

export default {
  create,
  findVisits,
  findVisitsAsDoc,
};
