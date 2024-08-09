import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/prescription/getall",
          { withCredentials: true }
        );
        setPrescriptions(data.prescriptions);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    fetchPrescriptions();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page prescriptions">
      <h1>Prescriptions</h1>
      <div className="banner">
        {prescriptions && prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <div className="card" key={prescription.id}>
              <h4>{`${prescription.firstName} ${prescription.lastName}`}</h4>
              <div className="details">
                <p>
                  Test: <span>{prescription.test}</span>
                </p>
                <p>
                  Prescription Details: <span>{prescription.prescriptionDetails}</span>
                </p>
                <p>
                  Date: <span>{prescription.date}</span>
                </p>
                <p>
                  Status: <span>{prescription.status}</span>
                </p>
                {prescription.file && (
                  <a href={prescription.file.url} target="_blank" rel="noopener noreferrer">
                    View Prescription File
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No Prescriptions Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Prescriptions;
