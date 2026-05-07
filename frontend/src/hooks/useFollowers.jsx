import { useEffect, useState } from "react";
import { getFollowerCount } from "../services/FollowService";

export default function useFollowers(userID) {
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    if (!userID) return;

    const fetch = async () => {
      const res = await getFollowerCount(userID);
      setFollowers(res);
    };

    fetch();
  }, [userID]);

  return followers;
}
