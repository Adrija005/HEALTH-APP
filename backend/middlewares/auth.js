import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';
import { catchAsyncErrors } from './catchAsyncError.js';
import ErrorHandler from './errorMiddleware.js';

// Middleware to authenticate users
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  next();
});

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin is not authenticated!", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user || req.user.role !== "Admin") {
      return next(new ErrorHandler("Admin role required!", 403));
    }
    
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid Token!", 401));
  }
});

// Middleware to authenticate patient users
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("Patient is not authenticated!", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (req.user.role !== "Patient") {
    return next(new ErrorHandler("Patient role required!", 403));
  }

  next();
});

// Middleware to authorize user roles
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Access denied!", 403));
    }
    next();
  };
};
