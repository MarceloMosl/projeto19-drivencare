import { db } from "../config/database.js";

async function create({ username, email, password }) {
  return await db.query(
    `
    INSERT INTO users (username, email, password)
    VALUES ($1,$2,$3)`,
    [username, email, password]
  );
}

async function findByEmail(email) {
  return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export default (create, findByEmail);
