import visitRepo from "../repositories/visitRepo";

async function create({ patient, date, doctor }) {
  const { rowCount } = visitRepo.checkDate({ date, doctor });
  if (rowCount) throw new Error("Data indisponivel");

  try {
    return await visitRepo.create({ patient, date, doctor });
  } catch (error) {
    return res.send(error);
  }
}

export default {
  create,
};
