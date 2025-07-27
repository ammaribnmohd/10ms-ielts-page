import { FeatureExplanationItem } from "@/types/course";
import Image from "next/image";

interface FeatureExplanationsProps {
  items: FeatureExplanationItem[];
}

const CheckIcon = () => (
    <svg className="h-5 w-5 text-blue-500 flex-shrink-0 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export default function FeatureExplanations({ items }: FeatureExplanationsProps) {
  return (
    <div className="space-y-6 p-6 rounded-lg shadow-md">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index > 0 ? 'border-t border-gray-200 pt-6' : ''}`}
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <ul className="space-y-3">
                {item.checklist.map((check, checkIndex) => (
                    <li key={checkIndex} className="flex items-start">
                        <CheckIcon />
                        <span className="text-gray-700">{check}</span>
                    </li>
                ))}
            </ul>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <Image 
                src={item.file_url} 
                alt={item.title} 
                width={250} 
                height={200} 
                className="rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      ))}
    </div>
  )
}