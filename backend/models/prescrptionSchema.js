import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  tests: {
    type: String,
    required: true,
    minLength: [3, 'Test Name Must Contain At Least 3 Characters!'],
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  medication: {
    type: String,
  },
}, { timestamps: true });

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
