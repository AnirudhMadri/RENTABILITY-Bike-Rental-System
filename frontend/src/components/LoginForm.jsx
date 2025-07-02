import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [regiEmail, setRegiEmail] = useState("");
  const [regiPassword, setRegiPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleRegi = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/createCustomer", {
        Name: name,
        Email: regiEmail,
        Password: regiPassword,
      });
      alert("Successfully registered!");
      console.log(res.data);
      navigate("/home");
    } catch (err) {
      console.error("Registration error: ", err);
      if (err.response && err.response.data) {
        alert(err.response.data.error);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        Email: loginEmail,
        Password: loginPassword,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        localStorage.setItem("user", JSON.stringify(res.data.customer));
        alert("Login successful");
        console.log(res.data);
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error: ", err);
      if (err.response && err.response.data) {
        alert(err.response.data.error);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen font-montserratregular flex items-center justify-center bg-white px-4">
      <div
        className={`bg-white p-8 rounded-lg border shadow-lg ${
          showSignup ? "w-[700px]" : "w-full max-w-md"
        } flex`}
      >
        {/* Login Form */}
        <div className="w-full">
          <h1 className="mb-6 font-grainedregular">Login</h1>
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                aria-describedby="emailHelp"
              />
              <p id="emailHelp" className="mt-1 text-sm text-gray-500">
                We'll never share your email with anyone else.
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="check"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="check"
                className="ml-2 block text-sm text-gray-900"
              >
                Check me out
              </label>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>

            {!showSignup && (
              <button
                type="button"
                onClick={() => setShowSignup(true)}
                className="w-full inline-flex justify-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up Instead
              </button>
            )}
          </form>
        </div>

        {/* Signup Form */}
        {showSignup && (
          <div className="w-full border-l border-gray-300 pl-6 ml-6">
            <h1 className="text-xl font-semibold mb-4">Register</h1>
            <form className="space-y-4" onSubmit={handleRegi}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  value={regiEmail}
                  onChange={(e) => setRegiEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={regiPassword}
                  onChange={(e) => setRegiPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex justify-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
