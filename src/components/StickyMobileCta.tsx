interface StickyMobileCtaProps {
    show: boolean;
    price: number;
    originalPrice: number;
    discount: number;
    ctaText: string;
}

export default function StickyMobileCta({ show, price, originalPrice, discount, ctaText }: StickyMobileCtaProps) {
    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-white p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 md:hidden transition-transform duration-300 ease-in-out ${show ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className="flex flex-col gap-y-2 max-w-7xl mx-auto">
                {/* Pricing Info */}
                <div className="flex items-center gap-x-2">
                    <span className="text-lg font-semibold text-gray-900">৳{price}</span>
                    <del className="text-sm font-normal text-gray-500">৳{originalPrice}</del>
                    {discount > 0 && (
                        <p className="bg-orange-500 text-white px-2 py-0.5 rounded text-xs">
                            {discount} ৳ ছাড়
                        </p>
                    )}
                </div>

                {/* Enroll Button */}
                <a
                    href="#variant"
                    className="w-full text-center"
                    style={{
                        backgroundColor: 'rgb(28, 171, 85)',
                        color: 'rgb(255, 255, 255)',
                        borderBottomWidth: '4px',
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: '600',
                        lineHeight: '22px',
                    }}
                >
                    {ctaText}
                </a>
            </div>
        </div>
    );
}