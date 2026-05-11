import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRouter";
import api from "./services/api";

function App() {
  return <RouterProvider router={router} />;
}

export default App;