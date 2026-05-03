import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "../routes/ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user_management" element={<UserManagement />} />
          <Route path="moderator_management" element={<ModeratorManagement />} />
          
          <Route path="explore">
            <Route index element={<Explore />} />
            <Route path=":id" element={<ExploreDetail />} />
          </Route>

          <Route path="topic_management" element={<TopicManagement />} />
          <Route path="post" element={<PostPage />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

// import { createBrowserRouter, Navigate } from "react-router-dom";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Layout from "../components/layout/Layout";
// import Home from "../pages/Home";
// import UserManagement from "../pages/UserManagement";
// import ModeratorManagement from "../pages/ModeratorManagement";
// import Explore from "../pages/Explore";
// import ExploreDetail from "../pages/ExploreDetail";
// import TopicManagement from "../pages/TopicManagement";
// import PostPage from "../pages/PostPage";
// import ProtectedRoute from "../components/auth/ProtectedRoute";

// export const router = createBrowserRouter([
//   // --- PUBLIC ROUTES ---
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   // --- PROTECTED ROUTES ---
//   // Wrapping all Layout-based pages in one guard
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <Layout />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "user_management",
//         element: <UserManagement />,
//       },
//       {
//         path: "moderator_management",
//         element: <ModeratorManagement />,
//       },
//       {
//         path: "explore",
//         children: [
//           {
//             index: true,
//             element: <Explore />,
//           },
//           {
//             path: ":id",
//             element: <ExploreDetail />,
//           },
//         ],
//       },
//       {
//         path: "topic_management",
//         element: <TopicManagement />,
//       },
//       {
//         path: "post",
//         element: <PostPage />,
//       },
//     ],
//   },

//   // Fallback for any unknown URLs
//   {
//     path: "*",
//     element: <Navigate to="/" replace />,
//   },
// ]);