import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function OtpLoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const [value, setValue] = useState(0);
  const [otp, setOtp] = useState("");
  const [showForm1, setShowForm1] = useState(true);
  const [otpSent, setOtpSent] = useState(false);

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (codeResponse) => {
      console.log("Token info: ", codeResponse);
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
            },
          }
        );
        const { name, email } = res.data;

        const backendRes = await axios.post(
          "http://localhost:3000/api/google-login",
          { name, email }
        );
        console.log("User info:", res.data);
        //setUser(backendRes.data);
        localStorage.setItem("token", backendRes.data.token);

        const redirectTo = localStorage.getItem("redirectTo");

        if (redirectTo) {
          localStorage.removeItem("redirectTo");
          navigate(redirectTo);
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error fething user info", error);
      }
    },

    onError: (error) => console.log("Login Failed:", error),
  });

  const handleOTPost = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/send-otp", {
        Phone: value,
      });
      console.log("OTP sent: ", response.data);
      setOtpSent(true);
      setTimeout(() => {
        setOtpSent(false);
      }, 8000);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const handleFormDisplay = () => {
    setShowForm1(!showForm1);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/validate-otp",
        {
          Phone: value,
          Otp: otp,
        }
      );
      if (
        response.data.exists == false ||
        (response.data.exists == true &&
          response.data.customer.Name == "" &&
          response.data.customer.Email == "")
      ) {
        navigate("/registration");
      } else {
        const redirectTo = localStorage.getItem("redirectTo");
        if (redirectTo) {
          localStorage.removeItem("redirectTo");
          navigate(redirectTo);
        } else {
          navigate("/home");
        }

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("phone", response.data.customer.Phone);
        localStorage.setItem("name", response.data.customer.Name);
        localStorage.setItem("id", response.data.customer.id);
      }
      console.log("Otp sent to be verified", response.data);
    } catch (error) {
      console.error("Error validating OTP:", error);
    }
  };

  return (
    <div className=" w-[80vw]  mx-auto">
      <div id="title" className=" mt-30 font-bold text-9xl">
        Welcome to<br></br> RENTABILITY.
      </div>
      {showForm1 && (
        <div id="title" className=" my-30 flex items-center justify-center">
          <div className="mx-auto  rounded-xl  w-150 border border-gray-200 shadow-2xl   p-3 ">
            <p
              id="title"
              className="text-center text-2xl  bg-amber-200 p-3 rounded-lg font-bold"
            >
              Enter your number for an OTP.
            </p>
            <form className="w-full mt-3 flex flex-col gap-4">
              <PhoneInput
                id="subsubtitle"
                className="text-2xl focus:outline-none border rounded-md p-4"
                international
                withCountryCallingCode
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />

              <button
                type="button"
                id="subtitle"
                onClick={() => {
                  handleFormDisplay();
                  handleOTPost();
                }}
                className="w-full  outline-none ring-0 active:outline-none  hover:cursor-pointer active:scale-98 transition-transform duration-200 hover:scale-102 font-medium bg-blue-500 mt-3 px-4 py-2 rounded-lg text-white text-lg mx-auto"
              >
                Send OTP
              </button>

              <p id="title" className="my-3 text-sm text-center">
                Or
              </p>

              <button
                id="subtitle"
                type="button"
                onClick={googleLogin}
                className="px-4 py-2 border flex items-center justify-center  gap-2 border-slate-200  rounded-lg     hover:scale-102 transition duration-150 hover:cursor-pointer"
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span className="text-gray-500">Login with Google</span>
              </button>
            </form>
          </div>
        </div>
      )}
      {!showForm1 && (
        <div id="title" className="my-30 flex items-center justify-center">
          <div className=" mx-auto flex justify-center flex-col items-center  rounded-xl  w-auto border border-gray-200 shadow-2xl   p-3 ">
            <p className="text-center w-full text-2xl  bg-amber-200 rounded-lg p-3 font-bold">
              Enter OTP sent to
            </p>
            <p className="text-2xl text-amber-300 my-3 font-bold">{value}</p>
            <form id="subtitle" className="w-full my-3 flex flex-col gap-4">
              <div className="mx-auto">
                <OtpInput
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  numInputs={6}
                  isInputNum={true}
                  shouldAutoFocus
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0.5rem",
                    fontSize: "1.5rem",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    textAlign: "center",
                  }}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>

              <div className="flex items-center justify-center">
                <p className="mx-3">Didnt get the OTP?</p>
                <button
                  onClick={handleOTPost}
                  type="button"
                  className="mx-3 text-blue-500 hover:cursor-pointer"
                >
                  Resend
                </button>
                {otpSent && (
                  <p
                    id="subtitle"
                    className=" mx-3 text-sm text-green-500 text-center"
                  >
                    OTP is sent!
                  </p>
                )}
              </div>
              <div className="flex justify-around items-center">
                <button
                  onClick={handleLogin}
                  type="button"
                  disabled={otp.length !== 6}
                  className={`w-50 mx-3 outline-none ring-0 active:outline-none  transition-transform duration-200 font-medium px-4 py-2 rounded-lg text-black text-lg my-3 ${
                    otp.length === 6
                      ? "bg-amber-200 hover:scale-102 active:scale-98 hover:cursor-pointer"
                      : "bg-gray-300 "
                  }`}
                >
                  Submit
                </button>
                <button
                  onClick={handleFormDisplay}
                  className="w-50 mx-3 outline-none ring-0 active:outline-none  hover:cursor-pointer active:scale-98 transition-transform duration-200 hover:scale-102 font-medium bg-amber-50 border border-amber-300 my-3 px-4 py-2 rounded-lg text-black text-lg "
                >
                  Change No.
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
