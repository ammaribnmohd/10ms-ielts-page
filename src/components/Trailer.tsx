'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Media } from '@/types/course';
interface TrailerProps {
  mediaItems: Media[];
}
// --- SVG Icons for the Gallery ---

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={`w-3 h-3 text-white ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const PlayIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.9" />
    <path d="M54.167 40L33.3337 52.0417L33.3337 27.9583L54.167 40Z" fill="#ef4444" />
  </svg>
);

export default function Trailer({ mediaItems }: TrailerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
    setIsVideoPlaying(false);
  }, [activeIndex]);

  const galleryItems = mediaItems.filter(item =>
    item.name === 'preview_gallery' &&
    (item.thumbnail_url || (item.resource_type === 'image' && item.resource_value))
  );

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setIsVideoPlaying(false);
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  if (galleryItems.length === 0) {
    const firstVideo = mediaItems.find(m => m.resource_type === 'video');
    if (!firstVideo) return <div className="text-center p-4">No media available.</div>;

    return (
      <div className="w-full relative aspect-video overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${firstVideo.resource_value}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    );
  }

  const activeItem = galleryItems[activeIndex];

  return (
    <div className="w-full">
      <div className="relative aspect-video overflow-hidden bg-gray-50 mt-1 ml-1 mr-1" style={{ minHeight: '200px' }}>
        {activeItem.resource_type === 'video' && isVideoPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${activeItem.resource_value}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <>
            <Image
              src={
                activeItem.resource_type === 'video'
                  ? activeItem.thumbnail_url
                  : activeItem.resource_value
              }
              alt={activeItem.resource_type === 'video' ? 'Video thumbnail' : 'Gallery image'}
              className="absolute inset-0 w-full h-full object-cover"
              fill
              onError={(e) => {
                console.error('Image failed to load:', activeItem.resource_type === 'video' ? activeItem.thumbnail_url : activeItem.resource_value);
                e.currentTarget.style.display = 'none';
              }}
            />

            {activeItem.resource_type === 'video' && (
              <button
                onClick={handlePlayVideo}
                className="absolute inset-0 flex items-center justify-center  transition-all duration-300 group z-10"
                aria-label="Play video"
              >
                <div className="transform transition-transform duration-300 group-hover:scale-105">
                  <PlayIcon />
                </div> 
              </button>
            )}
          </>
        )}

        {galleryItems.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 z-10 shadow-md transition hover:scale-105"
              aria-label="Previous slide"
            >
              <ArrowIcon />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 z-10 shadow-md transition hover:scale-105"
              aria-label="Next slide"
            >
              <ArrowIcon className="rotate-180" />
            </button>
          </>
        )}
      </div>

      {galleryItems.length > 1 && (
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2 overflow-x-auto scroll-smooth pb-2 scrollbar-hide">
            {galleryItems.map((item, index) => (
              <button
                key={`${item.resource_value}-${index}`}
                ref={(el) => { thumbnailRefs.current[index] = el; }}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-14 h-10 overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${activeIndex === index
                    ? 'border-green-500 shadow-md'
                    : 'border-transparent hover:border-gray-300' 
                  }`}
              >
                <Image
                  src={
                    item.resource_type === 'image'
                      ? item.resource_value
                      : item.thumbnail_url
                  }
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-red-500/20" />
                )}
                {item.resource_type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.9" />
                      <path d="M16 12L10 8v8l6-4z" fill="#ef4444" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}