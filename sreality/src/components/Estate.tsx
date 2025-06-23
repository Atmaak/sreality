const IMAGE_WIDTH = 400
const IMAGE_HEIGHT = 300
import { replaceSizePlaceholders } from '@/utils/replaceSizePlaceholders';


const Estate = ({ estate } : { estate: any }) => {
    const imageUrl = replaceSizePlaceholders(estate._links.dynamicDown[0].href, IMAGE_WIDTH, IMAGE_HEIGHT);

    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-2xl duration-500">
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
                <h1 className="text-2xl font-bold text-gray-800 text-center truncate" title={estate.name}>{estate.name}</h1>
                <div className="flex flex-col gap-1 text-gray-600">
                    <span className="text-lg font-medium">{estate.locality}</span>
                    <span className="text-lg">{estate.price} Kč</span>
                </div>
                <div className="flex flex-col flex-1 justify-end">
                    <p className="text-gray-700 text-sm line-clamp-3">{estate.description}</p>
                    <div className="mt-2">
                        <a
                            href={`/${estate.hash_id}`}
                            className="inline-block bg-sky-500 text-white text-center rounded-lg px-4 py-2 font-semibold hover:bg-sky-600 transition w-full"
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