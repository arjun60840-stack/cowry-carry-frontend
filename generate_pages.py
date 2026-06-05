import os

base_dir = r"c:\Users\ARJUN\.gemini\antigravity\scratch\cowry-carry-frontend\src\app"
login_dir = os.path.join(base_dir, "login")
register_dir = os.path.join(base_dir, "register")
dashboard_dir = os.path.join(base_dir, "dashboard")

os.makedirs(login_dir, exist_ok=True)
os.makedirs(register_dir, exist_ok=True)
os.makedirs(dashboard_dir, exist_ok=True)

files = {
    os.path.join(base_dir, "page.tsx"): """
import Link from 'next/link';
import { Compass, BookOpen, Camera, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px]" />

      <div className="z-10 text-center max-w-3xl px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Preserve our <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
            Cultural Heritage
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Discover hidden gems, share local myths, and document the architectural wonders of the world through crowdsourced storytelling.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/register" className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-amber-900/20">
            Start Exploring
          </Link>
          <Link href="/sites" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all">
            Browse Sites
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl px-4 z-10">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <BookOpen className="h-8 w-8 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Share Stories</h3>
          <p className="text-gray-400">Document local myths, legends, and historical facts about cultural sites.</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <Camera className="h-8 w-8 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Upload Archives</h3>
          <p className="text-gray-400">Contribute images and visual records to preserve sites digitally forever.</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <Globe className="h-8 w-8 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Global Map</h3>
          <p className="text-gray-400">Explore interactive maps pinning thousands of cultural landmarks worldwide.</p>
        </div>
      </div>
    </div>
  );
}
""",
    os.path.join(login_dir, "page.tsx"): """
"use client";
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      login(data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg mt-6 transition-colors">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account? <Link href="/register" className="text-amber-500 hover:text-amber-400">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
""",
    os.path.join(register_dir, "page.tsx"): """
"use client";
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      login(data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg mt-6 transition-colors">
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account? <Link href="/login" className="text-amber-500 hover:text-amber-400">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
""",
    os.path.join(dashboard_dir, "page.tsx"): """
"use client";
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/apiClient';
import { MapPin, User, Bookmark } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (user) {
      fetchWithAuth('/bookmarks')
        .then(data => setBookmarks(data))
        .catch(console.error);
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-sm flex items-center gap-6">
        <div className="h-24 w-24 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
          <User className="h-10 w-10 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-400 flex items-center gap-2"><MapPin className="h-4 w-4" /> Global Explorer</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bookmark className="h-6 w-6 text-amber-500" /> Saved Bookmarks
      </h2>
      
      {bookmarks.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-gray-400">
          You haven't bookmarked any cultural sites or stories yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map bookmarks here when the backend returns actual populated objects */}
        </div>
      )}
    </div>
  );
}
"""
}

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\\n")

print("Generated Home, Login, Register, and Dashboard pages.")
