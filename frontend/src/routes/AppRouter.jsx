import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import UserManagement from "../pages/UserManagement";
import ModeratorManagement from "../pages/ModeratorManagement";
import Explore from "../pages/Explore";
import ExploreDetail from "../pages/ExploreDetail";
import TopicManagement from "../pages/TopicManagement";
import PostPage from "../pages/PostPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  // --- PUBLIC ROUTES ---
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // --- PROTECTED ROUTES ---
  // Wrapping all Layout-based pages in one guard
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user_management",
        element: <UserManagement />,
      },
      {
        path: "moderator_management",
        element: <ModeratorManagement />,
      },
      {
        path: "explore",
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
        path: "topic_management",
        element: <TopicManagement />,
      },
      {
        path: "post",
        element: <PostPage />,
      },
    ],
  },

  // Fallback for any unknown URLs
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//     ],
//   },

//   {
//     path: "/user_management",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <UserManagement />,
//       },
//     ],
//   },

//   {
//     path: "/moderator_management",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <ModeratorManagement />,
//       },
//     ],
//   },

//   {
//     path: "/explore",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Explore />,
//       },
//       {
//         path: ":id",
//         element: <ExploreDetail />,
//       },
//     ],
//   },

//   {
//     path: "/topic_management",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <TopicManagement />,
//       },
//     ],
//   },

//   {
//     path: "/post",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <PostPage />,
//       },
//     ],
//   },

//   {
//     path: "/login",
//     element: <Login />,
//     index: true
//   },

//   {
//     path: "/register",
//     element: <Register />,
//     index: true
//   },
// ]);