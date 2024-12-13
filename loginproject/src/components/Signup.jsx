import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    mobile: false,
    confirmPassword: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.includes("@")) {
      return "Email must contain @ symbol";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return "Mobile number must be 10 digits";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailError = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: emailError }));
    } else if (name === "mobile") {
      const mobileError = validateMobile(value);
      setErrors((prev) => ({ ...prev, mobile: mobileError }));
    } else if (name === "confirmPassword") {
      if (touched.password) {
        const confirmPasswordError = validateConfirmPassword(
          value,
          formData.password
        );
        setErrors((prev) => ({
          ...prev,
          confirmPassword: confirmPasswordError,
        }));
      }
    } else if (["name", "city", "state"].includes(name)) {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Only alphabetic characters are allowed",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error)) {
      alert("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      alert(response.data.message);
      navigate("/users");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors((prev) => ({
          ...prev,
          email: error.response.data.message,
        }));
      } else {
        alert("Error registering user");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 min-h-screen">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-300"
              >
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type={
                  field === "password" || field === "confirmPassword"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : field === "mobile"
                    ? "tel"
                    : "text"
                }
                name={field}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {(touched[field] || field === "email" || field === "mobile") &&
                errors[field] && (
                  <span className="text-red-400 text-sm mt-1">
                    {errors[field]}
                  </span>
                )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
