import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegiForm from "../components/RegiForm";
export default function Registration() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <RegiForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
