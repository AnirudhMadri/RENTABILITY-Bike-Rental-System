import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bikeImage from "../assets/images/bikeimage.jpg";
export default function Login() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="w-[80vw]  mx-auto">
        <div className="flex items-center justify between text-9xl mt-10 h-[100vh]">
          <div>
            Two <br></br>
            Wheelers. <br></br>
            For Rent.
          </div>
          <div>
            <img
              src={bikeImage}
              className="h-150 w-auto rounded-xl ml-40"
              alt="bike"
            />
          </div>
        </div>
        <div className="text-9xl mt-10 h-[100vh]">
          <div>Why RENTABILITY?</div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
            <div className="relative my-30 mx-10">
              <p id="title" className="text-5xl z-0">
                Flexible Plans
              </p>
              <p
                id="subtitle"
                className="absolute top-9 left-5 backdrop-blur-xs p-4 text-2xl bg-gray-300/10 z-10 rounded-2xl"
              >
                Get daily, weekly, and monthly packages at discounted rates
              </p>
            </div>

            <div className="relative my-30 mx-10">
              <p id="title" className="text-5xl z-0">
                Wide range
              </p>
              <p
                id="subtitle"
                className="absolute top-9 left-5 backdrop-blur-xs p-4 text-2xl bg-gray-300/10 z-10 rounded-2xl"
              >
                Looking for a particular brand or location? We have probably got
                it.
              </p>
            </div>

            <div className="relative my-30 mx-10">
              <p id="title" className="text-5xl z-0">
                Highly maintained fleet
              </p>
              <p
                id="subtitle"
                className="absolute top-9 left-5 backdrop-blur-xs p-4 text-2xl bg-gray-300/10 z-10 rounded-2xl"
              >
                Get high quality and serviced vehicles.
              </p>
            </div>

            <div className="relative my-30 mx-10">
              <p id="title" className="text-5xl z-0">
                24/7 Service.
              </p>
              <p
                id="subtitle"
                className="absolute top-9 left-5 backdrop-blur-xs p-4 text-2xl bg-gray-300/10 z-10 rounded-2xl"
              >
                Day or night, rent a bike.
              </p>
            </div>
          </div>
        </div>

        <div className="text-9xl my-10 ">
          <p>How to book</p>
          <p id="subtitle" className="text-5xl my-15">
            RENTABILITY makes bike booking quick and hassle-free. Whether it’s a
            daily commute or a last-minute trip, easily check availability and
            pick your ride in seconds.
          </p>

          <div>
            <p className="text-5xl">Step 1: Find your ride.</p>
            <p id="subtitle" className="text-4xl my-5">
              Enter the basic details like, city, pick up and drop date and time
              to choose from a list of available two - wheelers at your desired
              go-hub.
            </p>
          </div>
          <div>
            <p className="text-5xl">Step 2: Book your ride.</p>
            <p id="subtitle" className="text-4xl my-5">
              Select your package and choose from the available payment options.
            </p>
          </div>
          <div>
            <p className="text-5xl">Step 3: Get ready to ride.</p>
            <p id="subtitle" className="text-4xl my-5">
              You will receive all the ride details via message and email. Reach
              the pick up point in time and pay the security deposit (if
              applicable).
            </p>
          </div>
          <div>
            <p className="text-5xl">Step 4: End your ride.</p>
            <p id="subtitle" className="text-4xl my-5">
              Once you have ended your ride, drop the vehicle at the same pick
              up point. Security deposit is refunded after checking for damages
              and challans (if any).
            </p>
          </div>
        </div>
        <div className="text-9xl my-30 h-[100vh]">
          <p>
            GPS <br />
            Support.
          </p>
          <div className="flex  justify-around">
            <p id="subtitle" className="my-20 text-6xl">
              Lost the bike?
            </p>
            <p id="subtitle" className=" bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 my-20 text-6xl">
              NO WORRIES
            </p>
          </div>
          <p id="subtitle" className="my-20 text-6xl">
            Each bike comes fitted with a gps module to help you (or us) find
            it.
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
