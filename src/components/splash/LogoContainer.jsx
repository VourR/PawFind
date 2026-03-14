// src/components/splash/LogoContainer.jsx
import logoUrl from '../../assets/LOGORN.png';

export default function LogoContainer() {
  return (
    <div className="relative">
      <style>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.15);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.15);
          }
          56% {
            transform: scale(1);
          }
        }
        .heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="w-32 h-32 sm:w-40 md:w-48 sm:h-40 md:h-48 flex items-center justify-center">
        <img 
          src={logoUrl} 
          alt="Logo"
          className="w-full h-full object-contain heartbeat"
        />
      </div>
    </div>
  );
}