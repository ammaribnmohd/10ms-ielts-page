'use client';
import { useState } from 'react';
import { FaqItem } from "@/types/course";

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

interface FaqProps {
    items: FaqItem[];
}

export default function Faq({ items }: FaqProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            {items.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                    <div key={index}>
                        <button
                            onClick={() => handleToggle(index)}
                            className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 "
                            aria-expanded={isOpen}
                        >
                            <span>{item.question}</span>
                            <ChevronDownIcon className={`transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="prose max-w-none px-5 pb-5 text-slate-600" dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </div>
                        </div>
                        {index < items.length - 1 && (<div className="mx-5 border-b border-dashed border-slate-200"></div>)}
                    </div>
                );
            })}
        </div>
    );
}