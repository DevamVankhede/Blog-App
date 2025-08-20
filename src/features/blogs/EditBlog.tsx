import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../services/blogServices"; // ✅ API

interface BlogType {
  id: string;
  username: string;
  title: string;
  date: string;
  blog: string;
}

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Always fetch blog from API
  useEffect(() => {
    if (!id) return;

    getBlogById(id)
      .then((res) => setForm(res.data))
      .catch(() => setError("❌ Blog not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !id) return;

    try {
      await updateBlog(id, form);
      alert("✅ Blog updated successfully!");
      navigate("/card");
    } catch {
      setError("⚠️ Failed to update blog. Try again later.");
    }
  };

  if (loading) return <p className="text-white">⏳ Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!form) return null;

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">✏️ Edit Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {/* ❌ Date should not be editable */}
          <input
            value={new Date(form.date).toLocaleDateString()}
            disabled
            className="w-full p-2 rounded bg-gray-600 text-gray-300 cursor-not-allowed"
          />
          <textarea
            name="blog"
            value={form.blog}
            onChange={handleChange}
            placeholder="Write blog..."
            className="w-full p-2 rounded bg-gray-700 text-white h-32"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
