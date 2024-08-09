import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

// Function for adding a new prescription
export const addPrescription = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    tests,
    doctor,
    date,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !tests ||
    !doctor ||
    !date
  ) {
    return next(new ErrorHandler("Please Provide Full Details!", 400));
  }

  try {
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Patient already registered with this email", 400));
    }

    const newPrescription = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      tests,
      doctor,
      date,
      role: "Patient",
    });

    res.status(200).json({
      success: true,
      message: "Prescription Added Successfully!",
      prescription: newPrescription,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
export const getPrescriptions = catchAsyncErrors(async (req, res, next) => {
  const prescriptions = await User.find({ role: "Patient" });

  res.status(200).json({
    success: true,
    prescriptions,
  });
});
