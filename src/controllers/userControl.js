import userService from "../services/userService.js";

export async function create(req, res) {
  const { name, email, password } = req.body;

  try {
    await userService.create({ name, email, password });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function sessionsCreate(req, res) {
  const { email, password } = req.body;

  try {
    const token = await userService.sessionsCreate({ email, password });

    return res.send({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getDocs(req, res) {
  const { name, specialty } = req.body;

  try {
    const { rows } = await userService.getDocs({ name, specialty });
    return res.send(rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export default { create, sessionsCreate, getDocs };
