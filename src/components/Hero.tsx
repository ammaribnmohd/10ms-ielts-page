import Image from 'next/image';

interface HeroProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function Hero({ title, description, backgroundImage }: HeroProps) {
  return (
    <div className="relative w-full text-white overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Course Banner"
        fill
        className="object-cover"
        priority
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" 
        aria-hidden="true" 
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              {title}
            </h1>
            <div 
              className="mt-4 text-lg text-neutral-400 prose prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: description }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}