import { GroupJoinEngagementItem } from '@/types/course';
import Image from 'next/image';

interface GroupJoinEngagementProps {
  items: GroupJoinEngagementItem[];
}

export default function GroupJoinEngagement({ items }: GroupJoinEngagementProps) {
  if (!items || items.length === 0) {
    return null;
  }
  const item = items[0];

  const formattedTitle = item.title.replace('(Guideline)', '<br/>(Guideline)');

  return (
    <div
      key={item.id}
      className="relative rounded-2xl shadow-xl overflow-hidden"
    >

      <Image
        src={item.background.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-8">

        <div className="md:col-span-1 flex flex-col justify-center space-y-4 text-center md:text-left">

          <div className="flex items-center gap-x-3 justify-center md:justify-start">
            <Image
              src={item.top_left_icon_img}
              alt="PDF Icon"
              width={40}
              height={40}
              className="flex-shrink-0"
            />
            <h2 className="text-3xl font-bold">
              <span className="text-amber-400">Free</span>{' '}
              <span className="text-orange-500">PDF</span>
            </h2>
          </div>

          {/* Main Title */}
          <h3
            className="text-xl lg:text-xl font-semibold text-white leading-tight"
            dangerouslySetInnerHTML={{ __html: formattedTitle }}
          />

          {/* Description */}
          <p className="text-base text-indigo-200 opacity-90">
            {item.description}
          </p>

          {/* CTA Button */}
          {item.cta.text && item.cta.clicked_url && (
            <div className="pt-4">
              <a
                href={item.cta.clicked_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block select-none 
                           bg-[#1CAB55] text-white font-normal text-sm sm:text-base 
                           py-1.5 sm:py-2 px-8 rounded-md
                           border-b-4 border-black/30 
                           transition-all duration-150 ease-in-out
                           hover:bg-[#178c47] 
                           active:translate-y-0.5 active:border-b-2"
              >
                {item.cta.text}
              </a>
            </div>
          )}
        </div>

        {/* --- Right Column: Thumbnail Image --- */}
        <div className="md:col-span-1 flex justify-center items-center">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={500}
            height={300}
            className="shadow-2xl w-full h-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
}