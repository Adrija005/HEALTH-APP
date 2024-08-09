import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewPrescription = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [test, setTest] = useState(""); // Field for test
  const [prescriptionDetails, setPrescriptionDetails] = useState(""); // Field for prescription details
  const [file, setFile] = useState(null); // State for file upload
  const [filePreview, setFilePreview] = useState(""); // State for file preview

  const navigateTo = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile)); // Create preview URL for the selected file
  };

  const handleAddNewPrescription = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("test", test); // Include test in the form data
      formData.append("prescriptionDetails", prescriptionDetails); // Include prescription details
      if (file) formData.append("file", file); // Include file if selected

      await axios.post("http://localhost:4000/api/v1/prescription/addnew", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        navigateTo("/"); // Redirect after successful addition
        setFirstName("");
        setLastName("");
        setPhone("");
        setDob("");
        setGender("");
        setTest(""); // Reset test field
        setPrescriptionDetails(""); // Reset prescription details field
        setFile(null); // Reset file
        setFilePreview(""); // Reset file preview
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container add-prescription-form">
        <img src="/prescription.png" alt="logo" className="logo" />
        <h1 className="form-title">ADD NEW PRESCRIPTION</h1>
        <form onSubmit={handleAddNewPrescription}>
          <div className="form-wrapper">
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
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                placeholder="Test"
                value={test}
                onChange={(e) => setTest(e.target.value)}
              />
              <textarea
                placeholder="Prescription Details"
                value={prescriptionDetails}
                onChange={(e) => setPrescriptionDetails(e.target.value)}
              />
              <input
                type="file"
                onChange={handleFileChange}
              />
              {filePreview && (
                <div className="file-preview">
                  <img src={filePreview} alt="File preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
              )}
              <button type="submit">Add Prescription</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewPrescription;
