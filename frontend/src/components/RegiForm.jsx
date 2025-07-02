import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function RegiForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    } else if (address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const phone = localStorage.getItem("phone");
      if (!phone) {
        console.error("Phone number not found in localStorage");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/api/register-user",
          {
            name: name,
            email: email,
            address: address,
            phone: phone,
          }
        );

        console.log("Registration successful:", response.data);
        navigate("/home");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <div>
      <div id="title" className="mt-10 font-bold text-9xl">
        Welcome to
        <br /> RENTABILITY.
      </div>
      <div id="title" className="my-30 flex items-center justify-center">
        <div className="mx-auto rounded-xl w-150 border border-gray-200 shadow-2xl p-3">
          <p className="text-2xl text-center bg-amber-200 p-3 rounded-lg font-bold">
            Enter your details below.
          </p>

          <form id="subtitle" className="w-full mt-10 flex flex-col gap-4">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 p-2 w-full rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 p-2 w-full rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label>Address:</label>
              <textarea
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-200 p-2 w-full rounded-lg"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
