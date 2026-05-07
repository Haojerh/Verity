import { useState, useEffect } from "react";

export default function useInfinitePostsById(fetchFn, id, PAGE_SIZE = 6) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const loadPosts = async (pageNum) => {
    if (!id || loading || !hasMorePosts) return;

    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    try {
      const res = await fetchFn(id, pageNum, PAGE_SIZE)
      const newPosts = res.posts || [];

      setPosts((prev) =>
        pageNum === 0 ? newPosts : [...prev, ...newPosts]
      );

      if (newPosts.length < PAGE_SIZE) {
        setHasMorePosts(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    setPosts([]);
    setPage(0);
    setHasMorePosts(true);

    loadPosts(0);
  }, [id]);

  useEffect(() => {
    if (page === 0) return;
    loadPosts(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const buffer = 100;

      const current =
        window.innerHeight + document.documentElement.scrollTop;

      const total = document.documentElement.scrollHeight;

      if (total - current <= buffer && !loading && hasMorePosts) {
        setPage((p) => p + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMorePosts]);

  return { posts, loading };
}
