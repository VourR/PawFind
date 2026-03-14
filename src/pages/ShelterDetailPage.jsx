// src/pages/ShelterDetailPage.jsx
import { useState, useEffect } from 'react';
import { ArrowLeft, Building2, MapPin, Phone, PawPrint } from 'lucide-react';
import { sheltersAPI, petsAPI } from '../services/api';
import PetCard from '../components/pets/PetCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ShelterDetailPage({ shelterId, onNavigate }) {
  const [shelter, setShelter] = useState(null);
  const [shelterPets, setShelterPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shelterId) {
      fetchShelterDetails();
    }
  }, [shelterId]);

  const fetchShelterDetails = async () => {
    try {
      setLoading(true);
      const response = await sheltersAPI.getById(shelterId);
      if (response.success) {
        setShelter(response.data);
        // Fetch all pets and filter by shelter_id
        const petsResponse = await petsAPI.getAll();
        if (petsResponse.success) {
          const pets = petsResponse.data.filter(pet => pet.shelter_id === shelterId);
          setShelterPets(pets);
        }
      }
    } catch (error) {
      console.error('Error fetching shelter details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen mt-3 md:mt-4 bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!shelter) {
    return (
      <div className="min-h-screen mt-3 md:mt-4 bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Shelter tidak ditemukan</p>
          <button
            onClick={() => onNavigate('shelters')}
            className="mt-4 text-green-600 hover:text-green-700 font-semibold"
          >
            Kembali ke Daftar Shelter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-3 md:mt-4 bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-20 md:pb-8">
      {/* Back Button */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <button
            onClick={() => onNavigate('shelters')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Kembali</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Shelter Image */}
          <div className="relative h-80 bg-gradient-to-br from-green-100 to-emerald-100">
            {shelter.image_url ? (
              <img
                src={shelter.image_url}
                alt={shelter.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 size={120} className="text-green-300" />
              </div>
            )}
          </div>

          {/* Shelter Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {shelter.name}
            </h1>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {shelter.city && (
                <div className="flex items-start space-x-3">
                  <MapPin className="text-green-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Lokasi</p>
                    <p className="text-lg text-gray-800">{shelter.city}</p>
                    {shelter.address && (
                      <p className="text-gray-600 mt-1">{shelter.address}</p>
                    )}
                  </div>
                </div>
              )}

              {shelter.phone && (
                <div className="flex items-start space-x-3">
                  <Phone className="text-green-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Kontak</p>
                    <a 
                      href={`tel:${shelter.phone}`}
                      className="text-lg text-green-600 hover:text-green-700 font-medium"
                    >
                      {shelter.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Pets at this Shelter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <PawPrint size={32} className="text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Hewan di Shelter Ini
            </h2>
          </div>

          {shelterPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shelterPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} onNavigate={onNavigate} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <PawPrint size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                Belum ada hewan di shelter ini
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
