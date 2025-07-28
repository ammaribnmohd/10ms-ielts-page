interface CtaProps {
  ctaText: string;
}

const PRICING_DATA = {
  price: 3850,
  originalPrice: 5000,
  discount: 1150,
};

export default function CTA({ ctaText }: CtaProps) {
  return (
    <div className="w-full p-4" id="variant">
      <div className="relative">
        <div>
          <div className="flex flex-col w-full">
            <div>
              <div className="flex items-center justify-between md:flex-col md:items-start">
                <div className="md:mb-3">
                  <div className="inline-block text-2xl font-semibold">৳{PRICING_DATA.price}</div>
                  {PRICING_DATA.originalPrice && (
                    <span className="inline-flex">
                      <del className="ml-2 text-base font-normal md:text-xl">৳{PRICING_DATA.originalPrice}</del>
                      {PRICING_DATA.discount && (
                        <div className="inline-block">
                          <p className="bg-orange-500 text-white px-2 py-1 rounded text-sm ml-2">
                            {PRICING_DATA.discount} ৳ ছাড়
                          </p>
                        </div>
                      )}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2"></div>
            </div>
            <button
              className="w-full text-center flex items-center justify-center flex-wrap"
              style={{
                backgroundColor: 'rgb(28, 171, 85)',
                color: 'rgb(255, 255, 255)',
                borderBottomWidth: '4px',
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '12px 32px',
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '24px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                fontFamily: 'inherit'
              }}
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}