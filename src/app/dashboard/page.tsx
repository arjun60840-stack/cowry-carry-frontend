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