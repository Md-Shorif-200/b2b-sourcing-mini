import { Router } from "express";

import {
  createSupplierController,
  getAllSuppliersController,
  getSupplierByIdController,
  updateSupplierController,
} from "./supplier.controller.js";

import {
  validateId,
  validateRequiredStrings,
} from "../../middlewares/validate.js";

const router = Router();

router.get("/", getAllSuppliersController);
router.get("/:id", validateId, getSupplierByIdController);

router.post(
  "/",
  validateRequiredStrings(["name", "company_name", "email"]),
  createSupplierController,
);
router.put(
  "/:id",
  validateId,
  validateRequiredStrings(["name", "company_name", "email"]),
  updateSupplierController,
);

export default router;
