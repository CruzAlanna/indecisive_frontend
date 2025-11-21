import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import App from './App'
import About from './AboutPage'
import MenuPage from './Menu/MenuPage'
import RestaurantsPage from './Restaurants/RestaurantsPage'
import QuizPage from './Quiz/QuizPage'
import RandomPage from './RandomSelect/RandomPage'
import CouplesPage from './CouplesQuiz/CouplesPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public Routes
      { index: true, element: <About /> },
      { path: "menu", element: <MenuPage /> },
      { path: "restaurants", element: <RestaurantsPage /> },
      { path: "quiz", element: <QuizPage /> },
      { path: "random", element: <RandomPage /> },
      { path: "partners", element: <CouplesPage /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);