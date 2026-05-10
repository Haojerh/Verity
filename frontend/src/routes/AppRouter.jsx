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
import CreatePost from "../pages/CreatePost";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import UserProfile from "../pages/UserProfile";
import ManageReport from "../pages/ManageReport";
import CommentPage from "../pages/CommentPage";
import RecentPage from "../pages/RecentPage";
import PopularPage from "../pages/PopularPage";
import SearchPage from "../pages/SearchPage";
import Rules from "../pages/Rules";
import Policies from "../pages/Policies";
import Analytics from "../pages/Analytics";

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
          <Route path="recent" element={<RecentPage />} />
          <Route path="popular" element={<PopularPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="rules" element={<Rules />} />
          <Route path="policies" element={<Policies />} />
          <Route path="create-post" element={<CreatePost />} />
          
          <Route path="explore">
            <Route index element={<Explore />} />
            <Route path=":id" element={<ExploreDetail />} />
          </Route>

          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="post/:id" element={<PostPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["MODERATOR", "ADMIN"]} />}>
        <Route path="user-management" element={<UserManagement />} />
        <Route path="topic-management" element={<TopicManagement />} />
        <Route path="report-management" element={<ManageReport />} />
        <Route path="/comment/:id" element={<CommentPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="analytics" element={<Analytics />} />
        <Route path="moderator-management" element={<ModeratorManagement />} />
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