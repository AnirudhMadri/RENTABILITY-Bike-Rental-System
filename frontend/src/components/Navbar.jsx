import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/images/usericon.png";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [logIn, setLogIn] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [loginClick, setLoginClick] = useState(false);

  useEffect(() => {
    try {
      const Token = localStorage.getItem("token");
      if (Token) {
        const decoded = jwtDecode(Token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          console.log(decoded);
          setName(decoded.Name);
          setLogIn(true);
        } else {
          localStorage.removeItem("token");
          setLogIn(false);
          setName("");
        }
      } else {
        setLogIn(false);
        setName("");
      }
    } catch (error) {
      console.log({ error: error });
    }
  }, []);

  const buttonLogic = () => {
    if (logIn == false) {
      navigate("/");
    }
  };
  const buttonLogic2 = () => {
    console.log(loginClick);
    setLoginClick(!loginClick);
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 my-3 w-full flex justify-between  m-1 z-20 ">
        <div className="transition delay-10 duration-300 text-black ease-in-out hover:scale-110  mx-3 text-4xl rounded-md">
          <Link className="visited: text-black " to="/home">
            RBY.
          </Link>
        </div>

        <div className="backdrop-blur-sm bg-white/30 rounded-2xl flex items-center justify-around">
          <button className="transition  delay-10 duration-300 ease-in-out hover:scale-110  mx-10 text-xl rounded-md hover:cursor-pointer">
            Bikes
          </button>
          <button className="transition delay-10 duration-300 ease-in-out hover:scale-110  mx-10 text-xl rounded-md hover:cursor-pointer">
            Cars
          </button>
          <button
            onClick={() => {
              if (logIn == true) {
                navigate("/booking");
              } else {
                localStorage.setItem("redirectTo", "/booking");
                navigate("/");
              }
            }}
            className="transition delay-10 duration-300 ease-in-out hover:scale-110  mx-10 text-xl rounded-md hover:cursor-pointer"
          >
            Rent your bike
          </button>
        </div>

        {logIn == false && (
          <button
            onClick={buttonLogic}
            id="subtitle"
            className="px-15 py-4 text-white bg-black transition delay-10 duration-300 ease-in-out hover:scale-102  mr-10 text-xl rounded-xl hover:cursor-pointer "
          >
            Login
          </button>
        )}
        {logIn == true && (
          <button
            id="subtitle"
            onClick={buttonLogic2}
            className="relative px-15 py-4 text-white bg-black transition delay-10 duration-300 ease-in-out hover:scale-102  mr-10 text-xl rounded-xl hover:cursor-pointer "
          >
            Welcome, {name}!
          </button>
        )}
        {loginClick == true && (
          <div className="absolute top-full w-70 flex flex-col right-12 mt-2  border rounded-xl shadow-xl bg-gray-100/30 backdrop-blur-xs border-gray-300 p-4 z-50">
            <button
              id="subtitle"
              onClick={() => {
                localStorage.clear();
                setLogIn(false);
                navigate("/home"); // or use navigate if preferred
              }}
              className="text-2xl mb-3 hover:cursor-pointer hover:scale-102 transition delay-10 duration-300 ease-in-out "
            >
              Logout
            </button>
            <button
              id="subtitle"
              className="text-2xl mt-3 hover:cursor-pointer hover:scale-102 transition delay-10 duration-300 ease-in-out"
            >
              Profile
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
