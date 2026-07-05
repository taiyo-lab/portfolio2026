"use client";

import React, { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl?: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<any>({
    title: "",
    content: "",
    category: "tech",
    date: "",
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      fetchPosts();
    } else {
      alert("認証失敗");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((t: string) => t.trim()) : [],
    };
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setShowCreate(false);
      setForm({ title: "", content: "", category: "tech", date: "" });
      fetchPosts();
    } else {
      const err = await res.json();
      alert(err?.error || "作成に失敗しました");
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("削除してよいですか？")) return;
    const res = await fetch("/api/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchPosts();
    else {
      const err = await res.json();
      alert(err?.error || "削除に失敗しました");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl mb-4">管理画面</h1>
      {!authed ? (
        <form onSubmit={login} className="space-y-2">
          <label>
            パスワード
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-2"
            />
          </label>
          <div>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              ログイン
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={() => setShowCreate((s) => !s)}
                className="px-3 py-1 bg-green-600 text-white rounded mr-2"
              >
                New Post
              </button>
              <button
                onClick={logout}
                className="px-3 py-1 bg-gray-600 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>

          {showCreate && (
            <form onSubmit={createPost} className="space-y-2 mb-4">
              <input
                placeholder="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border"
              />
              <input
                placeholder="excerpt"
                value={form.excerpt || ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full p-2 border"
              />
              <textarea
                placeholder="content"
                value={form.content || ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full p-2 border"
              />
              <input
                placeholder="category"
                value={form.category || "tech"}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-2 border"
              />
              <input
                placeholder="date (YYYY-MM-DD)"
                value={form.date || ""}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-2 border"
              />
              <input
                placeholder="tags (comma separated)"
                value={form.tags || ""}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full p-2 border"
              />
              <div>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  作成
                </button>
              </div>
            </form>
          )}

          <div>
            {loading ? (
              <div>読み込み中...</div>
            ) : (
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">タイトル</th>
                    <th className="border px-2 py-1">日付</th>
                    <th className="border px-2 py-1">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id}>
                      <td className="border px-2 py-1">{p.title}</td>
                      <td className="border px-2 py-1">{p.date}</td>
                      <td className="border px-2 py-1">
                        <button
                          onClick={() => deletePost(p.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded"
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
