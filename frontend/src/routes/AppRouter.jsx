import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import UserManagement from "../pages/UserManagement";
import ModeratorManagement from "../pages/ModeratorManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  {
    path: "/user_management",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UserManagement />,
      },
    ],
  },

  {
    path: "/moderator_management",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ModeratorManagement />,
      },
    ],
  },
]);