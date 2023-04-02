import doctorRepo from "../repositories/doctorRepo.js";

async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) throw new Error("send Token");

  try {
    const {
      rows: [session],
    } = await doctorRepo.findByToken({ token });
    if (!session) throw new Error("token not found");

    const {
      rows: [user],
    } = await doctorRepo.findSession({ id: session.doctor_id });
    if (!user) throw new Error("invalid Token");

    res.locals.patient = user;
    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export default authValidation;
