import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-purple-100 shadow-lg z-50">
      <nav className="flex justify-between">
        <Link
          to="/"
          className="flex-1 flex items-center justify-center gap-2 text-xl font-semibold py-4 hover:bg-purple-200 transition-colors"
        >
          <Icon name="idea" className="w-6 h-6" />
          To-Day
        </Link>
        <Link
          to="/habits"
          className="flex-1 flex items-center justify-center gap-2 text-xl font-semibold py-4 hover:bg-purple-200 transition-colors"
        >
          <Icon name="guitar" className="w-6 h-6" />
          Habits
        </Link>
        <Link
          to="/my-day"
          className="flex-1 flex items-center justify-center gap-2 text-xl font-semibold py-4 hover:bg-purple-200 transition-colors"
        >
          <Icon name="burger" className="w-6 h-6" />
          My-Day
        </Link>
        <Link
          to="/more"
          className="flex-1 flex items-center justify-center gap-2 text-xl font-semibold py-4 hover:bg-purple-200 transition-colors"
        >
          <Icon name="coffee_mug" className="w-6 h-6" />
          More
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
