import Image from 'next/image';
import Link from 'next/link';

const companyLinks = [
    { name: 'Career / Recruitment', href: '#' },
    { name: 'Join as a Teacher', href: '#' },
    { name: 'Join as an Affiliate', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'Refund policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
];

const otherLinks = [
    { name: 'Blog', href: '#' },
    { name: 'Book Store', href: '#' },
    { name: 'Free Notes & Guides', href: '#' },
    { name: 'Job Preparation Courses', href: '#' },
    { name: 'Verify Certificate', href: '#' },
    { name: 'Free Download', href: '#' },
];

const socialLinks = [
    { name: 'facebook', href: 'https://www.facebook.com/10minuteschool/', src: 'https://cdn.10minuteschool.com/images/facebook_1695730910971.png' },
    { name: 'instagram', href: 'https://www.instagram.com/10ms_insta/', src: 'https://cdn.10minuteschool.com/images/instagram_1695731442397.png' },
    { name: 'linkedin', href: 'https://www.linkedin.com/company/10ms/', src: 'https://cdn.10minuteschool.com/images/linkedin_1695731507042.png' },
    { name: 'youtube', href: 'https://www.youtube.com/channel/UCL89KKkLs0tZKld-iIS3NGw', src: 'https://cdn.10minuteschool.com/images/youtube_1695731538726.png' },
    { name: 'tiktok', href: 'https://www.tiktok.com/@10minuteschool?lang=en', src: 'https://cdn.10minuteschool.com/images/Tiktok_1695731564895.png' },
];

// Reusable component for social icons
const SocialIcons = ({ className = '' }: { className?: string }) => (
    <div className={`flex space-x-4 ${className}`}>
        {socialLinks.map((item) => (
            <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <Image src={item.src} alt={item.name} width={32} height={32} className="hover:opacity-80 transition-opacity" />
            </a>
        ))}
    </div>
);

export default function Footer() {
    return (
        <footer className="bg-gray-50 text-gray-800 pb-28 md:pb-0">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
                        <Image src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg" alt="10 Minute School Logo" width={140} height={35} />
                        <p className="font-semibold text-gray-700">Download Our Mobile App</p>
                        <div className="flex items-center space-x-2">
                            <a href="https://play.google.com/store/apps/details?id=com.a10minuteschool.tenminuteschool" target="_blank" rel="noopener noreferrer">
                                <Image src="https://cdn.10minuteschool.com/images/google-play-icon_1695731678094.png" alt="Get it on Google Play" width={130} height={40} className="hover:opacity-90 transition-opacity" />
                            </a>
                            <a href="https://apps.apple.com/us/app/10-minute-school/id1577061772" target="_blank" rel="noopener noreferrer">
                                <Image src="https://cdn.10minuteschool.com/images/ios-store-icon_1695731704002.png" alt="Download on the App Store" width={130} height={40} className="hover:opacity-90 transition-opacity" />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-gray-900 text-xl">Company</h3>
                            <ul className="mt-4 space-y-3">
                                {companyLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-xl">Others</h3>
                            <ul className="mt-4 space-y-3">
                                {otherLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-2">
                        <h3 className="font-bold text-gray-900 text-xl">Keep up with us at</h3>
                        <div className="mt-4 space-y-2 text-gray-600 text-base font-medium">
                            <p>Call Us: <span className="text-green-600 ">16910</span> (24×7)</p>
                            <p>whatsapp: <span className="text-green-600 ">+8801896016252</span> (24×7)</p>
                            <p>Outside Bangladesh: <span className="text-green-600 ">+880 9610916910</span></p>
                            <p>Email Us: <a href="mailto:support@10minuteschool.com" className="text-green-600  hover:underline">support@10minuteschool.com</a></p>
                        </div>
                        <div className="mt-6">
                            <SocialIcons />
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 lg:border-t-0 text-center">
                    <div className="lg:hidden mb-8">
                        <SocialIcons className="justify-center" />
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-gray-500">
                        2015 - {new Date().getFullYear()} Copyright © 10 Minute School. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}