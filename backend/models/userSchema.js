import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "TestingLab"],
  },
  tests: {
    type: String,
    required: function() { return this.role === "Patient"; }, // Required only for patients
    minLength: [3, 'Test Name Must Contain At Least 3 Characters!'],
  },
  date: {
    type: Date,
    required: function() { return this.role === "Patient"; }, // Required only for patients
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXIRES,
  });
};

export const User = mongoose.model('User', userSchema);
