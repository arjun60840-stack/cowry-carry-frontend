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