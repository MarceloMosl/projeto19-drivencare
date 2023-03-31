async function create(req, res) {
  const { userId: patient, date, doctor } = req.body;

  try {
    await visitService.create({ patient, date, doctor });

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error);
  }
}

export default {
  create,
};
