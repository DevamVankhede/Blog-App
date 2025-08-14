import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import data from "./Data.json";

interface BlogType {
  username: string;
  title: string;
  date: string;
  blog: string;
}

export default function Card() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    setBlogs(stored ? [...data, ...JSON.parse(stored)] : data);
  }, []);

  const handleDelete = (index: number) => {
    const updated = blogs.filter((_, i) => i !== index);
    setBlogs(updated);
    localStorage.setItem(
      "blogs",
      JSON.stringify(
        updated.filter(
          (b) =>
            !data.some((d) => d.title === b.title && d.username === b.username)
        )
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b, i) => (
          <div
            key={i}
            onClick={() => navigate(`/blog/${i}`)}
            className="bg-gray-800 rounded-xl shadow-lg p-6 hover:scale-105 cursor-pointer transition-transform duration-300 relative flex flex-col justify-between h-64"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-white leading-snug line-clamp-2">
                {b.title}
              </h2>
              <div className="flex gap-2">
                <PencilSquareIcon
                  className="h-6 w-6 text-blue-400 hover:text-blue-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${i}`);
                  }}
                />
                <TrashIcon
                  className="h-6 w-6 text-red-400 hover:text-red-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(i);
                  }}
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm line-clamp-3">{b.blog}</p>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">@{b.username}</p>
              <p className="text-gray-500 text-xs">{b.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
