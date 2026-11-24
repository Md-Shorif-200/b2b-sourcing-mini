// Buyer controller

import { Request, Response } from "express";
import { createBuyer, getAllBuyers, getBuyerById, updateBuyer } from "./buyer.service";

export const createBuyerController = async (req: Request, res: Response) => {
  try {
    const { name, company_name, email } = req.body;

    const buyer = await createBuyer({
      name: name.trim(),
      company_name: company_name.trim(),
      email: email.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Buyer created successfully",
      data: buyer,
    });
  } catch (err) {
    console.error("Create buyer error:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllBuyersController = async (req: Request, res: Response) => {
  try {
    const buyers = await getAllBuyers();

    res.status(200).json({
      success: true,
      data: buyers,
    });
  } catch (error) {
    console.error("Get buyers error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getBuyerByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid buyer ID",
      });
    }

    const buyer = await getBuyerById(id);

    // Check if buyer exists
    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: "Buyer not found",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      data: buyer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateBuyerController = async (req: Request, res: Response) => {
  try {
    // Get ID from URL
    const id = Number(req.params.id);

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid buyer ID",
      });
    }

    // Get data from request body
    const { name, company_name, email } = req.body;

    // Validate input
    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof company_name !== "string" ||
      company_name.trim() === "" ||
      typeof email !== "string" ||
      email.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid buyer data",
      });
    }

    // Update buyer
    const buyer = await updateBuyer(id, {
      name: name.trim(),
      company_name: company_name.trim(),
      email: email.trim(),
    });

    // Check if buyer exists
    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: "Buyer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Buyer updated successfully",
      data: buyer,
    });
  } catch (error) {
    console.error("Update buyer error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
