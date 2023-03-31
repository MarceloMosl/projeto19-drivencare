import userService from "../services/userService.js";

export async function create(req, res) {
  const { username, email, password, type } = req.body;

  try {
    await userService.create({ username, email, password, type });

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

export default { create, sessionsCreate };
