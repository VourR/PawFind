// src/components/MobileNavbar.jsx
import { Home, PawPrint, Building2, Info } from 'lucide-react';

export default function MobileNavbar({ currentPage, onNavigate, isVisible = true }) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'pets', label: 'Adopsi', icon: PawPrint },
    { id: 'shelters', label: 'Shelter', icon: Building2 },
    { id: 'about', label: 'Kontak', icon: Info }
  ];

  return (
    <nav
      className={`md:hidden fixed bottom-3 left-0 right-0 px-4 z-50 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-center gap-2 max-w-sm mx-auto px-1 py-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                isActive
                  ? 'bg-[#6cb1c9] text-white shadow-md shadow-[#6cb1c9]/40'
                  : 'bg-[#f0f0f0]/90 text-[#4e7f90] hover:bg-[#6cb1c9]/15'
              }`}
            >
              <IconComponent 
                size={20} 
                className="mb-1"
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className="text-xs font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}