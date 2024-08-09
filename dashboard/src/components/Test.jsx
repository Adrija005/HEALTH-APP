import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/tests",
          { withCredentials: true }
        );
        setTests(data.tests);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    fetchTests();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page tests">
      <h1>Tests</h1>
      <div className="banner">
        {tests && tests.length > 0 ? (
          tests.map((test) => (
            <div className="card" key={test.id}>
              <h4>{test.name}</h4>
              {test.picture && (
                <img src="./bloodtest.png" alt="test" className="test-picture" />
              )}
              <div className="details">
                <p>
                  Description: <span>{test.description}</span>
                </p>
                <p>
                  Date: <span>{test.date}</span>
                </p>
                <p>
                  Category: <span>{test.category}</span>
                </p>
                <p>
                  Status: <span>{test.status}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Tests Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Tests;
