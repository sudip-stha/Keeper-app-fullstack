import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToggleContext } from "./ToggleContext";

function Header() {
  const { hideBtn, setHideBtn } = useContext(ToggleContext);
  const navigator=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHideBtn(false);
    navigator("/login")
  };

  return (
    <header className="bg-blue-950 h-25 p-6 text-4xl flex justify-between ">
      <h1 className="font-bold text-white">Keeper</h1>
      <div>
        <Link
          to="/register"
          className={`bg-amber-500 font-semibold text-white p-3 pl-6 pr-6 text-lg rounded-3xl shadow-lg ${hideBtn ? "hidden" : ""}`}
        >
          Register
        </Link>
        <Link
          to="/login"
          className={`bg-blue-600 font-semibold text-white p-3 pl-6 pr-6 ml-4 text-lg rounded-3xl shadow-lg ${hideBtn ? "hidden" : ""}`}
        >
          Login
        </Link>
        <button
          onClick={handleLogout}
          className={`bg-blue-600 font-semibold text-white p-3 pl-6 pr-6 ml-4 text-lg rounded-3xl shadow-lg ${hideBtn ? "" : "hidden"}`}
        >
          Log out
        </button>
      </div>
    </header>
  );
}

export default Header;
