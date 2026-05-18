// src/pages/PetListPage.jsx
import { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import { petsAPI, adoptedPetsAPI } from '../services/api';
import PetCard from '../components/pets/PetCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function PetListPage({ onNavigate }) {
  const [pets, setPets] = useState([]);
  const [adoptedPetIds, setAdoptedPetIds] = useState(new Set());
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
        // Check adoption status for all pets
        await checkAdoptionStatus(response.data);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAdoptionStatus = async (petsList) => {
    const adopted = new Set();
    try {
      const adoptionChecks = await Promise.all(
        petsList.map(pet =>
          adoptedPetsAPI.checkIfAdopted(pet.id)
            .then(result => ({
              petId: pet.id,
              isAdopted: result.is_adopted ?? result.isAdopted ?? false
            }))
            .catch(() => ({ petId: pet.id, isAdopted: false }))
        )
      );
      
      adoptionChecks.forEach(result => {
        if (result.isAdopted) {
          adopted.add(result.petId);
        }
      });
      setAdoptedPetIds(adopted);
    } catch (error) {
      console.error('Error checking adoption status:', error);
    }
  };

  const availablePets = pets.filter(pet => !adoptedPetIds.has(pet.id));
  const adoptedPets = pets.filter(pet => adoptedPetIds.has(pet.id));

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
        {loading ? (
          <LoadingSpinner />
        ) : pets.length > 0 ? (
          <>
            {/* Available Pets Section */}
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Hewan Tersedia untuk Diadopsi
                </h2>
                <p className="text-gray-600">
                  Menampilkan <span className="font-semibold text-gray-800">{availablePets.length}</span> hewan
                </p>
              </div>

              {availablePets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {availablePets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} onNavigate={onNavigate} showDescription={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <PawPrint size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">
                    Semua hewan telah diadopsi
                  </p>
                </div>
              )}
            </section>

            {/* Adopted Pets Section */}
            {adoptedPets.length > 0 && (
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Hewan yang Telah Diadopsi
                  </h2>
                  <p className="text-gray-600">
                    Menampilkan <span className="font-semibold text-gray-800">{adoptedPets.length}</span> hewan
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {adoptedPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} onNavigate={onNavigate} showDescription={false} />
                  ))}
                </div>
              </section>
            )}
          </>
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
