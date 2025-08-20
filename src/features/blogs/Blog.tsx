import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface BlogType {
  id: number;
  username: string;
  title: string;
  date: string;
  blog: string;
}

export default function Blog() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid blog id");
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get<BlogType>(
          `http://localhost:8000/api/blogs/${id}`
        );
        setBlog(res.data);
        setError("");
      } catch {
        setError("Blog not found 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return <div className="text-center text-gray-300 mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-400 mt-10">{error}</div>;
  if (!blog)
    return <div className="text-center text-white mt-10">No blog found 😢</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-400 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-400 text-sm mb-2">@{blog.username}</p>
        <p className="text-gray-500 text-xs mb-6">{blog.date}</p>

        {/* Blog content - preserves formatting */}
        <div className="text-lg leading-relaxed text-gray-200 whitespace-pre-wrap break-words">
          {blog.blog}
        </div>
      </div>
    </div>
  );
}
