"use client"

import useFetch from "@/hooks/useFetch"
import Estate from "@/components/Estate"
import { useState, useEffect, useRef } from 'react';

const SortingTypes = [
    {
        "text": "Default",
        "value": "default"
    },
    {
        "text": "Price Ascending",
        "value": "PriceAsc"
    },
    {
        "text": "Price Descending",
        "value": "PriceDesc" 
    }
]

const Estates = () => {
    const [allData, setAllData] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sortingType, setSortingType] = useState<string>("default")
    const [currentItems, setCurrentItems] = useState<any[]>([])
    const { data, isLoading, err, fetchData } = useFetch(`https://www.sreality.cz/api/cs/v2/estates?per_page=100&page=${currentPage + 1}`)

    const searchBar = useRef<HTMLInputElement>(null)

    const itemsPerPage = 20
    const totalPages = Math.ceil(allData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

    useEffect(() => {
        if (isFirstLoad && !isLoading && data && typeof data === "object" && data !== null && !Array.isArray(data)) {
            let x = [...allData, ...data["_embedded"]?.estates]
            setAllData(x)
            setIsFirstLoad(false)
        }
    }, [isLoading])

    useEffect(() => {
        setCurrentItems(allData.slice(startIndex, endIndex))
        sortCurrentPageItems(sortingType)
    }, [currentPage])

    useEffect(() => {
        setCurrentItems(allData.slice(startIndex, endIndex))
        sortCurrentPageItems(sortingType)
    }, [isFirstLoad])

    useEffect(() => {
        sortCurrentPageItems(sortingType)
    }, [sortingType])
    
    const fetchMoreItems = async () => {
        if(totalPages !== currentPage) return
        
        await fetchData()
        
        if (data && typeof data === "object" && data !== null && !Array.isArray(data)) {
            console.log(data)
            let x = [...allData, ...data["_embedded"]?.estates]
            console.log(x)
            setAllData(x)
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

    const sortCurrentPageItems = (how: string) => {
        setCurrentItems(prevItems => {
            return [...prevItems].sort((a, b) => {
                const priceA = Number(a.price) || 0;
                const priceB = Number(b.price) || 0;
                switch(how) {
                    case "PriceAsc":
                        return priceA - priceB;
                    case "PriceDesc":
                        return priceB - priceA;
                    default:
                        return 0;
                }
            })
        })
    };

    const handleSearch = () => {
        const searchedTerm = searchBar?.current?.value
        if (!searchedTerm) {
            setCurrentItems(allData.slice(startIndex, endIndex))
            return
        }
        let arr = allData
            .filter(item => item.name && item.name.toLowerCase().includes(searchedTerm.toLowerCase()))
            .slice(startIndex, endIndex)
        setCurrentItems(arr)
        sortCurrentPageItems(sortingType)
    };

    return (
        <main>
            <div className="flex flex-row items-center justify-between mt-5" role="navigation" aria-label="Estate controls">
                <div className="flex justify-around items-center w-1/3">
                    <button 
                        className="cursor-pointer p-2 bg-amber-500 rounded-2xl text-black text-xl disabled:bg-gray-300 disabled:cursor-not-allowed" 
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        aria-label="Go to previous page"
                    >
                        Previous
                    </button>
                    <span className="text-lg" aria-live="polite">
                        Page {currentPage} of &infin;
                    </span>
                    <button 
                        className="cursor-pointer p-2 bg-amber-500 rounded-2xl text-black text-xl disabled:bg-gray-300 disabled:cursor-not-allowed" 
                        onClick={handleNextPage}
                        aria-label="Go to next page"
                    >
                        Next
                    </button>
                </div>
                <div className="flex w-1/3 justify-center items-center">
                    <label htmlFor="sort-select" className="sr-only">Sort estates</label>
                    <select
                        id="sort-select"
                        onChange={(e) => setSortingType(e.target.value)}
                        className="p-2 bg-white dark:bg-sky-200 border border-gray-300 dark:border-gray-600 rounded-lg text-black cursor-pointer"
                        aria-label="Sort estates"
                    >
                        {SortingTypes.map((item, index) => (
                            <option value={item.value} key={index} className="text-black dark:text-black bg-white dark:bg-sky-200">
                                {item.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-1/3 px-5">
                    <label htmlFor="search-input" className="sr-only">Search estates</label>
                    <input 
                        id="search-input"
                        type="search" 
                        placeholder="Search estates..."
                        className="w-7/10 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        onChange={handleSearch}
                        ref={searchBar}
                        aria-label="Search estates"
                    />
                </div>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center p-10" aria-label="Estate listings">
                {currentItems.map((item: any, index: number) => (
                    <Estate key={index} estate={item} />
                ))}
            </section>
        </main>
    )
}

export default Estates