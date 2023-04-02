import visitRepo from "../repositories/visitRepo.js";

export async function statusAlterMiddleware(req, res, next) {
  const { visitId } = req.body;
  const { doctor_id } = res.locals.doc;

  const {
    rows: [visit],
  } = await visitRepo.findVisitById({ id: visitId });
  if (!visit) return res.status(400).send("this visit doesnt exists");

  if (visit.doctor_id !== doctor_id) return res.sendStatus(409);

  next();
}
