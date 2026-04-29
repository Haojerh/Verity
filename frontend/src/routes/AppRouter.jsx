import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import UserManagement from "../pages/UserManagement";
import ModeratorManagement from "../pages/ModeratorManagement";
import Explore from "../pages/Explore";
import ExploreDetail from "../pages/ExploreDetail";
import TopicManagement from "../pages/TopicManagement";
import TopicPage from "../pages/TopicPage";

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

  {
    path: "/explore",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Explore />,
      },
      {
        path: ":id",
        element: <ExploreDetail />,
      },
    ],
  },

  {
    path: "/topic_management",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TopicManagement />,
      },
    ],
  },

  {
    path: "/topic",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TopicPage />,
      },
    ],
  },
]);
