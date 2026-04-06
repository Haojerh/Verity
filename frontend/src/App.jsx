import { useEffect } from "react";
import api from "./services/api";

function App() {
  useEffect(() => {
    api.get("/test")
      .then(res => {
        console.log("DATA:", res.data);
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  }, []);

  return (
    <h1 className="text-3xl">Open console to see API result</h1>
  );
}

export default App;