// RFQ controller
import { Request, Response } from "express";
import { createRfq, getAllRfqs } from "./rfq.service";

export const createRfqController = async (req: Request, res: Response) => {
  try {
    const rfq = await createRfq(req.body);

    res.status(201).json({
      success: true,
      message: "RFQ created successfully",
      data: rfq,
    });
  } catch (error) {
    console.error("Create RFQ error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllRfqsController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const rfqs = await getAllRfqs(page, limit);

    const totalRfqs = rfqs.total;
    const totalPages = Math.ceil(totalRfqs / limit);

    res.status(200).json({
      success: true,
      message: "RFQs retrieved successfully",
      data: rfqs,
      pagination: {
        page,
        limit,
        totalRfqs,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Get RFQs error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
