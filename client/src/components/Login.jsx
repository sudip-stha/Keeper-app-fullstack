import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToggleContext } from "./ToggleContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setHideBtn } = useContext(ToggleContext);
  const apiBase = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBase}/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      if (response.data.message === "Login successful") {
        navigate("/content");
        setHideBtn(true);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login Failed..");
    }
  };

  return (
    <div className="bg-cyan-300 w-1/6 h-80 m-auto mt-20 p-5 rounded-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
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
        <div>
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

        <button
          type="submit"
          className="text-lg bg-blue-800 text-white w-28 p-2 rounded-3xl cursor-pointer shadow-lg hover:bg-blue-800/10 hover:text-black"
        >
          Login
        </button>
      </form>
      <p className="text-xs mt-11 font-semibold">
        If you don't have an account,
        <Link to="/register" className="text-blue-800 underline ">
          click here.
        </Link>{" "}
      </p>
    </div>
  );
};

export default Login;
