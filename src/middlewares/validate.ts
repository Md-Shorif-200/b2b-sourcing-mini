import { RequestHandler } from "express";

// ============================================
// Validate URL ID
// ============================================

export const validateId: RequestHandler = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }

  next();
};

// ============================================
// Validate Required String Fields
// ============================================

export const validateRequiredStrings = (fields: string[]): RequestHandler => {
  return (req, res, next) => {
    for (const field of fields) {
      const value = req.body?.[field];

      if (typeof value !== "string" || value.trim() === "") {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }

      // Remove unnecessary spaces
      req.body[field] = value.trim();
    }

    next();
  };
};

export const validatePositiveIntegers = (fields: string[]): RequestHandler => {
  return (req, res, next) => {
    for (const field of fields) {
      const value = req.body?.[field];

      if (!Number.isInteger(value) || value <= 0) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a positive integer`,
        });
      }
    }

    next();
  };
};


export const validatePagination: RequestHandler = (
    req,
    res,
    next
) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    if (
        req.query.page !== undefined &&
        (!Number.isInteger(page) || page <= 0)
    ) {
        return res.status(400).json({
            success: false,
            message: 'page must be a positive integer'
        });
    }

    if (
        req.query.limit !== undefined &&
        (!Number.isInteger(limit) || limit <= 0)
    ) {
        return res.status(400).json({
            success: false,
            message: 'limit must be a positive integer'
        });
    }

    next();
};


export const validateRfqStatus: RequestHandler = (
    req,
    res,
    next
) => {
    const allowedStatuses = [
        'pending',
        'approved',
        'closed',
        'cancelled'
    ];

    const status = req.query.status;

    if (
        status !== undefined &&
        (
            typeof status !== 'string' ||
            !allowedStatuses.includes(status)
        )
    ) {
        return res.status(400).json({
            success: false,
            message: 'Invalid RFQ status'
        });
    }

    next();
};
