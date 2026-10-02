import React, { useState } from 'react';
import Image from 'next/image';

interface VideoCardProps {
  thumbnail?: string;
  title: string;
  date: string;
  description: string;
  videoUrl: string;
  showText?: boolean;
  showMeta?: boolean;
  titleClassName?: string;
}

export default function VideoCard({
  thumbnail,
  title,
  date,
  description,
  videoUrl,
  showText = true,
  showMeta = true,
  titleClassName = "",
}: VideoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('embed/')[1]?.split('?')[0] || url.split('v=')[1]?.split('&')[0] || '';
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (url: string) => {
    const videoId =
      url.split('embed/')[1]?.split('?')[0] ||
      url.split('v=')[1]?.split('&')[0] ||
      '';
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // Use provided thumbnail or generate from YouTube URL
  const thumbnailUrl = thumbnail || getYouTubeThumbnail(videoUrl);

  return (
    <>
      {/* Card */}
      <div 
        className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={openModal}
        data-aos="fade-up"
      >
        {/* Thumbnail Container */}
        <div className="relative w-full h-48 bg-gray-900/50 rounded-lg overflow-hidden mb-4">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback to a local image if the YouTube thumbnail fails
              const target = e.target as HTMLImageElement;
              target.src = '/assets/bg_welcome.png';
            }}
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-white ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        {showText && (
          <div>
            <h3 className={`text-lg font-bold line-clamp-2 mb-2 ${titleClassName || "text-white"}`}>
              {title}
            </h3>
            {showMeta && (
              <>
                <p className="text-sm text-yellow-500 mb-3">
                  <svg className="inline-block w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {date}
                </p>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {description}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-11/12 max-w-4xl max-h-[85vh] bg-neutral-800 rounded-lg overflow-hidden mx-auto my-auto"
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

            {/* Video Container */}
            <div className="relative w-full aspect-video bg-gray-900/50">
              <iframe
                src={getYouTubeEmbedUrl(videoUrl)}
                title={title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            
            {/* Video Info */}
            <div className="p-6 border-t border-neutral-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-yellow-500 mb-3">
                {date}
              </p>
              <p className="text-sm text-gray-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
