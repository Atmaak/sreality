"use client"

import useFetch from "@/hooks/useFetch"
import Estate from "@/components/Estate"
import { useState, useEffect, useRef } from 'react'
import { SortingTypes } from '../constants/sortingTypes';
import { Categories } from '../constants/categories';
import EstateFiltering from './EstateFiltering';
import { Loader } from './Loader';

const Estates = () => {
    const [allData, setAllData] = useState<any[]>([])
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [currentItems, setCurrentItems] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sortingType, setSortingType] = useState<SortingType>(SortingTypes[0])
    const [category, setCategory] = useState<Category>(Categories[0])
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const { data, isLoading, err, fetchData } = useFetch(`https://www.sreality.cz/api/cs/v2/estates?per_page=100&page=${currentPage + 1}`)

    const itemsPerPage = 20
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    useEffect(() => {
        if (isFirstLoad && !isLoading && data && typeof data === "object" && data !== null && !Array.isArray(data)) {
            let arr = [...allData, ...data["_embedded"]?.estates]
            setAllData(arr)
            setCurrentItems(arr.slice(startIndex, endIndex) )
            setIsFirstLoad(false)
        }
    }, [isLoading])
    
    useEffect(()=> {
        setCurrentPage(1)
    }, [sortingType, category, searchTerm])

    useEffect(() => {
        let arr = returnRightData()
        setFilteredData(arr)
        setCurrentItems(arr.slice(startIndex, endIndex))
    }, [currentPage, sortingType, category, searchTerm])

    const returnSearchedData = (data: any[]) => {
        if (!searchTerm) {
            return data
        }
        let arr = data.filter(item => item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return arr
    }

    const returnSortedData = (data: any[]) => {
        if(sortingType.value === "default") return data
        let arr = [...data].sort((a, b) => {
            const priceA = Number(a.price) || 0
            const priceB = Number(b.price) || 0
            switch(sortingType.value) {
                case "PriceAsc":
                    return priceA - priceB
                case "PriceDesc":
                    return priceB - priceA
                default:
                    return 0
            }
        })

        return arr
    }

    const returnCategorizedData = (data: any[]) => {
        if(category.category === 0) return allData
        return [...data].filter(item => item.category === category.category)
    }

    const returnRightData = () => {
        let arr =  returnCategorizedData(allData)
        arr = returnSortedData(arr)
        arr = returnSearchedData(arr)
        return arr
    }

    const fetchMoreItems = async () => {
        if(totalPages * 20 < filteredData.length) return
        if(totalPages - 1 !== currentPage) return
        
        await fetchData()
        if (data && typeof data === "object" && data !== null && !Array.isArray(data)) {
            let arr = [...allData, ...data["_embedded"]?.estates]
            setAllData(arr)
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

    if (isFirstLoad && isLoading) {
        return <Loader />
    }

    return (
        <main>
            <EstateFiltering setSortingType={setSortingType} setCategory={setCategory} setSearchTerm={setSearchTerm} handlePreviousPage={handlePreviousPage} currentPage={currentPage} handleNextPage={handleNextPage} />
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
    )
}

export default Estates