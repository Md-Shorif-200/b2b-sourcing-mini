// Supplier service
import pool from "../../config/database.js";
import { CreateSupplierInput } from "./supplier.types.js";

export const createSupplier = async (data: CreateSupplierInput) => {
  const result = await pool.query(
    `
        INSERT INTO suppliers (
            name,
            company_name,
            email
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
    [data.name, data.company_name, data.email],
  );

  return result.rows[0];
};

export const getAllSuppliers = async () => {
  const result = await pool.query(
    `
        SELECT *
        FROM suppliers
        ORDER BY id ASC
        `,
  );

  return result.rows;
};

export const getSupplierById = async (id: number) => {
  const result = await pool.query(
    `
        SELECT *
        FROM suppliers
        WHERE id = $1
        `,
    [id],
  );

  return result.rows[0];
};

export const updateSupplier = async (id, data) => {
  const result = await pool.query(
    `
          update suppliers 
          set
          name = $1,
          company_name = $2,
          email = $3
             where id = $4 
              returning * 
          `,
    [data.name, data.company_name, data.email, id],
  );

   return result.rows[0]
};
