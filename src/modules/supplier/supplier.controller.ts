// Supplier controller
import { Request, Response } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from "./supplier.service.js";

export const createSupplierController = async (req: Request, res: Response) => {
  try {
    const supplier = await createSupplier(req.body);

    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    console.error("Create supplier error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllSuppliersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const suppliers = await getAllSuppliers();

    res.status(200).json({
      success: true,
      message: "Suppliers retrieved successfully",
      data: suppliers,
    });
  } catch (error) {
    console.error("Get suppliers error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSupplierByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const supplier = await getSupplierById(id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier retrieved successfully",
      data: supplier,
    });
  } catch (error) {
    console.error("Get supplier error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateSupplierController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const supplier = await updateSupplier(id, req.body);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier updated successfully",
      data: supplier,
    });
  } catch (error) {
    console.error("Update supplier error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
