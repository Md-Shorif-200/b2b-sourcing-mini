import express from "express";
import buyerRoutes from "./modules/buyer/buyer.routes.js";
import supplierRoutes from "./modules/supplier/supplier.routes.js";
import rfqRoutes from './modules/rfq/rfq.routes.js';

const app = express();

app.use(express.json());
app.use("/api/buyers", buyerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use('/api/rfqs', rfqRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "B2B Sourcing API is running",
  });
});

export default app;
