import { useEffect, useState } from "react";
import { getUserReputation } from "../services/UserService";

export default function useReputation(userID) {
  const [reputation, setReputation] = useState(0);

  const fetchReputation = async () => {
    if (!userID) return;

    try {
      const res = await getUserReputation(userID);
      setReputation(res.reputation || 0);

    } catch (err) {
      console.error("Failed to fetch reputation:", err);
    }
  };

  useEffect(() => {
    fetchReputation();
  }, [userID]);

  return {reputation};
}
