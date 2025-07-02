import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Booking() {
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    Type: "",
    Brand: "",
    Model: "",
    Year: "",
    Price_Per_Hour: "",
    Location: "",
    BookingStatus: false,
    OwnerId: "",
    Availability: false,
    Photos: [],
  });

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const Phone = localStorage.getItem("phone");
      if (!token || !Phone) return;

      const decoded = jwtDecode(token);
      const Name = decoded.Name;
      const Email = decoded.Email;

      const res = await axios.post(
        "http://localhost:3000/api/getDetails",
        { Name, Email, Phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData(res.data);
      setShowForm(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleVehicleChange = (key, value) => {
    setVehicleData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Final JSON:", formData);
    // axios.post("/api/saveDetails", formData)
  };

  const handleVehicleSave = () => {
    console.log("Saved Vehicle Data:", vehicleData);
    // axios.post("/api/vehicles", vehicleData)
  };

  return (
    <div className="w-[80vw] mx-auto">
      <div className="text-9xl mt-50 h-[50vh]">
        Your Bike. <br />
        For Booking.
      </div>
      <p id="subtitle" className="text-5xl my-50">
        Earn through RENTABILITY by putting your 2 wheeler for rent.
      </p>

      <div className="my-40">
        <button
          type="button"
          onClick={fetchUserDetails}
          className="px-15 py-4 text-white bg-black transition duration-300 hover:scale-105 text-xl rounded-xl"
        >
          Get Started
        </button>
      </div>

      {showForm && (
        <>
          {/* User Details Form */}
          <div className="flex items-center justify-around mb-20">
            <p id="subtitle" className="text-9xl">
              Your Details
            </p>
            <form className="bg-white shadow-md border border-gray-300 rounded-xl p-6 w-full max-w-md mx-auto space-y-4">
              {formData &&
                Object.entries(formData).map(
                  ([key, value]) =>
                    key !== "_id" &&
                    key !== "__v" && (
                      <div key={key} className="flex flex-col">
                        <label className="mb-1 text-3xl text-gray-700">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )
                )}
              <button
                type="button"
                onClick={handleSave}
                className="px-15 w-full py-4 text-white bg-black transition duration-300 hover:scale-105 text-xl rounded-xl"
              >
                Save
              </button>
            </form>
          </div>

          {/* Vehicle Details Form */}
          <div className="flex items-center justify-around">
            <p id="subtitle" className="text-9xl">
              Bike Details
            </p>
            <form className="bg-white shadow-md border border-gray-300 rounded-xl p-6 w-full max-w-md mx-auto space-y-4">
              {Object.entries(vehicleData).map(
                ([key, value]) =>
                  key !== "Photo" && (
                    <div key={key} className="flex flex-col">
                      <label className="mb-1 text-3xl text-gray-700">
                        {key}
                      </label>
                      {typeof value === "boolean" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            handleVehicleChange(key, e.target.value === "true")
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      ) : (
                        <input
                          type={
                            key === "Year" ||
                            key === "Price_Per_Hour" ||
                            key === "OwnerId"
                              ? "number"
                              : "text"
                          }
                          value={value}
                          onChange={(e) =>
                            handleVehicleChange(key, e.target.value)
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  )
              )}

              <button
                type="button"
                onClick={handleVehicleSave}
                className="px-15 w-full py-4 text-white bg-black transition duration-300 hover:scale-105 text-xl rounded-xl"
              >
                Save
              </button>
            </form>
          </div>
          <div className="flex items-center justify-around mb-20">
            <p id="subtitle" className="text-9xl">
              Post a pic
            </p>
            
          </div>
        </>
      )}
    </div>
  );
}
