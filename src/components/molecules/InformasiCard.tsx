import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface InformasiCardProps {
  slug: string;
  image: string;
  title: string;
  date: string;
  content: string;
}

export default function InformasiCard({ slug, image, title, date, content }: InformasiCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tentang-kami/umum/informasi/${slug}`);
  };

  return (
    <div 
      className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
      data-aos="fade-up"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-900/50 rounded-lg overflow-hidden mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Read More Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold">
            Baca Selengkapnya
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-sm text-yellow-500 mb-3">
          <svg className="inline-block w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {date}
        </p>
        <p className="text-sm text-gray-300 line-clamp-4">
          {content}
        </p>
      </div>
    </div>
  );
}
