import { ChecklistItem } from '@/types/course';
import Image from 'next/image';

interface ChecklistProps {
  title: string;
  items: ChecklistItem[];
}

export default function Checklist({ title, items }: ChecklistProps) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white">
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <ul className="space-y-4">
           
            {items.map((item) => (
                <li key={item.id} className="flex items-center space-x-3">
                    {/* Use next/image to render the icon from the API */}
                    <Image
                      src={item.icon}
                      alt="" // Alt text is empty for decorative icons
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                    />
                    <span className="text-gray-700">{item.text}</span>
                </li>
            ))}
        </ul>
    </div>
  );
}