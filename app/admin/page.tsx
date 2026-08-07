"use client";

import React, { useEffect, useState } from "react";
import { BlogPost } from "../../components/ui/BlogCard";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

type PostFormState = {
  title: string;
  excerpt: string;
  content: string;
  category: BlogPost["category"];
  date: string;
  tags: string;
};

const emptyForm: PostFormState = {
  title: "",
  excerpt: "",
  content: "",
  category: "tech",
  date: "",
  tags: "",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<PostFormState>(emptyForm);
  const [syncing, setSyncing] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
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
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [],
    };
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setShowCreate(false);
      setForm(emptyForm);
      fetchPosts();
    } else {
      const err = await res.json();
      alert(err?.error || "作成に失敗しました");
    }
  };

  const syncFromNotion = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/notion-sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        alert(
          `Notion同期が完了しました (新規: ${data.created}件 / 更新: ${data.updated}件)`,
        );
        fetchPosts();
      } else {
        alert(data?.error || "Notion同期に失敗しました");
      }
    } catch {
      alert("Notion同期に失敗しました");
    } finally {
      setSyncing(false);
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
        <form onSubmit={login} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">パスワード</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">ログイン</Button>
        </form>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Button onClick={() => setShowCreate((s) => !s)}>
                New Post
              </Button>
              <Button variant="outline" onClick={syncFromNotion} disabled={syncing}>
                {syncing ? "同期中..." : "Notionから同期"}
              </Button>
              <Button variant="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>

          {showCreate && (
            <form onSubmit={createPost} className="space-y-3 mb-6">
              <div className="space-y-2">
                <Label htmlFor="post-title">タイトル</Label>
                <Input
                  id="post-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-excerpt">抜粋</Label>
                <Input
                  id="post-excerpt"
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-content">本文</Label>
                <Textarea
                  id="post-content"
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-category">カテゴリー</Label>
                <Input
                  id="post-category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as BlogPost["category"],
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-date">日付 (YYYY-MM-DD)</Label>
                <Input
                  id="post-date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-tags">タグ (カンマ区切り)</Label>
                <Input
                  id="post-tags"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>
              <Button type="submit">作成</Button>
            </form>
          )}

          {loading ? (
            <div>読み込み中...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>タイトル</TableHead>
                  <TableHead>日付</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{p.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deletePost(p.id)}
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}
