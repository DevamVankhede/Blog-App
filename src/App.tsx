// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form from "./Form";
import Card from "./Card";
import Blog from "./Blog"; // ✅ Import Blog
import EditBlog from "./EditBlog";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
        {/* Navbar */}
        <nav className="bg-gray-800 shadow-lg">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-indigo-400">My App</h1>
            <div className="flex gap-4">
              <Link
                to="/"
                className="hover:text-indigo-300 transition-colors duration-300"
              >
                + Add Blog
              </Link>
              <Link
                to="/card"
                className="hover:text-indigo-300 transition-colors duration-300"
              >
                👁️ Show All Blogs
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl">
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/card" element={<Card />} />
              <Route path="/blog/:id" element={<Blog />} />{" "}
              <Route path="/edit/:id" element={<EditBlog />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-center p-3 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}
