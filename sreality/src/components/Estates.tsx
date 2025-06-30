"use client"

import React from 'react'
import useFetch from "@/hooks/useFetch"
import Estate from "@/components/Estate"
import { useState, useEffect } from 'react';

const Estates = () => {
    const { data, isLoading, err, fetchData } = useFetch("https://www.sreality.cz/api/cs/v2/estates")
    const [shownData, setShownData] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 20

    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

    useEffect(() => {
        if (isFirstLoad && !isLoading && data && typeof data === "object" && data !== null && !Array.isArray(data)) {
            let x = [...shownData, ...data["_embedded"]?.estates]
            console.log(data)
            console.log(x)
            setShownData(x)
            setIsFirstLoad(false)
        }
    }, [isLoading])

    const totalPages = Math.ceil(shownData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = shownData.slice(startIndex, endIndex)
    
    const fetchMoreItems = async () => {
        console.log(totalPages !== currentPage)
        if(totalPages !== currentPage) return
        
        await fetchData()
        
        if (data && typeof data === "object" && data !== null && !Array.isArray(data)) {
            console.log(data)
            let x = [...shownData, ...data["_embedded"]?.estates]
            console.log(x)
            setShownData(x)
        }
    }

    const handleNextPage = async () => {
        await fetchMoreItems()
        setCurrentPage(currentPage + 1)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <>
            <div className="flex w-full justify-around items-center mt-5">
                <button 
                    className="cursor-pointer p-2 bg-amber-500 rounded-2xl text-black text-xl disabled:bg-gray-300 disabled:cursor-not-allowed" 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {currentPage} of &infin;
                </span>
                <button 
                    className="cursor-pointer p-2 bg-amber-500 rounded-2xl text-black text-xl disabled:bg-gray-300 disabled:cursor-not-allowed" 
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center p-10" >
                {currentItems && currentItems.map((item: any, index: number) => (
                    <Estate key={index} estate={item} />
                ))}
            </div>
        </>
    )
}

export default Estates