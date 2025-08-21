import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Blog = {
  id: string;
  username: string;
  title: string;
  date: string;
  blog: string;
};

const API_URL =
  process.env.REACT_APP_API_URL ;

const Card = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  // ✅ Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (err: any) {
        console.error("Error fetching blogs:", err.message);
      }
    };
    fetchBlogs();
  }, []);

  // ✅ Delete handler with state update
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id)); // remove deleted blog
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((b) => (
        <div
          key={b.id}
          className="bg-gray-800 shadow-lg rounded-xl p-6 text-white hover:scale-105 transition-transform cursor-pointer"
        >
          {/* ✅ Wrap blog info in a clickable div */}
          <div onClick={() => navigate(`/blogs/${b.id}`)}>
            <h2 className="text-xl font-semibold mb-2">{b.title}</h2>
            <p className="text-gray-400 text-sm mb-4">
              by <span className="font-medium">{b.username}</span> on{" "}
              {new Date(b.date).toLocaleDateString()}
            </p>
            <p className="text-gray-300 text-sm mb-4">
              {b.blog.length > 120 ? `${b.blog.slice(0, 120)}...` : b.blog}
            </p>
          </div>

          {/* ✅ Buttons are outside clickable area */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigate(`/edit/${b.id}`)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(b.id)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
