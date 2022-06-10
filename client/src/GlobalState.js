import React, { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import axios from "axios";


export const GlobalState = createContext()

const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    const [theme, setTheme] = useState('lightTheme')
    const toggleTheme = () => {
        setTheme(theme === 'darkTheme' ? 'lightTheme' : 'darkTheme')
        console.log("thme");
    }
    const state = {
        token: [token, setToken],
        productAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        theme: [theme, setTheme, toggleTheme]
    }


    const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')
        console.log("token user", res.data)
        setToken(res.data.accesstoken)
    }
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) refreshToken()
    }, [])



    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
export default DataProvider