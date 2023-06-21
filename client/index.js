import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MatchPage from './pages/MatchPage';
import SwipePage from './pages/SwipePage';
import "bootstrap/dist/css/bootstrap.min.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/matches',
    element: <MatchPage />,
  },
  {
    path: '/swipe',
    element: <SwipePage />,
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
