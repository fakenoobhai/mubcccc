import React, { useState } from 'react';
import { ArrowRight, Search, Image as ImageIcon, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGalleryImages } from '../hooks/useFirestore';

const GallerySection: React.FC = () => {
  const { t } = useLanguage();
  const { data: galleryImages, loading } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayImages = galleryImages.slice(0, 6); // Show first 6 images

  // Default images for demonstration
  const defaultImages = [
    {
      id: 'default-1',
      imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      alt: 'Cultural Program'
    },
    {
      id: 'default-2',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      alt: 'Graduation Ceremony'
    },
    {
      id: 'default-3',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      alt: 'Sports Day'
    },
    {
      id: 'default-4',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
      alt: 'Library'
    }
  ];

  const imagesToShow = displayImages.length > 0 ? displayImages : defaultImages;

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded w-48 mx-auto mb-4"></div>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-64 bg-slate-300 dark:bg-slate-600 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="gallery" className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              {t.home.ourGallery}
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore moments from our campus life, events, and achievements.
            </p>
          </div>

          {imagesToShow.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto mb-4 text-slate-400" size={48} />
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                {t.noData.gallery}
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imagesToShow.map((image) => (
                  <div 
                    key={image.id} 
                    className="relative group cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => setSelectedImage(image.imageUrl)}
                  >
                    <img 
                      src={image.imageUrl} 
                      alt={image.alt}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Search className="text-white" size={32} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300">
                  <span>{t.home.viewFullGallery}</span>
                  <ArrowRight className="inline ml-2" size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
