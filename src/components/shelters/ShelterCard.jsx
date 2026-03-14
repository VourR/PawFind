import { MapPin, Phone, Building2 } from 'lucide-react';

export default function ShelterCard({ shelter, onNavigate }) {
  const handleClick = () => {
    onNavigate('shelterDetail', shelter.id);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Shelter Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100">
        {shelter.image_url ? (
          <img
            src={shelter.image_url}
            alt={shelter.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 size={64} className="text-green-300" />
          </div>
        )}
      </div>

      {/* Shelter Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">
          {shelter.name}
        </h3>
        
        <div className="space-y-2 mb-4">
          {shelter.city && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span className="line-clamp-1">{shelter.city}</span>
            </div>
          )}

          {shelter.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-2 flex-shrink-0" />
              <span>{shelter.phone}</span>
            </div>
          )}
        </div>

        <button 
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Lihat Shelter
        </button>
      </div>
    </div>
  );
}
