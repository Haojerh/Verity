import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/createPost/PostForm";
import { request } from "../services/request";
import { Http } from "../constant/http.method";
import { useToast } from "../context/ToastContext";

export default function CreatePost() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

   const { showToast } = useToast();

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

  const handleCreatePost = async (data) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('topicID', data.topicID);
    formData.append('proLabel', data.proLabel || "Pro");
    formData.append('conLabel', data.conLabel || "Con");

    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const res = await request(Http.POST, "/api/posts", formData);
      console.log(res);
      navigate(`/post/${res.post.postID}`);
      showToast("Post Created");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PostForm onSubmit={handleCreatePost} topics={topics} />
    </div>
  );
}