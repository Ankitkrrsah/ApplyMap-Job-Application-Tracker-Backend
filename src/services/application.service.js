import pool from "../config/db.js";

export const createApplication = async (userId, data) => {
  const { company_id, role, status, applied_date } = data;
  const result = await pool.query(
    `
    INSERT INTO applications (user_id, company_id, role, status, applied_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING user_id, company_id, role, status, applied_date 
    `,
    [userId, company_id, role, status, applied_date]
  );
  console.log('Done')
  return result.rows[0];
};

export const getApplicationsByUser = async (userId) => {
  const result = await pool.query(
    `
    SELECT a.*, c.name AS company_name
    FROM applications a
    JOIN companies c ON a.company_id = c.id
    WHERE a.user_id = $1
    ORDER BY a.created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

export const getApplicationById = async (userId, appId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE id = $1 AND user_id = $2
    `,
    [appId, userId]
  );

  return result.rows[0];
};

export const updateApplication = async (userId, appId, data) => {
  const { role, status, applied_date } = data;

  const result = await pool.query(
    `
    UPDATE applications
    SET role = $1, status = $2, applied_date = $3
    WHERE id = $4 AND user_id = $5
    RETURNING *
    `,
    [role, status, applied_date, appId, userId]
  );

  return result.rows[0];
};

export const deleteApplication = async (userId, appId) => {
  await pool.query(
    `
    DELETE FROM applications
    WHERE id = $1 AND user_id = $2
    `,
    [appId, userId]
  );
};
    