interface CtaProps {
    ctaText: string;
    price: number;
}

export default function CTA({ ctaText, price }: CtaProps) {
  return (
    <div className="p-4 border rounded-lg shadow-md text-center space-y-4">
        <p className="text-3xl font-bold">Price: ৳{price}</p>
        <button className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
            {ctaText}
        </button>
    </div>
  )
}