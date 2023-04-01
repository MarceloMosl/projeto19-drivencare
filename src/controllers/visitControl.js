import visitService from "../services/visitService.js";

export async function create(req, res) {
  const { time, date, doctorId, patientId } = req.body;
  try {
    await visitService.create({ time, date, doctorId, patientId });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function findPatient(req, res) {
  const { patient_id } = res.locals.patient;
  console.log(patient_id);
  try {
    const { rows } = await visitService.findPatient({ patient_id });

    return res.send(rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function findDoctor(req, res) {
  const { doctor_id } = res.locals.doctor;
  try {
    return await visitService.findDoctor({ doctor_id });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export default {
  create,
  findPatient,
  findDoctor,
};
