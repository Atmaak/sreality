"use client"

import { useParams } from 'next/navigation'
import useFetch from '@/hooks/useFetch';
import ImageGalery from '../../components/ImageGalery';
import { useState, useEffect } from 'react';

const page = () => {
    const { hash } = useParams()
    const { data, isLoading, err } : { data: any, isLoading: boolean, err: any } = useFetch(`https://www.sreality.cz/api/cs/v2/estates/${hash}`)
    const [images, setImages] = useState<string[]>([])
    const isObject = data && typeof data === "object" && !Array.isArray(data)
    
    useEffect(() => {
        if(isObject){
            let imgs = images
            data?._embedded.images.map((item: any) => {
                imgs = [...imgs, item._links.dynamicDown.href]
            })
            setImages(imgs)
        }
    }, [isObject])

    console.log(images)

    console.log(data)
    return (
        <>
            {isObject && (
                <div>
                    <ImageGalery images={images} />
                    <h1>{(data as any).name?.value}</h1>
                </div>
            )}
        </>
    )
}

export default page