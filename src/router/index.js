import { createBrowserRouter } from "react-router-dom";
import Login from "../Login";
import Layout from "../Layout";

const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout/>
  },
  {
    path: '/login',
    element: <Login />
  },
])

export default router