import express from 'express';
import { addPrescription, getPrescriptions } from '../controller/prescriptionController.js';
import { isAuthenticatedUser, isPatientAuthenticated } from '../middlewares/auth.js'; 
const router = express.Router();

router.route('/prescription/new').post(isPatientAuthenticated, addPrescription);
router.route('/prescriptions').get(isPatientAuthenticated, getPrescriptions);

export default router;

