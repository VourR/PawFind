// src/pages/PetListPage.jsx
import { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import { petsAPI } from '../services/api';
import PetCard from '../components/pets/PetCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function PetListPage({ onNavigate }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await petsAPI.getAll();
      if (response.success) {
        setPets(response.data);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-3 md:mt-4 bg-gradient-to-br from-teal-50 via-white to-cyan-50 pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <PawPrint size={40} />
            <h1 className="text-3xl md:text-4xl font-bold">
              Adopsi
            </h1>
          </div>
          <p className="text-center text-teal-100 text-lg">
            Temukan hewan kesayangan yang siap Anda adopsi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold text-gray-800">{pets.length}</span> hewan
          </p>
        </div>

        {/* Pets Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onNavigate={onNavigate} showDescription={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <PawPrint size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              Belum ada hewan tersedia
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
