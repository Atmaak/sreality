"use client"

import { useParams } from 'next/navigation'
import useFetch from '@/hooks/useFetch';
import ImageGalery from '../../components/ImageGalery';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation'

const page = () => {
    const { hash } = useParams()
    const { data, isLoading, err } : { data: any, isLoading: boolean, err: any } = useFetch(`https://www.sreality.cz/api/cs/v2/estates/${hash}`)
    const [images, setImages] = useState<string[]>([])
    const [isAvalibleToBeShown, setIsAvalibleToBeShown] = useState<boolean>(true)
    const isObject = data && typeof data === "object" && !Array.isArray(data)

    console.log(data)

    useEffect(() => {
        if(isObject){
            let imgs = images
            data?._embedded?.images?.map((item: any) => {
                imgs = [...imgs, item._links.view.href]
            })
            setImages(imgs)
        }
        if ( isObject && Object.keys(data).length === 1 && data.logged_in === false ) {
            setIsAvalibleToBeShown(false);
        }
    }, [isObject])

    if(!isAvalibleToBeShown) return notFound()

    return (
        <>
            {isObject && isAvalibleToBeShown && !isLoading && (
                <>
                <div className="flex flex-col xl:flex-row m-5 h-3/4">
                    {images.length > 0 && (
                        <div className="flex-1 flex justify-start rounded-2xl h-full">
                            <ImageGalery images={images} />
                        </div>
                    )}
                    <div className="flex-1 flex flex-col p-5 justify-start">
                        <h1 className="text-4xl mb-2">{data.name?.value}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: String(data?.text?.value || "")
                            }}
                        />
                    </div>
                    
                </div>
                <iframe
                    width="100%"
                    height="600"
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${data.map.lat},${data.map.lon}&z=15&output=embed`}>
                </iframe>

                </>
            )}
        </>
    )
}

export default page