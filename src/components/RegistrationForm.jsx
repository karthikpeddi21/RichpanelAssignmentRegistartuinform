import React, { useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';
import stylecss from './Styles.module.css';
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    isAgreed: false,
  });

  const [errors, setErrors] = useState({});
  const [isButtonActive, setIsButtonActive] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      isAgreed: checked,
    }));
    setIsButtonActive(checked);
  };

  const validateForm = () => {
    const errors = {};

    // Validate full name
    if (!formData.fullName) {
      errors.fullName = 'Full Name is required';
    }

    // Validate email
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Validate phone number
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format';
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      errors.password = 'Invalid password format';
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Validate terms and conditions
    if (!formData.isAgreed) {
      errors.isAgreed = 'Please agree to the terms and conditions';
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Validate email format
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Validate phone number format
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    // Validate password format
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordPattern.test(password);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, display success message
      toast.success('Registration successful!', {
        position: toast.POSITION.TOP_CENTER,
      });

      // Navigate to user details page
      navigate('/user-details', { state: { formData } });
      
    } else {
      // Form is invalid, display error messages
      setErrors(formErrors);
    }
    setIsButtonActive(false);
    setFormData((prevData) => ({
      ...prevData,
      isAgreed: false,
    }));
  };
  
  return (
    <div className={stylecss.container}>
      <h2>Registration Form</h2>
      <hr/>
      <form onSubmit={handleSubmit}>

        <div className={stylecss.formgroup}>
          <label className={stylecss.label}>Full Name:</label>
          <input 
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={errors.fullName? `${stylecss.inputfield} ${stylecss.error}`:stylecss.inputfield}
          />
          {errors.fullName && <p className={`error-text ${stylecss.errortext}`}>{errors.fullName}</p>}
        </div>

        <div className={stylecss.formgroup}>
          <label className={stylecss.label}>Email:</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email? `${stylecss.inputfield} ${stylecss.error}`:stylecss.inputfield}
          />
          {errors.email && <p className={`error-text ${stylecss.errortext}`}>{errors.email}</p>}
        </div>

        <div className={stylecss.formgroup}>
          <label className={stylecss.label}>Phone Number:</label>
          <input 
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={errors.phoneNumber?`${stylecss.inputfield} ${stylecss.error}`:stylecss.inputfield}
          />
          {errors.phoneNumber && <p className={`error-text ${stylecss.errortext}`}>{errors.phoneNumber}</p>}
        </div>

        <div className={stylecss.formgroup}>
          <label className={stylecss.label}>Password:</label>
          <input
            type='password'
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? `${stylecss.inputfield} ${stylecss.error}` : stylecss.inputfield}
          />
          {errors.password && <p className={`error-text ${stylecss.errortext}`}>{errors.password}</p>}
        </div>

        <div className={stylecss.formgroup}>
          <label className={stylecss.label}>Confirm Password:</label>
          <input 
            type='password'
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={errors.confirmPassword ? `${stylecss.inputfield} ${stylecss.error}` : stylecss.inputfield}
          />
          {errors.confirmPassword && <p className={`error-text ${stylecss.errortext}`}>{errors.confirmPassword}</p>}
        </div>

        <div className={stylecss.formgroup1}>
        <label className={stylecss.label1}>
          <input
            type="checkbox"
            name="isAgreed"
            checked={formData.isAgreed}
            onChange={handleCheckboxChange}
          />
          I agree to the terms and conditions
        </label>
        {errors.isAgreed && <p className={`error-text ${stylecss.errortext}`}>{errors.isAgreed}</p>}

      </div>
        <div className={stylecss.submitbtn}>
          <button
            type="submit"
            className={isButtonActive ? stylecss.submitbutton + ' ' + stylecss.active : stylecss.submitbutton}
            disabled={!isButtonActive}
          >
            Submit
            </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
