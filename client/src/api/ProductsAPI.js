import React, { useState, useEffect } from 'react'
import axios from 'axios'


function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page * 8}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
            console.log("ressss", res);
        }
        getProducts()
    }, [callBack, category, page, sort, search])
    return {
        products: [products, setProducts],
        callback: [callBack, setCallBack],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        category: [category, setCategory]
    }
}

export default ProductsAPI