// Buyer service

import pool from "../../config/database";
import { CreateBuyerInput } from "./buyer.types";

export const createBuyer = async (data: CreateBuyerInput) => {
  const result = await pool.query(
    `
    insert into buyers( name, company_name, email) values ($1,$2,$3) returning *
    `,
    [data.name, data.company_name, data.email],
  );

  return result.rows[0];
};

// get api
export const getAllBuyers = async () => {
  const result = await pool.query(
    ` select  * from buyers order by id asc
      `,
  );

  return result.rows;
};

// get single buyer by id
export const getBuyerById = async (id: number) => {
  const result = await pool.query(` select * from buyers where id = $1`, [id]);
  return result.rows[0];
};

// put

export const updateBuyer = async (id: number, data: CreateBuyerInput) => {
  const result = await pool.query(
    `
        UPDATE buyers
        SET
            name = $1,
            company_name = $2,
            email = $3
        WHERE id = $4
        RETURNING *
        `,
    [data.name, data.company_name, data.email, id],
  );

  return result.rows[0] || null;
};
