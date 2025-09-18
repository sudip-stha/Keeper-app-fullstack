import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      try {
        const response = await axios.post(
          `${apiBase}/register`,
          {
            username,
            password,
          },
          { "Content-Type": "application/json" }
        );
        navigate("/login");
      } catch (err) {
        console.error(err);
        alert(err.error);
      }
    } else {
      alert("Password and confirm password do not match.");
    }
  };

  return (
    <div className="bg-cyan-300 w-1/4 h-80 m-auto mt-20 p-3 pt-6 rounded-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex items-center gap-15">
          <label htmlFor="name" className="font-bold mr-3">
            Full Name:{" "}
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            required
            className="border-2 p-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-16">
          <label htmlFor="password" className="font-bold mr-3">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter a password"
            required
            className="border-2 p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="font-bold mr-3">
            Confirm Password:
          </label>
          <input
            type="Password"
            name="confirmPassword"
            placeholder="Enter a confirm password"
            required
            className="border-2 p-1"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-lg bg-blue-800 text-white w-32 p-2 rounded-3xl cursor-pointer shadow-lg hover:bg-blue-800/10 hover:text-black"
        >
          Register
        </button>
      </form>
      <p className="text-xs mt-6 font-semibold">
        If you already have an account,{" "}
        <Link to="/login" className="text-blue-800 underline ">
          click here.
        </Link>{" "}
      </p>
    </div>
  );
};

export default Register;
