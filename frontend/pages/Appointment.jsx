import React from 'react';
import Specialist from '../src/components/Specialist';
import AppointmentForm from '../src/components/AppointmentForm'
const Appointment = () => {
  return (
  <>
  <Specialist title={"Schedule Your Appointment With Us | Health App"} imageUrl={"/checkup.png"}/>
  <AppointmentForm/>
  </>
  );
};

export default Appointment;