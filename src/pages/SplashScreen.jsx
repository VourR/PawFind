// src/pages/SplashScreen.jsx
import React, { useState, useEffect } from 'react';
import LogoContainer from '../components/splash/LogoContainer';

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Fade in animation
    setTimeout(() => {
      setFadeIn(true);
    }, 100);

    // Auto complete after 2.5 seconds
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (typeof onComplete === 'function') onComplete();
        }, 100);
      }, 600);
    }, 2500);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 transition-all duration-600 ease-out ${
        !fadeIn ? 'opacity-0' : 'opacity-100'
      } ${
        fadeOut ? 'opacity-0' : ''
      }`}
    >
      <LogoContainer />
    </div>
  );
}