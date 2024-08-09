import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [test, setTest] = useState("");
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const testArray = [
    "TSH",
    "FASTING",
    "LFT",
    "LIPID PROFILE",
    "KFT",
    "ULTRASONOGRAPHY",
    "X-RAY",
    "MRI",
    "CT-SCAN"
  ];

  const departmentsArray = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics"
  ];

  const navigate = useNavigate(); 
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post("http://localhost:4000/api/v1/appointment/post", {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointment_date: appointmentDate,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        address,
        test,
        department,
        age,
        hasVisited: hasVisitedBool,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(data.message); 
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message); 
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <select
            value={test}
            onChange={(e) => setTest(e.target.value)}
          >
            <option value="">Select Test</option>
            {testArray.map((test, index) => (
              <option value={test} key={index}>
                {test}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Doctor's First Name"
            value={doctorFirstName}
            onChange={(e) => setDoctorFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Doctor's Last Name"
            value={doctorLastName}
            onChange={(e) => setDoctorLastName(e.target.value)}
          />
        </div>
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Have You Visited before?</p>
          <input type="checkbox" checked={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} style={{ flex: "none", width: "25px" }} />
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Book Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
