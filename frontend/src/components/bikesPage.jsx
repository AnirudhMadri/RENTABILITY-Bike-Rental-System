import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import axios from "axios";
import "react-datetime/css/react-datetime.css";

export default function bikesPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  const handleGo = async () => {
    if (!startDate || !endDate || !location) {
      alert("Please fill all fields");
      return;
    }

    const pickupISO = new Date(startDate).toISOString();
    const dropoffISO = new Date(endDate).toISOString();

    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/getVehicles",
        {
          params: {
            Location: location,
            Pickup: pickupISO,
            Dropoff: dropoffISO,
          },
        }
      );
      console.log("Fetched vehicles:", response.data);
      setVehicles(response.data.vehicles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
    console.log("Start:", startDate?.toString());
    console.log("End:", endDate?.toString());
  };

  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [fuel, setFuel] = useState([]);
  const [trans, setTrans] = useState([]);
  const [brand, setBrand] = useState([]);

  const getBikes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/addVehicle", {
        params: {
          time: time,
          transmission: trans.join(","),
          fuelType: fuel.join(","),
          brand: brand.join(","),
        },
      });
    } catch (error) {
      console.error("Error fetching filtered vehicles: ", error);
    }
  };

  const handleChange = (type, value, checked) => {
    if (type === "Transmission") {
      setTrans((prev) => {
        const updated = checked
          ? [...prev, value]
          : prev.filter((item) => item !== value);
        console.log("Selected transmissions: ", updated);
        return updated;
      });
    } else if (type === "FuelType") {
      setFuel((prev) => {
        const updated = checked
          ? [...prev, value]
          : prev.filter((item) => item !== value);
        console.log("Selected Fuel: ", updated);
        return updated;
      });
    } else if (type === "Brand") {
      setBrand((prev) => {
        const updated = checked
          ? [...prev, value]
          : prev.filter((item) => item !== value);
        console.log("Selected Brands: ", updated);
        return updated;
      });
    }
  };

  const timeOptions = [
    "3 Hours",
    "6 Hours",
    "Half Day",
    "Daily",
    "Weekly",
    "15 Days",
    "Monthly",
    "3 Months",
    "6 Months",
    "Yearly",
  ];
  const bikeBrands = [
    "Bajaj",
    "Harley Davidson",
    "Honda",
    "Mahindra",
    "Piaggio",
    "Royal Enfield",
    "Suzuki",
    "Triumph",
    "TVS",
    "Yamaha",
  ];

  return (
    <div className="mt-24 w-[90%] mx-auto">
      <p id="title" className=" my-4  text-4xl">
        Select the date and time.
      </p>
      <div
        id="subtitle"
        className="flex justify-around items-center shadow-lg border border-gray-300 p-6 bg-gray-100 rounded-xl"
      >
        <div>
          <select
            onChange={(e) => {
              setLocation(e.target.value);
              console.log(e.target.value);
            }}
            className="border-2 border-gray-300 w-50 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
        <div className="flex flex-col items-center">
          <label id="subsubtitle" className="mb-1 font-bold text-2xl">
            Pickup Date & Time
          </label>
          <Datetime
            value={startDate}
            onChange={(date) => setStartDate(date)}
            inputProps={{
              className: "p-2 border-2 rounded-xl border-gray-300 w-60",
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <label id="subsubtitle" className="mb-1 font-medium text-2xl">
            Dropoff Date & Time
          </label>
          <Datetime
            value={endDate}
            onChange={(date) => setEndDate(date)}
            inputProps={{
              className: "p-2 border-2 rounded-xl border-gray-300 w-60",
            }}
          />
        </div>

        <button
          onClick={handleGo}
          id="subtitle"
          className="px-15 py-4 text-white bg-black transition delay-10 duration-300 ease-in-out hover:scale-102  mr-10 text-xl rounded-xl hover:cursor-pointer "
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-12 my-10 ">
        {/* Left - 15% */}
        <div className="col-span-2 bg-gray-100 shadow-lg border border-gray-300 mr-4 rounded-2xl p-4">
          <p className="text-4xl font-semibold">Filters </p>
          <hr className="w-[90%] h-px my-3 bg-gray-300 border-0 mx-auto" />
          <p id="subtitle" className="text-2xl my-2 font-semibold">
            Booking Duration
          </p>

          {timeOptions.map((timeOptions, index) => (
            <label
              id="subtitle"
              key={index}
              className="flex items-center space-x-3  p-0.5 cursor-pointer"
            >
              <input
                type="radio"
                name="bookingDuration"
                value={timeOptions}
                checked={time === timeOptions}
                onChange={(e) => setTime(e.target.value)}
                className="form-radio h-5 w-5 text-black"
              />
              <span className="text-md">{timeOptions}</span>
            </label>
          ))}
          <hr className="w-[90%] h-px mt-3 bg-gray-300 border-0 mx-auto" />
          <div className="mt-3">
            <p id="subtitle" className="text-2xl font-semibold mb-1">
              Transmission
            </p>
            {["Gear", "Gearless"].map((option) => (
              <label
                id="subtitle"
                key={option}
                className="flex items-center space-x-2 px-2 py-0.5 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) =>
                    handleChange(
                      "Transmission",
                      e.target.value,
                      e.target.checked
                    )
                  }
                  className="form-checkbox h-4 w-4 text-black"
                />
                <span className="text-md">{option}</span>
              </label>
            ))}
          </div>
          <hr className="w-[90%] h-px my-3 bg-gray-300 border-0 mx-auto" />

          <div className="mt-3">
            <p id="subtitle" className="text-2xl font-semibold mb-1">
              Fuel Type
            </p>
            {["Petrol", "CNG-Petrol"].map((option) => (
              <label
                id="subtitle"
                key={option}
                className="flex items-center space-x-2 px-2 py-0.5 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) =>
                    handleChange("FuelType", e.target.value, e.target.checked)
                  }
                  className="form-checkbox h-4 w-4 text-black"
                />
                <span className="text-md">{option}</span>
              </label>
            ))}
          </div>
          <hr className="w-[90%] h-px my-3 bg-gray-300 border-0 mx-auto" />

          <div className="mt-3">
            <p id="subtitle" className="text-2xl font-semibold mb-3">
              Brands
            </p>
            {bikeBrands.map((brand) => (
              <label
                id="subtitle"
                key={brand}
                className="flex items-center space-x-2 px-2 py-0.5 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={brand}
                  onChange={(e) =>
                    handleChange("Brand", e.target.value, e.target.checked)
                  }
                  className="form-checkbox h-4 w-4 text-black"
                />
                <span className="text-md">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right - 85% */}
        <div className="col-span-10 rounded-2xl border border-gray-300  bg-white p-4">
          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {vehicles.map((bike, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                  <p className="text-xl p-2">
                    {bike.Brand} {bike.Model}
                  </p>
                  <hr className="w-[90%] h-px mt-3 bg-gray-300 border-0 mx-auto" />
                  <img
                    src={bike.Photos[0]}
                    alt="Bike"
                    className="w-full h-48 object-contain rounded-xl"
                  />
                  <hr className="w-[90%] h-px mt-3 bg-gray-300 border-0 mx-auto" />
                  <div
                    id="subtitle"
                    className="flex items-center justify-around mt-3"
                  >
                    <p className="text-xl ">⚙️{bike.Type}</p>
                    <p className="text-xl ">💺{bike.Seats}</p>
                    <p className="text-xl ">⛽{bike.FuelType}</p>
                  </div>
                  <hr className="w-[90%] h-px mt-3 bg-gray-300 border-0 mx-auto" />
                  <div
                    id="subtitle"
                    className="flex items-center justify-between mx-5 mt-3"
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-2xl">INR. {bike.Price_Per_Hour}</p>
                      <p className="text-lg">{bike.KilometerLimit} Km limit</p>
                      <p className="text-lg">Fuel excluded</p>
                    </div>
                    <button
                      id="subtitle"
                      className="p-4 text-white bg-black transition delay-10 duration-300 ease-in-out hover:scale-102  text-xl rounded-xl hover:cursor-pointer "
                    >
                      Book Now
                    </button>
                  </div>
                  <hr className="w-full h-px mt-3 bg-gray-300 border-0 mx-auto" />
                  <div
                    id="subtitle"
                    className="flex items-center bg-gray-100 justify-between mx-5 mt-3"
                  >
                    <p className="text-lg">
                      Security Deposit: {bike.SecurityDeposit}
                    </p>
                    <p className="text-lg">Make Year: {bike.Year}</p>
                  </div>

                  {/* You can add more bike details here */}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-9xl">:(</p>
              <p id="subsubtitle" className="text-4xl my-10">
                No bikes to show...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
