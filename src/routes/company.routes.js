import { Router } from "express";
import {
  createCompany,
  getCompanies,
} from "../controllers/company.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", createCompany);
router.get("/", getCompanies);

export default router;
