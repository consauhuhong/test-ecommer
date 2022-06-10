import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIslogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [callBack, setCallBack] = useState(false)


    // Role, infor user
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })
                    setIslogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.cart)
                    console.log("infor user", res);
                } catch (error) {
                    alert(error.response.msg)
                }
            }
            getUser()
        }
    }, [token])

    // History Order
    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                const res = await axios.get('user/history', {
                    headers: { Authorization: token }
                })
                console.log("history", res.data);
                setHistory(res.data)
            }
            getHistory()
        }
    }, [token, callBack])

    // Cart
    const addCart = async (product) => {
        if (!isLogged) return alert("Please login before buying !")


        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])
            await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
        } else {
            alert("This meal has been added to cart.")
        }
    }
    return {
        isLogged: [isLogged, setIslogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        callBack: [callBack, setCallBack]
    }
}

export default UserAPI