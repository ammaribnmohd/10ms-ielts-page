'use client';

import { TestimonialItem } from "@/types/course";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from 'react';

// --- SVG Icons ---

const ArrowButtonIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40" className={className}>
      <circle cx="20" cy="20" r="20" fill="#fff" />
      <circle cx="20" cy="20" r="19.5" stroke="#E5E7EB" />
      <path d="M17.5 25l5-5-5-5" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const QuoteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z"/>
    </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 inline-block ml-1 transition-transform ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// --- Testimonial Card Component (Now only handles text) ---
const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = item.testimonial.length > 150; 

    return (
        <div className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[400px] flex flex-col p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex-shrink-0 mb-4 text-rose-500 bg-rose-100 rounded-full w-10 h-10 flex items-center justify-center">
                <QuoteIcon />
            </div>
            
            <div className="flex-grow">
                <div>
                    <p className={`text-gray-700 ${isLongText && !isExpanded ? 'line-clamp-5' : ''}`}>
                        &ldquo;{item.testimonial.trim()}&rdquo;
                    </p>
                    {isLongText && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-green-600 font-semibold mt-2 flex items-center text-sm">
                            {isExpanded ? 'Show less' : 'আরও দেখুন'}
                            <ChevronDownIcon className={isExpanded ? 'rotate-180' : ''} />
                        </button>
                    )}
                </div>
            </div>
            
            <div className="flex items-center mt-auto pt-6">
                <Image src={item.profile_image} alt={item.name} width={48} height={48} className="rounded-full mr-4 object-cover" />
                <div>
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                </div>
            </div>
        </div>
    );
};


// --- Main Component ---
interface TestimonialsProps {
  items: TestimonialItem[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // THIS IS THE FIX: We filter to only include testimonials without a video_url.
  const textOnlyTestimonials = items.filter(item => !item.video_url);

  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const atStart = el.scrollLeft < 10;
      const atEnd = el.scrollWidth - el.scrollLeft - el.clientWidth < 10;
      setIsAtStart(atStart);
      setIsAtEnd(atEnd);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollPosition();
      el.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        el.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [textOnlyTestimonials, checkScrollPosition]); // Depdend on the filtered list

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // If there are no text-only testimonials, render nothing.
  if (textOnlyTestimonials.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 hidden md:block"
          aria-label="Scroll left"
          style={{ opacity: isAtStart ? 0.3 : 1, transition: 'opacity 0.3s' }}
          disabled={isAtStart}
      >
          <ArrowButtonIcon className={`transform rotate-180`} />
      </button>

      <div 
          ref={scrollContainerRef}
          className="flex gap-x-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 -mx-4 px-4"
      >
          {textOnlyTestimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
      </div>

      <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 hidden md:block"
          aria-label="Scroll right"
          style={{ opacity: isAtEnd ? 0.3 : 1, transition: 'opacity 0.3s' }}
          disabled={isAtEnd}
      >
          <ArrowButtonIcon />
      </button>
    </div>
  );
}