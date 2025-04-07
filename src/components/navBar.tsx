import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="flex justify-between">
        <Link
          to="/"
          className="flex-1 text-center text-xl font-semibold py-4 hover:bg-gray-200 transition-colors"
        >
          To-Day
        </Link>
        <Link
          to="/habits"
          className="flex-1 text-center text-xl font-semibold py-4 hover:bg-gray-200 transition-colors"
        >
          Habits
        </Link>
        <Link
          to="/my-day"
          className="flex-1 text-center text-xl font-semibold py-4 hover:bg-gray-200 transition-colors"
        >
          My-Day
        </Link>
        <Link
          to="/more"
          className="flex-1 text-center text-xl font-semibold py-4 hover:bg-gray-200 transition-colors"
        >
          More
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
