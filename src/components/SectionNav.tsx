'use client';

import { Section } from '@/types/course';
// Import the necessary React hooks
import { useRef, useState, useEffect, useCallback } from 'react';

interface NavItem {
  id: Section['type']; 
  name: string;
}

interface SectionNavProps {
  items: NavItem[];
}

const ArrowButtonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" fill="none" viewBox="0 0 33 32" className={className}>
    <path
      fill="#000"
      fillOpacity="0.5"
      fillRule="evenodd"
      d="M16.757 32c8.836 0 16-7.163 16-16s-7.164-16-16-16c-8.837 0-16 7.163-16 16s7.163 16 16 16zM15.064 8.893a1 1 0 00-1.415 1.415L19.342 16l-5.693 5.692a1 1 0 001.415 1.415l6.4-6.4a1 1 0 000-1.414l-6.4-6.4z"
      clipRule="evenodd"
    ></path>
  </svg>
);



export default function SectionNav({ items }: SectionNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const atStart = el.scrollLeft < 1;
      const atEnd = el.scrollWidth - el.scrollLeft - el.clientWidth < 1;

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
  }, [items, checkScrollPosition]);


  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-20 z-40 bg-gray-50">
      <div className="relative mx-auto max-w-7xl border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        {/* Left Scroll Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2"
          aria-label="Scroll left"
        >
          <ArrowButtonIcon className={`h-8 w-8 transform rotate-180 transition-opacity duration-200 ${isAtStart ? 'opacity-25' : ''}`} />
        </button>

        {/* Scrollable List Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide py-2"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-4 py-1.5 text-nowrap text-base text-gray-600 "
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2"
          aria-label="Scroll right"
        >
          <ArrowButtonIcon className={`h-8 w-8 transition-opacity duration-200 ${isAtEnd ? 'opacity-25' : ''}`} />
        </button>
      </div>
      <div className="h-2" />
    </div>
  );
}