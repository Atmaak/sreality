"use client"

import React from 'react'
import useFetch from "@/hooks/useFetch"
import Estate from "@/components/Estate"

const Estates = () => {
    const { data, isLoading, err } = useFetch("https://www.sreality.cz/api/cs/v2/estates")

    // Type guard to check if data is an object with _embedded
    const embedded = (data && typeof data === "object" && "_embedded" in data)
        ? (data as { _embedded: any })._embedded
        : undefined

    console.log(embedded?.estates)

    return (
        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-4
                gap-10
                justify-center
                m-10
                "
        >
            {embedded?.estates && embedded.estates.map((item: any, index: number) => (
                <Estate key={index} estate={item} />
            ))} 
        </div>
    )
}

export default Estates