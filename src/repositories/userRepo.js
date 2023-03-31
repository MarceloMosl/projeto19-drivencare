import { db } from "../config/database.js";

async function create({ username, email, password, type }) {
  return await db.query(
    `
    INSERT INTO users (username, email, password, user_type)
    VALUES ($1,$2,$3, $4)`,
    [username, email, password, type]
  );
}

async function findByEmail(email) {
  return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function findById(id) {
  return await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
}

async function sessionsCreate({ userId, token }) {
  return await db.query(
    `
    INSERT INTO sessions (user_id, token)
    VALUES ($1,$2)`,
    [userId, token]
  );
}

async function findByToken(token) {
  return await connectionDb.query(
    `
        SELECT * FROM sessions WHERE token = $1
    `,
    [token]
  );
}

export default { create, findByEmail, sessionsCreate, findById, findByToken };
