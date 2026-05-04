import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRouter";
import api from "./services/api";

function App() {
  useEffect(() => {
    // api.get("/test")
    //   .then(res => {
    //     console.log("DATA:", res.data);
    //   })
    //   .catch(err => {
    //     console.error("ERROR:", err);
    //   });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;