import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/createPost/PostForm";
import { request } from "../services/request";
import { Http } from "../constant/http.method";

export default function CreatePost() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchTopics = async () => {
        try {
        const response = await request(Http.GET, "/api/topics");
        const topicArray = response.topics || [];
        const validTopics = topicArray.filter(t => t.name !== null);
        
        console.log("Valid Topics for UI:", validTopics);
        setTopics(validTopics);
        } catch (err) {
        console.error("Failed to load topics", err);
        }
    };
    fetchTopics();
    }, []);

  const handleCreatePost = async (formData) => {
  const data = new FormData();
  data.append('title', formData.title);
  data.append('description', formData.description);
  data.append('topicID', formData.topicID);
  data.append('proLabel', formData.proLabel || ""); 
  data.append('conLabel', formData.conLabel || "");

  if (formData.image) {
    data.append('image', formData.image); 
  }

  try {
    await axios.post("http://localhost:8080/api/posts", data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    });
    navigate("/");
  } catch (err) {
    console.error("Upload failed", err);
  }
};

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-foreground mb-8">Start a New Discussion</h1>
        <PostForm onSubmit={handleCreatePost} topics={topics} />
      </div>
    </div>
  );
}