import Image from 'next/image';
import Trailer from './Trailer';
import { Media } from '@/types/course';

interface HeroProps {
  title: string;
  description: string;
  backgroundImage: string;
  mediaItems: Media[];
}

export default function Hero({ title, description, backgroundImage, mediaItems }: HeroProps) {
  return (
    <div className="relative w-full text-white overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Course Banner"
        fill
        className="object-cover"
        priority
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 lg:px-8 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-3">

            <div className="md:hidden mb-6  overflow-hidden shadow-xl">
            
              <Trailer mediaItems={mediaItems} aspectRatioClassName="aspect-[16/10]" />      
            
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
              {title}
            </h1>
            <div
              className="mt-4 text-base text-neutral-300 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}