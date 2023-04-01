import dayjs from "dayjs";
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

export default {
  create,
};
