export async function create(req, res) {
  try {
    return await userService.create();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
