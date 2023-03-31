import userRepositories from "../repositories/userRepo.js";

async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) throw new Error("send Token");

  try {
    const {
      rows: [session],
    } = await userRepositories.findByToken(token);
    if (!session) throw new Error("token not found");

    const {
      rows: [user],
    } = await userRepositories.findById(session.userId);
    if (!user) throw new Error("invalid Token");
    res.locals.user = user;
    next();
  } catch (err) {
    return res.send(err);
  }
}

export default authValidation;
