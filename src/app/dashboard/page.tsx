'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Package, PlaneTakeoff, MapPin, Search } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('send'); // 'send' or 'carry'

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Mock data to show the user what it will look like
  const mockTrips = [
    { id: 1, traveler: 'Alice S.', origin: 'New York, USA', dest: 'London, UK', date: 'Oct 15', capacity: '5 kg' },
    { id: 2, traveler: 'David M.', origin: 'Lagos, Nigeria', dest: 'Accra, Ghana', date: 'Oct 18', capacity: '12 kg' },
  ];

  const mockPackages = [
    { id: 1, sender: 'John D.', origin: 'Paris, France', dest: 'Berlin, Germany', item: 'Documents', reward: '$50' },
    { id: 2, sender: 'Sarah K.', origin: 'Nairobi, Kenya', dest: 'Dubai, UAE', item: 'Electronics', reward: '$120' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">Logistics Dashboard</h1>
          <div className="flex gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-lg flex items-center gap-2">
              <Package className="w-4 h-4" /> Post Package
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-lg flex items-center gap-2">
              <PlaneTakeoff className="w-4 h-4" /> Post Trip
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-8">
          <button 
            className={`py-4 px-6 font-medium text-sm transition-colors ${activeTab === 'send' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('send')}
          >
            Find Travelers (Send Package)
          </button>
          <button 
            className={`py-4 px-6 font-medium text-sm transition-colors ${activeTab === 'carry' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('carry')}
          >
            Find Packages (Earn Money)
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl">
          {activeTab === 'send' && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><PlaneTakeoff className="text-indigo-400"/> Upcoming Trips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTrips.map(trip => (
                  <div key={trip.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-indigo-500 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-lg">{trip.traveler}</span>
                      <span className="bg-indigo-900 text-indigo-300 text-xs px-2 py-1 rounded-full">{trip.capacity} available</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mb-1 gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> {trip.origin} <span className="text-gray-500">→</span> {trip.dest}
                    </div>
                    <div className="text-sm text-gray-400 mt-3">
                      Departing: <span className="text-white">{trip.date}</span>
                    </div>
                    <button className="mt-4 w-full bg-gray-600 hover:bg-indigo-600 transition-colors py-2 rounded text-sm font-medium">Request Delivery</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'carry' && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Package className="text-emerald-400"/> Packages Needing Delivery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPackages.map(pkg => (
                  <div key={pkg.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-emerald-500 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-lg">{pkg.item}</span>
                      <span className="bg-emerald-900 text-emerald-300 text-sm px-2 py-1 rounded font-bold">{pkg.reward}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mb-1 gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> {pkg.origin} <span className="text-gray-500">→</span> {pkg.dest}
                    </div>
                    <div className="text-sm text-gray-400 mt-3">
                      Sender: <span className="text-white">{pkg.sender}</span>
                    </div>
                    <button className="mt-4 w-full bg-gray-600 hover:bg-emerald-600 transition-colors py-2 rounded text-sm font-medium">Make an Offer</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}