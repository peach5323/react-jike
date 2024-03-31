import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import AuthRoute from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        path: '/home',
        element: <AuthRoute><Home /></AuthRoute>,
      },
      {
        path: '/article',
        element: <AuthRoute><Article /></AuthRoute>,
      },
      {
        path: '/publish',
        element: <AuthRoute><Publish /></AuthRoute>,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])

export default router