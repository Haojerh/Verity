import { Http } from "../constant/http.method";
import { request } from "../services/request";

export const getConsensusHighlights = async (postID) => {
  try {
    return await request(Http.GET, `/api/consensus/post/${postID}`);
  } catch (error) {
    console.error("Error fetching consensus highlights:", error);
    throw error;
  }
};