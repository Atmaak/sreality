import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { replaceSizePlaceholders } from '@/utils/replaceSizePlaceholders';
import { formatPrice } from '@/utils/formatPrice';
import { useTheme } from '@/contexts/ThemeContext';

const IMAGE_WIDTH = 400
const IMAGE_HEIGHT = 300

const Estate = ({ estate } : { estate: any }) => {
    const imageUrl = replaceSizePlaceholders(estate._links.dynamicDown[0].href, IMAGE_WIDTH, IMAGE_HEIGHT);
    const { theme } = useTheme();
    
    return (
            <article className={`${theme === 'dark' ? 'bg-gray-800 shadow-gray-900/50 hover:shadow-gray-900/70' : 'bg-sky-200 shadow-lg hover:shadow-2xl'} rounded-2xl overflow-hidden flex flex-col transition-all hover:scale-105 duration-300`}>
                <div className="relative w-full aspect-[4/3]">
                    <Image
                        src={imageUrl}
                        alt={`${estate.name} - ${estate.locality}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        loading="lazy"
                    />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} truncate`} title={estate.name}>{estate.name}</h2>
                    <div className={`flex flex-col gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="text-lg font-medium">{estate.locality}</span>
                        <span className="text-lg font-semibold">{formatPrice(estate.price)} Kč</span>
                    </div>
                    <div className="flex flex-col flex-1 justify-end">
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-sm line-clamp-3`}>{estate.description}</p>
                        <div className="mt-2">
                            <Link
                                href={`/${estate.hash_id}`}
                                className={`inline-block ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-center rounded-lg px-4 py-2 font-semibold transition w-full`}
                                aria-label={`View details for ${estate.name}`}
                            >
                                Detail nabídky
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
    )
};

export default Estate;