import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddNewTest from './components/AddNewTest';
import AddNewAdmin from './components/AddNewAdmin';
import Test from './components/Test';
import Message from './components/Message';
import Sidebar from './components/Sidebar';
import Prescriptions from './components/AddNewPrescription';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main';
import './App.css';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user/admin/me', { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.user || {});
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUser]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/test/addnew' element={<AddNewTest />} />
          <Route path='/admin/addnew' element={<AddNewAdmin />} />
          <Route path='/test' element={<Test />} />
          <Route path ='/prescriptions' element={<Prescriptions/>} />
          <Route path='/message' element={<Message />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
