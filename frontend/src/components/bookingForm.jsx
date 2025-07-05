import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import WaveText from "./WaveText";
import Gray2Black from "./Gray2Black";
import { FaArrowDown } from "react-icons/fa";
import MapWithLocation from "./MapWithLocation";
import { supabase } from "../supabaseClient";

import gsap from "gsap";

export default function Booking() {
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFile((prevFiles) => [...prevFiles, ...newFiles]);

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrl((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    setCurrentIndex(0);
  };

  const handleUpload = async () => {
    if (!file || file.length === 0) return;

    setImageLoading(true);

    try {
      const uploadedUrls = [];

      for (const singleFile of file) {
        const filePath = `public/${Date.now()}_${singleFile.name}`;

        const { error } = await supabase.storage
          .from("images")
          .upload(filePath, singleFile);

        if (error) {
          console.error("Upload error:", error.message);
          continue; // Skip this file and try the next
        }

        const { data: urlData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        uploadedUrls.push(urlData.publicUrl);
      }

      // Append all uploaded URLs to vehicleData.Photos
      handleVehicleChange("Photos", [...vehicleData.Photos, ...uploadedUrls]);

      // Reset states
      setPreviewUrl([]);
      setFile([]);
    } catch (err) {
      console.error("Unexpected error:", err.message);
    } finally {
      setImageLoading(false);
    }
  };

  const [vehicleData, setVehicleData] = useState({
    Type: "",
    Brand: "",
    Model: "",
    Year: "",
    Price_Per_Hour: "",
    Location: "",
    OwnerId: "",
    Availability: false,
    Photos: [],

    // Only user-editable fields:
    FuelType: "",
    FuelCapacity: "",
    Weight: "",
    Mileage: "",
    Displacement: "",
    TopSpeed: "",
    Seats: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" }); // or behavior: "auto"

    const userId = localStorage.getItem("id");
    if (userId) {
      setVehicleData((prev) => ({
        ...prev,
        OwnerId: userId,
      }));
    }
  }, []);

  useEffect(() => {
    if (vehicleData.OwnerId) {
      console.log(vehicleData);
    }
  }, [vehicleData.OwnerId]);

  useEffect(() => {
    console.log("Updated vehicleData:", vehicleData);
  }, [vehicleData.Photos]);

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

  const handleSave = async () => {
    console.log("Final JSON:", formData);
    setUserLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register-user",
        formData
      );

      console.log("Registration successful:", response.data);
      setUserLoading(false);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleVehicleSave = async () => {
    try {
      console.log(vehicleData);
      setVehicleLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/addVehicle",
        vehicleData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        console.log("Vehicle added successfully!");
        setVehicleData({
          Type: null,
          Brand: null,
          Model: null,
          Year: null,
          Price_Per_Hour: null,
          Location: null,
          OwnerId: null,
          Availability: false,
          Photos: [],
        });
        setVehicleLoading(false);
      } else {
        console.log("Failed to add vehicle.");
      }
    } catch (error) {
      console.error(
        "Error posting vehicle data:",
        error.response?.data || error.message
      );
    }
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? previewUrl.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === previewUrl.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-[80vw] mx-auto">
      <section className="grid grid-cols-5 min-h-[60vh] px-6 sm:px-20 bg-white items-center">
        {/* Left 80% (4/5 cols) */}
        <div className="col-span-4">
          <div className="text-9xl mt-50 h-[50vh]">
            <WaveText text={`Your Bike\nFor Booking`} />
          </div>
        </div>

        {/* Right 20% (1/5 col) */}
        <div className="col-span-1 flex justify-center items-center">
          <div className="mt-150 text-black">
            <FaArrowDown className=" text-7xl text-black" />
          </div>
        </div>
      </section>

      <div id="subtitle" className="text-5xl mt-100">
        <Gray2Black
          text={`Turn your idle 2-wheeler into a source of income.\nWith RENTABILITY, you can easily rent out your bike or scooter\nto verified users and start earning every day.\nLet your ride work for you!`}
        />
      </div>

      <div className="my-10">
        <button
          type="button"
          id="subtitle"
          onClick={fetchUserDetails}
          className="px-15 py-4 text-white bg-black transition duration-300 hover:scale-105 text-xl rounded-xl"
        >
          Get Started
        </button>
      </div>

      {showForm && (
        <>
          {/* User Details Form */}
          <div className="flex items-center justify-around mt-50 mb-20 mx-auto">
            <div id="subtitle" className="text-9xl">
              <Gray2Black text="Your Details" />
            </div>
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
                id="subtitle"
                disabled={userLoading}
                className={`px-15 py-4 mt-4 text-white bg-black transition duration-300  text-xl rounded-xl ${
                  userLoading
                    ? " cursor-not-allowed"
                    : "bg-black hover:scale-101"
                }`}
                onClick={handleSave}
              >
                {userLoading ? (
                  <div className="flex items-center gap-2 mx-auto">
                    <svg
                      className="text-gray-300 animate-spin"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-gray-900"
                      ></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>

          {/* Vehicle Details Form */}
          <div className="flex items-center justify-around  mb-20 mx-auto">
            <div id="subtitle" className="text-9xl">
              <Gray2Black text="Bike Details" />
            </div>
            <form className="bg-white shadow-md border border-gray-300 rounded-xl p-6 w-full max-w-md mx-auto space-y-4">
              {Object.entries(vehicleData).map(
                ([key, value]) =>
                  key !== "Photos" &&
                  key !== "OwnerId" && (
                    <div key={key} className="flex flex-col">
                      <label className="mb-1 text-3xl text-gray-700">
                        {key}
                      </label>
                      {key === "Location" ? (
                        <select
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={(e) =>
                            handleVehicleChange("Location", e.target.value)
                          }
                        >
                          <option value="">Select a city</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Kolkata">Kolkata</option>
                          <option value="Pune">Pune</option>
                          <option value="Ahmedabad">Ahmedabad</option>
                          <option value="Jaipur">Jaipur</option>
                          <option value="Lucknow">Lucknow</option>
                        </select>
                      ) : key === "Type" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            handleVehicleChange(key, e.target.value)
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none "
                        >
                          <option value="" disabled hidden>
                            Select type of bike
                          </option>
                          <option className="rounded-lg" value="Geared">
                            Geared
                          </option>
                          <option className="rounded-lg" value="Non Geared">
                            Non Geared
                          </option>
                        </select>
                      ) : typeof value === "boolean" ? (
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
                          type="text"
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
            </form>
          </div>

          <div className="flex items-center justify-around mt-50 mx-auto">
            <p id="subtitle" className="text-9xl">
              Post a Pic
            </p>
            <div className="flex flex-col border border-gray-300 shadow-xl rounded-xl p-4">
              <input
                type="file"
                id="subtitle"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600
             file:mr-4 file:py-2 file:px-4
             hover:cursor-pointer
             file:rounded-l-md file:border-0
             file:text-sm file:font-semibold
             file:bg-gray-200 file:text-gray-700
             hover:file:bg-gray-300
             border border-gray-300 rounded-md"
              />

              {previewUrl.length > 0 ? (
                <div className="mt-4 flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={previewUrl[currentIndex]}
                      alt="Preview"
                      className="max-h-48 rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) =>
                          prev === 0 ? previewUrl.length - 1 : prev - 1
                        )
                      }
                      className="absolute top-1/2 left-[-2rem] transform -translate-y-1/2 bg-white border rounded-full p-2 shadow"
                    >
                      ◀
                    </button>
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) =>
                          prev === previewUrl.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute top-1/2 right-[-2rem] transform -translate-y-1/2 bg-white border rounded-full p-2 shadow"
                    >
                      ▶
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {currentIndex + 1} / {previewUrl.length}
                  </p>
                </div>
              ) : (
                <div
                  id="subtitle"
                  className="flex flex-col items-center text-gray-400 mt-4"
                >
                  <svg
                    className="w-10 h-10 mb-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5V7.5C3 6.12 4.12 5 5.5 5h13c1.38 0 2.5 1.12 2.5 2.5v9c0 1.38-1.12 2.5-2.5 2.5h-13A2.5 2.5 0 013 16.5zM7.5 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 0L9 12l2.25-3L15 14H6l1.5-4.5z"
                    />
                  </svg>
                  <span className="text-sm">No image selected</span>
                </div>
              )}

              <button
                id="subtitle"
                disabled={imageLoading || !file}
                className={`px-15 py-4 mt-4 text-white bg-black transition duration-300  text-xl rounded-xl ${
                  imageLoading
                    ? " cursor-not-allowed"
                    : "bg-black hover:scale-101"
                }`}
                onClick={handleUpload}
              >
                {imageLoading ? (
                  <div className="flex items-center gap-2 mx-auto">
                    <svg
                      class="text-gray-300 animate-spin"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-gray-900"
                      ></path>
                    </svg>
                    Uploading...
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
              <button
                id="subtitle"
                type="button"
                disabled={vehicleLoading}
                className={`px-15 py-4 mt-4 text-white bg-black transition duration-300  text-xl rounded-xl ${
                  vehicleLoading
                    ? " cursor-not-allowed"
                    : "bg-black hover:scale-101"
                }`}
                onClick={handleVehicleSave}
              >
                {vehicleLoading ? (
                  <div className="flex items-center gap-2 mx-auto">
                    <svg
                      className="text-gray-300 animate-spin"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-gray-900"
                      ></path>
                    </svg>
                    Saving vehicle...
                  </div>
                ) : (
                  "Save Vehicle"
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center flex-col mt-50">
            <p id="subtitle" className="text-9xl">
              Drop the bike here
            </p>
            <div id="subtitle" className="w-full rounded-xl">
              <MapWithLocation />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
