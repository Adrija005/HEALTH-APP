import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const { isAuthenticated, admin } = useContext(Context);
  const navigateTo = useNavigate();

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
        setTests([]);
      }
    };
    fetchTests();
  }, []);

  const handleUpdateStatus = async (testId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/tests/update/${testId}`,
        { status },
        { withCredentials: true }
      );
      setTests((prevTests) =>
        prevTests.map((test) =>
          test._id === testId ? { ...test, status } : test
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/healthapp.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello,</p>
                <h5>
                  {admin && `${admin.firstName} ${admin.lastName}`}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Tests</p>
            <h3>{tests.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Upcoming Tests</p>
            <h3>
              {tests.filter(test => test.status === "Scheduled").length}
            </h3>
          </div>
        </div>
        <div className="banner">
          <h5>Tests</h5>
          <button onClick={() => navigateTo("/test/addnew")} className="add-new-test-btn">
            Add New Test
          </button>
          <table>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tests && tests.length > 0 ? (
                tests.map((test) => (
                  <tr key={test._id}>
                    <td>{test.name}</td>
                    <td>{test.description}</td>
                    <td>{test.date.substring(0, 16)}</td>
                    <td>{test.category}</td>
                    <td>
                      <select
                        className={
                          test.status === "Scheduled"
                            ? "value-scheduled"
                            : test.status === "Completed"
                            ? "value-completed"
                            : "value-cancelled"
                        }
                        value={test.status}
                        onChange={(e) =>
                          handleUpdateStatus(test._id, e.target.value)
                        }
                      >
                        <option value="Scheduled" className="value-scheduled">
                          Scheduled
                        </option>
                        <option value="Completed" className="value-completed">
                          Completed
                        </option>
                        <option value="Cancelled" className="value-cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>
                    <td>{test.status === "Completed" ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Tests Found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
