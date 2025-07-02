import React from "react";
import Navbar from "../components/Navbar";
import OtpLoginForm from "../components/OtpLoginForm";
import Footer from "../components/Footer";
export default function Login() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <OtpLoginForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
