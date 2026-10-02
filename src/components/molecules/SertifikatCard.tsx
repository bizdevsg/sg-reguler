import React, { useState } from 'react';
import Image from 'next/image';

interface SertifikatCardProps {
  image: string;
  title: string;
}

export default function SertifikatCard({ image, title }: SertifikatCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Card */}
      <div 
        className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={openModal}
        data-aos="fade-up"
      >
        <div className="relative w-full h-64 bg-gray-900/50 rounded-lg overflow-hidden mb-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-3">
            {title}
          </h3>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-11/12 max-w-sm sm:max-w-6xl max-h-[70vh] sm:max-h-[90vh] bg-neutral-800 rounded-lg overflow-hidden mx-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-neutral-900/90 hover:bg-neutral-900 text-white rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full h-[40vh] sm:h-[70vh] max-h-[300px] sm:max-h-[600px] bg-gray-900/50">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            
            {/* Title */}
            <div className="p-4 text-center border-t border-neutral-700">
              <h3 className="text-sm font-semibold text-white line-clamp-2">
                {title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
