import React from 'react';
import { useLocation } from 'react-router-dom';
import stylecss from './Styles.module.css'
const UserDetailsPage = () => {
  const location = useLocation();
  const { formData } = location.state;

  return (
    <div className={stylecss.container}>
      <h2>User Details</h2>
      <div className={stylecss.userdetails}>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
      </div>
    </div>
  );
};

export default UserDetailsPage;
