import express from "express";
import { postAppointment } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/post", isPatientAuthenticated, upload.single('prescription'), postAppointment);

export default router;
