import pool from "../../config/database.js";
import { CreateRfqInput } from "./rfq.types.js";

export const createRfq = async (data: CreateRfqInput) => {
  const result = await pool.query(
    `
        INSERT INTO rfqs (
            buyer_id,
            product_name,
            quantity
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
    [data.buyer_id, data.product_name, data.quantity],
  );

  return result.rows[0];
};

export const getAllRfqs = async (page, limit) => {
  const offset = (page - 1) * limit;
  const dataResult = await pool.query(
    `
        SELECT *
        FROM rfqs
        ORDER BY id ASC
        limit  $1 offset  $2
        `,
    [limit, offset],
  );

  const countResult = await pool.query(
    `
    
     select count(*) as total from rfqs ;
     
     `,
  );

  return {
     data : dataResult.rows,
     total : Number(countResult.rows[0].total)
  }
};
