import React, { useState } from "react";
import Image from "next/image";
import { replaceSizePlaceholders } from '@/utils/replaceSizePlaceholders';
import { useTheme } from '@/contexts/ThemeContext';

const ImageGalery = ({ images }: { images: string[] }) => {
    const [current, setCurrent] = useState(0);
    const { theme } = useTheme();

    const goPrev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    const goNext = () => setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : 0));

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="relative flex items-center justify-center w-full h-full">
                <button
                    onClick={goPrev}
                    disabled={images.length <= 1}
                    className="h-8 w-8 items-center justify-center flex cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90 disabled:opacity-50 rounded-full text-gray-900 dark:text-white z-10 shadow"
                    aria-label="Previous image"
                >
                {"<"}
                </button>
                <Image
                    src={replaceSizePlaceholders(images[current])}
                    alt={`Property image ${current + 1} of ${images.length}`}
                    width={400}
                    height={300}
                    className="rounded w-full h-full object-cover"
                    priority={current === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                    onClick={goNext}
                    disabled={images.length <= 1}
                    className="h-8 w-8 items-center justify-center flex cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90 disabled:opacity-50 rounded-full text-gray-900 dark:text-white z-10 shadow"
                    aria-label="Next image"
                >
                {">"}
                </button>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center w-full">
                {current + 1} / {images.length}
            </div>
        </div>
    );
};

export default ImageGalery;