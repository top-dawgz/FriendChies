import React, { useEffect } from "react";
import Navbar from "./components/NavBar";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MatchPage from "./pages/MatchPage";
import SwipePage from "./pages/SwipePage";
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home";
import axios from "axios";

const loader = async () => {
  const response = await axios.get("/api/user");
  const user = response.data.userId;
  if (!user) {
    return redirect("/login");
  } else {
    return redirect("/profile");
  }
};

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: loader,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/matches",
        element: <MatchPage />,
      },
      {
        path: "/swipe",
        element: <SwipePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
