import visitService from "../services/visitService.js";

export async function create(req, res) {
  const { time, date, doctorId } = req.body;
  const { patient_id } = res.locals.patient;
  try {
    await visitService.create({ time, date, doctorId, patientId: patient_id });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function findVisits(req, res) {
  const { patient_id } = res.locals.patient;

  try {
    const { rows } = await visitService.findVisits({ patient_id });
    return res.send(rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function findVisitsAsDoc(req, res) {
  const { doctor_id } = res.locals.doc;

  try {
    const { rows } = await visitService.findVisitsAsDoc({ doctor_id });
    return res.send(rows);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default {
  create,
  findVisits,
  findVisitsAsDoc,
};
