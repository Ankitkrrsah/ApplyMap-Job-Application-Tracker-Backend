import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { signToken } from "../utils/jwt.js";

export const registerUser = async ({ email, password }) => {
  const existing = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (existing.rows.length > 0) {
    const err = new Error("User already exists");
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     RETURNING id, email`,
    [email, hashedPassword]
  );

  const user = result.rows[0];
  console.log(user) ;
  const token = signToken({ userId: user.id });

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const result = await pool.query(
    "SELECT id, email, password_hash FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const token = signToken({ userId: user.id });

  return { user:{
    id : user.id , 
    email:user.email ,   // since hashedPassword was also there in user so explicitly send only required details 
  }, token };
};