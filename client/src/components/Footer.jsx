import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className=" fixed text-center bottom-0 w-full">
      <p className="text-blue-500/40">Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;