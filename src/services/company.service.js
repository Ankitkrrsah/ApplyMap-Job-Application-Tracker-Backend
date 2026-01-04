import pool from "../config/db.js";

export const createCompany = async ({ name, website }) => {
  const existing = await pool.query(
    "SELECT id FROM companies WHERE name = $1",
    [name]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0];
  }

  const result = await pool.query(
    `
    INSERT INTO companies (name, website)
    VALUES ($1, $2)
    RETURNING *
    `,
    [name, website]
  );

  return result.rows[0];
};

export const getCompanies = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM companies
    ORDER BY name ASC
    `
  );

  return result.rows;
};
