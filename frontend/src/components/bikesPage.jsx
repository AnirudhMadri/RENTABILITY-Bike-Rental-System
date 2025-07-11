import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function bikesPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleGo = () => {
    console.log("Start:", startDate?.toString());
    console.log("End:", endDate?.toString());
  };

  const [time, setTime] = useState("");
  const [fuel, setFuel] = useState([]);
  const [trans, setTrans] = useState([]);
  const [brand, setBrand] = useState([]);

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
        className="flex justify-around items-center shadow-2xl border border-gray-300 p-6 bg-gray-100 rounded-xl"
      >
        <div>
          <select className="border-2 border-gray-300 w-50 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
          <label className="mb-1 font-bold text-2xl">Pickup Date & Time</label>
          <Datetime
            value={startDate}
            onChange={(date) => setStartDate(date)}
            inputProps={{
              className: "p-2 border-2 rounded-xl border-gray-300 w-60",
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="mb-1 font-medium text-2xl">
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

      <div className="grid grid-cols-12 my-20 h-screen">
        {/* Left - 15% */}
        <div className="col-span-2 bg-gray-100 shadow-2xl border border-gray-300 mr-4 rounded-2xl p-4">
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
        <div className="col-span-10 rounded-2xl bg-white p-4">
          <h2 className="text-xl font-semibold">Right Section</h2>
          <p>Main content goes here</p>
        </div>
      </div>
    </div>
  );
}
