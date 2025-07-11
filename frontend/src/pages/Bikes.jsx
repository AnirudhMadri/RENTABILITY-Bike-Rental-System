import React from "react";
import Navbar from "../components/Navbar";
import BikesPage from "../components/bikesPage";
import Footer from "../components/Footer";
export default function Bikes() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="my-1">
        <BikesPage />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
