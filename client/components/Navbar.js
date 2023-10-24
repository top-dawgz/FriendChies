import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between flex-wrap bg-gradient-to-r from-indigo-50 to-indigo-100 p-6">
        <NavLink
          to="/profile"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/swipe"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Find Dogs
        </NavLink>
        <NavLink
          to="/matches"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Matches
        </NavLink>
        <button>Log Out</button>
      </div>
      <Outlet />
    </>
  );
}
