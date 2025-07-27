
import Image from 'next/image';

const freeItemsData = [
  {
    title: 'IELTS Course by Munzereen Shahid',
    subtitle: 'Hard Copy',
    imageUrl: 'https://s3.ap-southeast-1.amazonaws.com/cdn.10minuteschool.com/images/skills-book-placeholder.png', 
    linkUrl: '#' 
  },
  {
    title: 'IELTS Smart Course',
    subtitle: 'PDF Version',
    imageUrl: 'https://cdn.10minuteschool.com/images/k-12-courses/ielts_mock_book_sqr.png',
    linkUrl: '#' 
  }
];

export default function FreeItems() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {freeItemsData.map((item, index) => (
        <a 
          key={index} 
          href={item.linkUrl} 
          className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md hover:border-blue-300 transition-all duration-200"
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={64} 
            height={64} 
            className="rounded-md object-cover flex-shrink-0"
          />
          <div className="flex-grow">
            <h4 className="font-semibold text-gray-800">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
  );
}