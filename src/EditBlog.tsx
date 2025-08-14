import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "./Data.json";

interface BlogType {
  username: string;
  title: string;
  date: string;
  blog: string;
}

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [form, setForm] = useState<BlogType>({ username: "", title: "", date: "", blog: "" });

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    const allBlogs = stored ? [...data, ...JSON.parse(stored)] : data;
    setBlogs(allBlogs);
    if (id && allBlogs[Number(id)]) setForm(allBlogs[Number(id)]);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...blogs];
    updated[Number(id)] = form;
    localStorage.setItem("blogs", JSON.stringify(updated.slice(data.length))); // store only new blogs
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 rounded bg-gray-700 text-white" />
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full p-2 rounded bg-gray-700 text-white" />
          <input name="date" value={form.date} onChange={handleChange} placeholder="Date" className="w-full p-2 rounded bg-gray-700 text-white" />
          <textarea name="blog" value={form.blog} onChange={handleChange} placeholder="Write blog..." className="w-full p-2 rounded bg-gray-700 text-white h-32" />
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
