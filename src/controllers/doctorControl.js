import doctorService from "../services/doctorService.js";

export async function create(req, res) {
  const { name, email, password, specialty } = req.body;

  try {
    await doctorService.create({ name, email, password, specialty });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function sessionsCreate(req, res) {
  const { email, password } = req.body;

  try {
    const token = await doctorService.sessionsCreate({ email, password });

    return res.send({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export default { create, sessionsCreate };