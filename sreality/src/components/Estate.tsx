const IMAGE_WIDTH = 400
const IMAGE_HEIGHT = 300
import { replaceSizePlaceholders } from '@/utils/replaceSizePlaceholders';
import { formatPrice } from '@/utils/formatPrice';
import { useTheme } from '@/contexts/ThemeContext';

const Estate = ({ estate } : { estate: any }) => {
    const imageUrl = replaceSizePlaceholders(estate._links.dynamicDown[0].href, IMAGE_WIDTH, IMAGE_HEIGHT);
    const { theme } = useTheme();
    
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800 shadow-gray-900/50 hover:shadow-gray-900/70' : 'bg-sky-200    shadow-lg hover:shadow-2xl'} rounded-2xl overflow-hidden flex flex-col transition-all hover:scale-105 duration-300`}>
            <div className="relative w-full aspect-[4/3]">
                <img
                    src={imageUrl}
                    alt={imageUrl}
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        borderRadius: "inherit"
                    }}
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} truncate`} title={estate.name}>{estate.name}</h1>
                <div className={`flex flex-col gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-lg font-medium">{estate.locality}</span>
                    <span className="text-lg">{formatPrice(estate.price)} Kč</span>
                </div>
                <div className="flex flex-col flex-1 justify-end">
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-sm line-clamp-3`}>{estate.description}</p>
                    <div className="mt-2">
                        <a
                            href={`/${estate.hash_id}`}
                            className={`inline-block ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-center rounded-lg px-4 py-2 font-semibold transition w-full`}
                            target="_blank"
                        >
                            Detail nabídky
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Estate