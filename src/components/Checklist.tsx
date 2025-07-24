import { ChecklistItem } from '@/types/course';

interface ChecklistProps {
  items: ChecklistItem[];
}

// Simple Check Icon SVG
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export default function Checklist({ items }: ChecklistProps) {
  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-xl font-bold mb-4">What You Get</h3>
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 flex-shrink-0"><CheckIcon /></span>
                    <span>{item.text}</span>
                </li>
            ))}
        </ul>
    </div>
  );
}