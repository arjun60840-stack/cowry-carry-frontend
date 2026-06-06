'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Package, PlaneTakeoff, MapPin } from 'lucide-react';
import { API_BASE, fetchWithAuth } from '@/lib/apiClient';

interface Trip { id: number; travelerName: string; originCity: string; destinationCity: string; departureDate: string; availableWeightCapacityKg: number; status: string; }
interface DeliveryRequest { id: number; senderName: string; pickupLocation: string; dropoffLocation: string; itemDescription: string; weightKg: number; rewardAmount: number; status: string; }

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('send');
  
  const [trips, setTrips] = useState<Trip[]>([]);
  const [packages, setPackages] = useState<DeliveryRequest[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadLogisticsData();
    }
  }, [user]);

  const loadLogisticsData = async () => {
    setIsLoadingData(true);
    try {
      const tripsRes = await fetchWithAuth(`${API_BASE}/logistics/trips`);
      const pkgsRes = await fetchWithAuth(`${API_BASE}/logistics/packages`);
      if (tripsRes.ok) setTrips(await tripsRes.json());
      if (pkgsRes.ok) setPackages(await pkgsRes.json());
    } catch (e) {
      console.error(e);
    }
    setIsLoadingData(false);
  };

  const handlePostTrip = async () => {
    const origin = prompt("Enter origin city:");
    const dest = prompt("Enter destination city:");
    if (!origin || !dest) return;
    
    await fetchWithAuth(`${API_BASE}/logistics/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originCity: origin, destinationCity: dest, availableWeightCapacityKg: 10.0 })
    });
    loadLogisticsData();
  };

  const handlePostPackage = async () => {
    const origin = prompt("Enter pickup location:");
    const dest = prompt("Enter dropoff location:");
    const item = prompt("What are you sending?");
    if (!origin || !dest || !item) return;

    await fetchWithAuth(`${API_BASE}/logistics/packages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickupLocation: origin, dropoffLocation: dest, itemDescription: item, weightKg: 2.0, rewardAmount: 50.0 })
    });
    loadLogisticsData();
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">Logistics Dashboard</h1>
          <div className="flex gap-4">
            <button onClick={handlePostPackage} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
              <Package className="w-4 h-4" /> Post Package
            </button>
            <button onClick={handlePostTrip} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
              <PlaneTakeoff className="w-4 h-4" /> Post Trip
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-800 mb-8">
          <button className={`py-4 px-6 font-medium text-sm transition-colors ${activeTab === 'send' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-gray-200'}`} onClick={() => setActiveTab('send')}>
            Find Travelers (Send Package)
          </button>
          <button className={`py-4 px-6 font-medium text-sm transition-colors ${activeTab === 'carry' ? 'border-b-2 border-emerald-500 text-emerald-400' : 'text-gray-400 hover:text-gray-200'}`} onClick={() => setActiveTab('carry')}>
            Find Packages (Earn Money)
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl">
          {isLoadingData ? (
             <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>
          ) : activeTab === 'send' ? (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><PlaneTakeoff className="text-indigo-400"/> Upcoming Trips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trips.length === 0 ? <p className="text-gray-400">No travelers found.</p> : trips.map(trip => (
                  <div key={trip.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-indigo-500">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-lg">{trip.travelerName}</span>
                      <span className="bg-indigo-900 text-indigo-300 text-xs px-2 py-1 rounded-full">{trip.availableWeightCapacityKg} kg available</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mb-1 gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> {trip.originCity} <span className="text-gray-500">→</span> {trip.destinationCity}
                    </div>
                    <div className="text-sm text-gray-400 mt-3">Departing: <span className="text-white">{trip.departureDate}</span></div>
                    <button className="mt-4 w-full bg-gray-600 hover:bg-indigo-600 transition-colors py-2 rounded text-sm font-medium">Request Delivery</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Package className="text-emerald-400"/> Packages Needing Delivery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.length === 0 ? <p className="text-gray-400">No packages found.</p> : packages.map(pkg => (
                  <div key={pkg.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-emerald-500">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-lg">{pkg.itemDescription}</span>
                      <span className="bg-emerald-900 text-emerald-300 text-sm px-2 py-1 rounded font-bold">${pkg.rewardAmount}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mb-1 gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> {pkg.pickupLocation} <span className="text-gray-500">→</span> {pkg.dropoffLocation}
                    </div>
                    <div className="text-sm text-gray-400 mt-3">Sender: <span className="text-white">{pkg.senderName}</span> | Weight: {pkg.weightKg} kg</div>
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