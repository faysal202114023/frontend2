import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("Login Success");
        

        // Check if the logged-in user is an admin
        const isAdmin = data.isAdmin || false;

        if (isAdmin) {
          // If admin, navigate to the admin route
          navigate("/admin");
        } else {
          localStorage.setItem("userId",data.userId);
          localStorage.setItem("email",data.email);
          
          // If not admin, navigate to the user route
          navigate("/ticket");
        }
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };


 


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container relative w-screen">
    

      <div className="background-image absolute top-0 left-0 w-full h-full bg-[url('/bg.jpeg')] bg-cover opacity-80"></div>
      <div className="login-form flex flex-col bg-opacity-100 w-[25rem] bg-slate-900 p-8 rounded-xl relative z-10">
        <h2 className="text-2xl text-white pb-12">
          Login to Bangladesh Railway
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="mb-8 p-4 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative mb-8">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="p-4 rounded-md pr-10 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "👁️"}
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
        >
          Login
        </button>
        <div className="pb-5">
          <Link to="/sign-up">
            <p className="text-white">
              Create New Account{" "}
              <span className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
                Create
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
