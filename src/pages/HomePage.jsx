// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Heart, PawPrint, Building2, Users, Target } from 'lucide-react';
import { petsAPI, sheltersAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function HomePage({ onNavigate }) {
  const [stats, setStats] = useState([
    { number: '-', label: 'Hewan Tersedia' },
    { number: '-', label: 'Mitra Shelter' },
    { number: '-', label: 'Pengajuan Pending' },
    { number: '-', label: 'Komunitas Aktif' }
  ]);
  const [loading, setLoading] = useState(true);

  const highlights = [
    {
      icon: PawPrint,
      title: 'Adopsi Bertanggung Jawab',
      description: 'Setiap profil hewan ditampilkan dengan informasi yang jelas untuk membantu keputusan adopsi terbaik.'
    },
    {
      icon: Building2,
      title: 'Shelter Terverifikasi',
      description: 'Kami bekerja sama dengan shelter yang menjaga standar perawatan dan kesejahteraan hewan.'
    },
    {
      icon: Users,
      title: 'Dukungan Komunitas',
      description: 'Calon adopter bisa belajar dari pengalaman komunitas pecinta hewan sebelum mengajukan adopsi.'
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [petsResponse, sheltersResponse] = await Promise.all([
        petsAPI.getAll(),
        sheltersAPI.getAll()
      ]);

      const totalPets = petsResponse.success ? petsResponse.data.length : 0;
      const totalShelters = sheltersResponse.success ? sheltersResponse.data.length : 0;

      setStats([
        { number: `${totalPets}+`, label: 'Hewan Tersedia' },
        { number: `${totalShelters}+`, label: 'Mitra Shelter' },
        { number: '24/7', label: 'Peninjauan Pengajuan' },
        { number: '100%', label: 'Fokus Kesejahteraan' }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 pb-20 md:pb-8">
      {/* Hero Section */}
      <div className="relative mt-3 md:mt-4 overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16 md:py-24">
        <img
          src="/image.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[center_58%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6cb1c9]/52 via-[#6cb1c9]/28 to-[#6cb1c9]/48" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Heart size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              PawFind
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto">
              Platform adopsi hewan yang menghubungkan shelter terpercaya dengan adopter yang siap memberikan rumah terbaik.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-16">
        <section className="text-center">
          <div className="flex justify-center mb-6">
            <Target size={48} className="text-teal-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Misi Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            PawFind hadir untuk membantu hewan-hewan yang membutuhkan rumah menemukan keluarga yang tepat.
            Kami mendorong proses adopsi yang aman, transparan, dan berfokus pada kesejahteraan hewan.
          </p>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Kenapa PawFind?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-teal-100 p-4 rounded-full">
                      <IconComponent size={32} className="text-teal-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Dampak PawFind</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-teal-100 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="text-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Siap Mengadopsi?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Lihat profil hewan dan ajukan adopsi hanya dalam beberapa langkah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('pets')}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Mulai Adopsi
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 font-bold py-4 px-8 rounded-xl transition-all duration-200"
            >
              Kontak Kami
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}