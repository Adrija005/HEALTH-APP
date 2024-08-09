import mongoose from "mongoose";
import validator from "validator";
import { Mongoose } from "mongoose";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, 'First Name Must Contain At Least 3 Characters!'],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, 'Last Name Must Contain At Least 3 Characters!'],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please Provide A Valid Email Address'],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, 'Phone Number Must Contain Exactly 11 Digits!'],
    maxLength: [11, 'Phone Number Must Contain Exactly 11 Digits!'],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  tests: {
    type: String,
    required: function() { return this.role === "Patient"; }, // Make required only for patients
    minLength: [3, 'Test Name Must Contain At Least 3 Characters!'],
  },
  date: {
    type: Date,
    required: function() { return this.role === "Patient"; }, 
  },
  prescription: {
    public_id: String,
    url: String,
    
  },
  appointment_date: {
    type: String,
    required: true,
  },
  type_of_tests: {
    type: String,
    required: true,
  },
  doctorName: {
    firstName:{
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    }
  },
  bloodCollectionDate: {
    type: Date,
    required: true,
  },
  homeCollection: {
    type: Boolean,
    required: true,
  },
  reports: {
    type: Date,
    required: true,
  },
  collectorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Still Under Process", "Delivered"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appoinment", appointmentSchema)