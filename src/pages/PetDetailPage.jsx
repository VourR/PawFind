// src/pages/PetDetailPage.jsx
import { useState, useEffect } from 'react';
import { ArrowLeft, PawPrint, Calendar, MapPin, Building2, Heart, X, ZoomIn, CheckCircle, AlertCircle } from 'lucide-react';
import { petsAPI, sheltersAPI, adoptedPetsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function PetDetailPage({ petId, onNavigate }) {
  const [pet, setPet] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [adoptionForm, setAdoptionForm] = useState({
    adopter_name: '',
    adopter_email: '',
    adopter_phone: '',
    message: ''
  });
  const [adoptionLoading, setAdoptionLoading] = useState(false);
  const [adoptionSuccess, setAdoptionSuccess] = useState(false);
  const [adoptionSuccessMessage, setAdoptionSuccessMessage] = useState('');
  const [adoptionError, setAdoptionError] = useState('');
  const [isAdopted, setIsAdopted] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  useEffect(() => {
    if (petId) {
      fetchPetDetails();
    }
  }, [petId]);

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const response = await petsAPI.getById(petId);
      if (response.success) {
        setPet(response.data);
        // Fetch shelter info
        if (response.data.shelter_id) {
          const shelterResponse = await sheltersAPI.getById(response.data.shelter_id);
          if (shelterResponse.success) {
            setShelter(shelterResponse.data);
          }
        }
        // Check if pet is already adopted
        try {
          const adoptionCheck = await adoptedPetsAPI.checkIfAdopted(petId);
          setIsAdopted(adoptionCheck.is_adopted ?? adoptionCheck.isAdopted ?? false);
          setHasPendingRequest(adoptionCheck.has_pending_request ?? adoptionCheck.hasPendingRequest ?? false);
        } catch (error) {
          console.error('Error checking adoption status:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching pet details:', error);
    } finally {
      setLoading(false);
    }
  };

  const openImageModal = () => {
    if (pet?.image_url) {
      setShowImageModal(true);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
        if (showAdoptModal && !adoptionSuccess) {
          closeAdoptModal();
        }
      }
    };
    
    if (showImageModal || showAdoptModal) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [showImageModal, showAdoptModal, adoptionSuccess]);

  const openAdoptModal = () => {
    setShowAdoptModal(true);
    setAdoptionError('');
    setAdoptionSuccess(false);
    setAdoptionSuccessMessage('');
    document.body.style.overflow = 'hidden';
  };

  const closeAdoptModal = () => {
    setShowAdoptModal(false);
    setAdoptionForm({
      adopter_name: '',
      adopter_email: '',
      adopter_phone: '',
      message: ''
    });
    setAdoptionError('');
    setAdoptionSuccess(false);
    setAdoptionSuccessMessage('');
    document.body.style.overflow = 'unset';
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAdoptionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!adoptionForm.adopter_name.trim()) {
      setAdoptionError('Nama wajib diisi');
      return;
    }
    if (!adoptionForm.adopter_email.trim()) {
      setAdoptionError('Email wajib diisi');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(adoptionForm.adopter_email)) {
      setAdoptionError('Format email tidak valid');
      return;
    }
    if (!adoptionForm.adopter_phone.trim()) {
      setAdoptionError('Nomor telepon wajib diisi');
      return;
    }

    try {
      setAdoptionLoading(true);
      setAdoptionError('');

      const adoptionData = {
        pet_id: petId,
        adopter_name: adoptionForm.adopter_name.trim(),
        adopter_email: adoptionForm.adopter_email.trim(),
        adopter_phone: adoptionForm.adopter_phone.trim(),
        message: adoptionForm.message.trim() || undefined
      };

      const response = await adoptedPetsAPI.adopt(adoptionData);

      if (response.message || response.data) {
        setAdoptionSuccess(true);
        setAdoptionSuccessMessage(
          response.message || 'Pengajuan adopsi berhasil dikirim dan sedang menunggu persetujuan admin.'
        );
        // Auto close after 3 seconds
        setTimeout(() => {
          closeAdoptModal();
        }, 3000);
      }
    } catch (error) {
      console.error('Error adopting pet:', error);
      setAdoptionError(error.message || 'Terjadi kesalahan saat mengirim pengajuan adopsi. Silakan coba lagi.');
    } finally {
      setAdoptionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen mt-3 md:mt-4 bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen mt-3 md:mt-4 bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <PawPrint size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Hewan tidak ditemukan</p>
          <button
            onClick={() => onNavigate('pets')}
            className="mt-4 text-teal-600 hover:text-teal-700 font-semibold"
          >
            Kembali ke Daftar Hewan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-3 md:mt-4 bg-gradient-to-br from-teal-50 via-white to-cyan-50 pb-20 md:pb-8">
      {/* Adoption Modal */}
      {showAdoptModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !adoptionSuccess) {
              closeAdoptModal();
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            {!adoptionSuccess && (
              <button
                onClick={closeAdoptModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            )}

            <div className="p-6 md:p-8">
              {adoptionSuccess ? (
                // Success Message
                <div className="text-center py-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={48} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Pengajuan Terkirim
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Pengajuan adopsi untuk <span className="font-semibold text-teal-600">{pet?.name}</span> sudah kami terima.
                  </p>
                  <p className="text-sm text-gray-500">
                    {adoptionSuccessMessage || 'Tim shelter akan meninjau data adopter Anda terlebih dahulu.'}
                  </p>
                </div>
              ) : (
                // Adoption Form
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Heart size={24} className="text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Form Identitas Adopter
                      </h2>
                      <p className="text-sm text-gray-500">Lengkapi data diri untuk mengajukan adopsi {pet?.name}</p>
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-800">
                    Pengajuan akan masuk ke admin shelter terlebih dahulu. Hewan baru dianggap diadopsi setelah request disetujui.
                  </div>

                  {adoptionError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                      <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{adoptionError}</p>
                    </div>
                  )}

                  <form onSubmit={handleAdoptSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="adopter_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="adopter_name"
                        name="adopter_name"
                        value={adoptionForm.adopter_name}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="adopter_email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="adopter_email"
                        name="adopter_email"
                        value={adoptionForm.adopter_email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="nama@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="adopter_phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="adopter_phone"
                        name="adopter_phone"
                        value={adoptionForm.adopter_phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="08123456789"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Pesan untuk Shelter
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={adoptionForm.message}
                        onChange={handleFormChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Ceritakan kesiapan Anda merawat hewan ini (opsional)"
                      />
                    </div>

                    <div className="pt-4 space-y-3">
                      <button
                        type="submit"
                        disabled={adoptionLoading}
                        className={`w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
                          adoptionLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {adoptionLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Memproses...</span>
                          </>
                        ) : (
                          <>
                            <Heart size={20} />
                            <span>Kirim Pengajuan</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={closeAdoptModal}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Modal/Lightbox */}
      {showImageModal && pet?.image_url && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={closeImageModal}
        >
          {/* Close button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* Image container */}
          <div 
            className="relative max-w-7xl max-h-[90vh] p-4 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={pet.image_url}
              alt={pet.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image caption */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full">
              <p className="font-semibold text-lg">{pet.name}</p>
            </div>
          </div>

          {/* Hint text */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
            Klik di luar gambar atau tekan ESC untuk menutup
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <button
            onClick={() => onNavigate('pets')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Kembali</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Pet Image */}
          <div className="relative h-96 bg-gradient-to-br from-teal-100 to-cyan-100 group">
            {pet.image_url ? (
              <>
                <img
                  src={pet.image_url}
                  alt={pet.name}
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={openImageModal}
                />
                {/* Zoom overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center cursor-pointer"
                     onClick={openImageModal}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-4">
                    <ZoomIn size={32} className="text-teal-600" />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PawPrint size={120} className="text-blue-300" />
              </div>
            )}
            {/* Type Badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-bold text-teal-600 capitalize shadow-lg">
              {pet.type}
            </div>
          </div>

          {/* Pet Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {pet.name}
            </h1>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {pet.age && (
                <div className="flex items-start space-x-3">
                  <Calendar className="text-teal-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Umur</p>
                    <p className="text-lg text-gray-800">{pet.age} tahun</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <PawPrint className="text-teal-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Jenis</p>
                  <p className="text-lg text-gray-800 capitalize">{pet.type}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {pet.description && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Deskripsi</h2>
                <p className="text-gray-600 leading-relaxed">
                  {pet.description}
                </p>
              </div>
            )}

            {/* Shelter Info */}
            {shelter && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Building2 className="mr-2 text-green-600" size={24} />
                  Informasi Shelter
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Nama Shelter</p>
                    <p className="text-lg text-gray-800 font-semibold">{shelter.name}</p>
                  </div>
                  {shelter.city && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Lokasi</p>
                        <p className="text-gray-800">{shelter.city}</p>
                        {shelter.address && (
                          <p className="text-gray-600 text-sm">{shelter.address}</p>
                        )}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => onNavigate('shelterDetail', shelter.id)}
                    className="mt-4 text-green-600 hover:text-green-700 font-semibold flex items-center space-x-2"
                  >
                    <span>Detail Shelter</span>
                    <ArrowLeft className="rotate-180" size={16} />
                  </button>
                </div>
              </div>
            )}

            {hasPendingRequest && !isAdopted && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900">
                <p className="font-semibold">Sudah ada pengajuan yang sedang ditinjau</p>
                <p className="mt-1 text-sm text-amber-800">
                  Shelter sedang meninjau pengajuan adopsi lain untuk {pet.name}, tetapi Anda tetap bisa mengirim pengajuan identitas adopter Anda.
                </p>
              </div>
            )}

            {/* Adopt Button */}
            {isAdopted ? (
              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center space-x-2 cursor-not-allowed">
                <CheckCircle size={24} />
                <span className="text-lg">Sudah Diadopsi</span>
              </div>
            ) : (
              <button 
                onClick={openAdoptModal}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Heart size={24} />
                <span className="text-lg">Ajukan Adopsi</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
