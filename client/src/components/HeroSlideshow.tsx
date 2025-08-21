import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useHeroSlides } from '../hooks/useFirestore';

const HeroSlideshow: React.FC = () => {
  const { t } = useLanguage();
  const { data: heroSlides, loading } = useHeroSlides();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    if (heroSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prevIndex) => 
          (prevIndex + 1) % heroSlides.length
        );
      }, 2800); // 2.8 seconds
      return () => clearInterval(interval);
    }
  }, [heroSlides]);

  // Default slide if no slides are available
  const defaultSlide = {
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080',
    caption: ''
  };

  const currentSlide = heroSlides.length > 0 ? heroSlides[currentSlideIndex] : defaultSlide;

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading && heroSlides.length === 0) {
    return (
      <section id="home" className="relative h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-700">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 slideshow-fade active"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.7), rgba(30, 64, 175, 0.7)), url('${currentSlide.imageUrl}')`
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-in">
          {t.home.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light animate-slide-in">
          {t.home.heroSubtitle}
        </p>
        <button 
          onClick={handleScrollToAbout}
          className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105 animate-slide-in"
        >
          <span>{t.home.learnMore}</span>
          <ArrowRight className="inline ml-2" size={20} />
        </button>
      </div>

      {/* Slideshow Navigation Dots */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`w-3 h-3 rounded-full transition-opacity ${
                index === currentSlideIndex 
                  ? 'bg-white bg-opacity-100' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-100'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlideshow;
