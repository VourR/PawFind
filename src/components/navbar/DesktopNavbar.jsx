// src/components/DesktopNavbar.jsx
import logoUrl from '../../assets/LOGORN.png';

export default function DesktopNavbar({ currentPage, onNavigate, isVisible = true }) {
  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'pets', label: 'Adopsi' },
    { id: 'shelters', label: 'Daftar Shelter' },
    { id: 'about', label: 'Kontak Kami' }
  ];

  return (
    <nav
      className={`hidden md:block sticky top-3 z-50 px-4 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl border border-[#6cb1c9]/35 bg-[#f0f0f0]/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(108,177,201,0.25)]">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <img
                src={logoUrl}
                alt="PawFind Logo"
                className="w-12 h-12 object-contain filter drop-shadow-md transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h1 className="brand-title text-3xl font-extrabold bg-gradient-to-r from-[#6cb1c9] via-[#8fc5d8] to-[#6cb1c9] bg-clip-text text-transparent">
              PawFind
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2.5 text-base font-semibold rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-[#6cb1c9] text-white shadow-md shadow-[#6cb1c9]/40'
                    : 'text-[#4e7f90] hover:bg-[#6cb1c9]/15 hover:text-[#6cb1c9]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
         
        </div>
      </div>
    </nav>
  );
}