import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    tests,
    date,
    appointment_date,
    type_of_tests,
    doctorName_firstName,
    doctorName_lastName,
    homeCollection,
    address
  } = req.body;

  const prescription = req.file; // Access the uploaded file

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !tests ||
    !date ||
    !appointment_date ||
    !type_of_tests ||
    !doctorName_firstName ||
    !doctorName_lastName ||
    !homeCollection ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isConflict = await User.find({
    role: "Specialist",
    tests: type_of_tests,
  });
  if (!isConflict || isConflict.length === 0) {
    return next(new ErrorHandler("Doctor Not Found!", 404));
  }

  const collectorId = isConflict[0]._id;
  const patientId = req.user_id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    tests,
    date,
    prescription: prescription ? prescription.buffer : null, // Save the file buffer or handle it as needed
    appointment_date,
    type_of_tests,
    doctorName: {
      firstName: doctorName_firstName,
      lastName: doctorName_lastName,
    },
    homeCollection,
    address,
    collectorId,
    patientId
  });

  res.status(200).json({
    success: true,
    message: "Appointment Sent Successfully!",
  });
});

  