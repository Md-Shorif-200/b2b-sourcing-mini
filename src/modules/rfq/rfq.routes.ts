// RFQ routes
import { Router } from "express";

import { createRfqController, getAllRfqsController } from "./rfq.controller.js";

import {
  validateRequiredStrings,
  validatePositiveIntegers,
  validatePagination,
  validateRfqStatus,
} from "../../middlewares/validate.js";

const router = Router();

router.get(
    '/',
    validatePagination,
    validateRfqStatus,
    getAllRfqsController
);

router.post(
  "/",
  validatePositiveIntegers(["buyer_id", "quantity"]),
  validateRequiredStrings(["product_name"]),
  createRfqController,
);

export default router;
