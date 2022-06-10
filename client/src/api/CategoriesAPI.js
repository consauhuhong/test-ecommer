import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callBack, setCallBack] = useState(false)

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('api/category')
            console.log("category", res.data);
            setCategories(res.data)
        }
        getCategories()
    }, [callBack])
    return {
        categories: [categories, setCategories],
        callBack: [callBack, setCallBack]
    }
}

export default CategoriesAPI