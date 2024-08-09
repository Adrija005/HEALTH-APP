import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';

const Message = () => {
  const [message, setMessage] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/v1/message/getall', { withCredentials: true });
        setMessage(data.message);
      } catch (error) {
        console.log(error.response?.data?.message || "Failed to fetch message");
        toast.error("Failed to fetch message");
      }
    };
    fetchMessage();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page message">
      <h1>MESSAGE</h1>
      <div className="banner">
        {message.length > 0 ? (
          message.map((element) => (
            <div className="card" key={element._id}>
              <div className="details">
                <p>First Name: <span>{element.firstName}</span></p>
                <p>Last Name: <span>{element.lastName}</span></p>
                <p>Email: <span>{element.email}</span></p>
                <p>Phone: <span>{element.phone}</span></p>
                <p>Message: <span>{element.message}</span></p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Message!</h1>
        )}
      </div>
    </section>
  );
};

export default Message;
