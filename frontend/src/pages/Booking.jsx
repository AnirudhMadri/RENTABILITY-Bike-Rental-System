import React from "react";
import Navbar from "../components/Navbar";
import BookingForm from "../components/bookingForm";
import Footer from "../components/Footer";
export default function Login() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <BookingForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
