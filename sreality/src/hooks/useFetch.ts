import { useEffect, useState } from "react";

const useFetch = (link: string) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState<unknown>(null)

    const fetchData =  async () => {
        setIsLoading(true)
        try{
            let linkWithProxy = `https://corsproxy.io/?url=${link}`
            let res = await fetch(linkWithProxy)
            let data = await res.json()
            setData(data)
        } catch(err){
            setErr(err)
            console.log(err)
            alert(link)
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return { data, isLoading, err }
      

}


export default useFetch
