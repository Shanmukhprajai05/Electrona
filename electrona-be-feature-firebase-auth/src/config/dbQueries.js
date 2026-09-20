import pool from "./db.js";

export async function createUser(firebase_uid, email) {
  const query = `
    INSERT INTO users(firebase_uid, email)
    VALUES($1,$2)
    RETURNING *;
  `;

  const values = [firebase_uid, email];

  const result = await pool.query(query, values);

  return result.rows[0];
}