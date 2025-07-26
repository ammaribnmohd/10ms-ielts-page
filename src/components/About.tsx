// FILE: src/components/About.tsx
'use client'; // This component uses state, so it's a client component
import { useState } from 'react';
import { AboutItem } from "@/types/course";

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

interface AboutProps {
    items: AboutItem[];
}

export default function About({ items }: AboutProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0); // Open first item by default
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            {items.map((item, index) => {
                const isOpen = activeIndex === index;
                const cleanTitle = item.title.replace(/<[^>]*>?/gm, '');
                return (
                    <div key={index}>
                        <button
                            onClick={() => handleToggle(index)}
                            className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 bg-white hover:bg-gray-50"
                            aria-expanded={isOpen}
                        >
                            <span>{cleanTitle}</span>
                            <ChevronDownIcon className={`transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="prose max-w-none px-5 pb-5 text-slate-600" dangerouslySetInnerHTML={{ __html: item.description }} />
                            </div>
                        </div>
                        {index < items.length - 1 && (<div className="mx-5 border-b border-dashed border-slate-200"></div>)}
                    </div>
                );
            })}
        </div>
    );
}