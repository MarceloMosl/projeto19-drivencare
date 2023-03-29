import userService from "../services/userService.js";

export async function create(req, res) {
  const { username, email, password } = req.body;

  try {
    await userService.create({ username, email, password });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export default { create };
