import express from "express";
import buyerRoutes from "./modules/buyer/buyer.routes.js";
const app = express();

app.use(express.json());
app.use("/api/buyers", buyerRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "B2B Sourcing API is running",
  });
});

export default app;
