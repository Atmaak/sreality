"use client"

import useFetch from "@/hooks/useFetch"
import Estate from "@/components/Estate"
import { useState, useEffect, useRef } from 'react';

type SortingType = {
    text: string,
    value: string
}

type Category = {
    category: number,
    text: string
}

const SortingTypes = [
    {
        "text": "Base Sorting",
        "value": "Default"
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

const Categories = [
    {
        category: 0,
        text: "Default Category"
    },
    {
        category: 1,
        text: "Byt"
    },
    {
        category: 2,
        text: "Barák"
    },
    {
        category: 3,
        text: "Pozemek"
    },
    {
        category: 4,
        text: "Nebytelné"
    },
    {
        category: 5,
        text: "Obytné vozy"
    },
]

const Estates = () => {
    const [allData, setAllData] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sortingType, setSortingType] = useState<SortingType>(SortingTypes[0])
    const [currentItems, setCurrentItems] = useState<any[]>([])
    const [category, setCategory] = useState<Category>(Categories[0])
    const [categorizedData, setCategorizedData] = useState<any[]>([])
    const { data, isLoading, err, fetchData } = useFetch(`https://www.sreality.cz/api/cs/v2/estates?per_page=100&page=${currentPage + 1}`) //500 pro lepsi fungovani kayegorii

    const searchBar = useRef<HTMLInputElement>(null)

    const itemsPerPage = 20
    const totalPages = Math.ceil(categorizedData.length / itemsPerPage)
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
        handleCategories()
    }, [allData, category])

    useEffect(() => {
        setCurrentItems(categorizedData.slice(startIndex, endIndex))
        sortCurrentPageItems(sortingType.value)
    }, [currentPage, categorizedData])

    useEffect(() => {
        setCurrentItems(categorizedData.slice(startIndex, endIndex))
        sortCurrentPageItems(sortingType.value)
        handleCategories()
    }, [isFirstLoad])

    useEffect(() => {
        sortCurrentPageItems(sortingType.value)
    }, [sortingType])

    useEffect(() => {
        handleCategories()
        setCurrentPage(1)
    }, [category])
    
    const handleCategories = () => {
        if(category.category === 0) {
            setCategorizedData(allData)
        } else {
            setCategorizedData([...allData].filter(item => item.category === category.category))
        }
    }

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
        sortCurrentPageItems(sortingType.value)
    };

    if (isFirstLoad && isLoading) {
        return <Loader />;
    }

    return (
        <main>
            <div className="flex flex-row items-center justify-between mt-5 wrap-anywhere" role="navigation" aria-label="Estate controls">
                <div className="flex w-1/3 justify-center items-center">
                    <label htmlFor="sort-select" className="sr-only">Sort estates</label>
                    <select
                        id="sort-select"
                        onChange={(e) => setSortingType(JSON.parse(e.target.value))}
                        className="p-2 bg-white dark:bg-sky-200 border border-gray-300 dark:border-gray-600 rounded-lg text-black cursor-pointer"
                        aria-label="Sort estates"
                    >
                        {SortingTypes.map((item, index) => (
                            <option value={JSON.stringify(item)} key={index} className="text-black dark:text-black bg-white dark:bg-sky-200">
                                {item.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex w-1/3 justify-center items-center">
                    <label htmlFor="sort-select" className="sr-only">Sort estates</label>
                    <select
                        id="sort-select"
                        onChange={(e) => setCategory(JSON.parse(e.target.value))}
                        className="p-2 bg-white dark:bg-sky-200 border border-gray-300 dark:border-gray-600 rounded-lg text-black cursor-pointer"
                        aria-label="Sort estates"
                    >
                        {Categories.map((item, index) => (
                            <option value={JSON.stringify(item)} key={index} className="text-black dark:text-black bg-white dark:bg-sky-200">
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
            <div className="flex justify-center w-full"><div className="flex justify-around items-center w-1/2">
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
            </div></div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center p-10" aria-label="Estate listings">
                {isLoading && !isFirstLoad && (
                    <div className="col-span-full flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                    </div>
                )}
                {currentItems.map((item: any, index: number) => (
                    <Estate key={index} estate={item} />
                ))}
            </section>
        </main>
    );
}

const Loader = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
    </div>
);

export default Estates