import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import './Cart.css'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0)
    const [token] = state.token


    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])

    useEffect(() => {
        const addToCart = async () => {
            await axios.patch('/user/addcart', { cart }, {
                headers: { Authorization: token }
            })
        }
        addToCart(cart)
    }, [cart])

    const increProduct = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity += 1
            }
        })
        setCart([...cart])
    }
    const decreProduct = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
    }
    const removeProduct = (id) => {
        const newCart = cart.filter(item => item._id !== id)
        setCart([...newCart])
    }


    const tranSuccess = async (payment) => {
        const { paymentID, address } = payment;

        await axios.post('/api/payment', { cart, paymentID, address }, {
            headers: { Authorization: token }
        })

        setCart([])
        // addToCart([])
        alert("You have successfully placed an order.")
    }

    // veritfy call api qua paypal

    if (cart.length === 0) {
        return (
            <h2 className='empty-cart'> Cart is Empty</h2>
        )
    }
    return (
        <>
            {
                cart.map(product => (
                    <div className='cart-container'>
                        <div className='cart-img'>
                            <img src={product.images.url} alt={product.title} />
                        </div>
                        <div className='cart-box'>
                            <div className='cart-title'>
                                <h2>{product.title}</h2>
                                {/* <h6>{product.product_id}</h6> */}
                            </div>
                            <span>$ {product.price * product.quantity}</span>
                            <p>{product.description}</p>
                            <p>Sold: {product.sold}</p>
                            <div className='mount'>
                                <button className='btn-incre' onClick={() => decreProduct(product._id)}>-</button>
                                <span>{product.quantity}</span>
                                <button className='btn-degree' onClick={() => increProduct(product._id)}>+</button>
                            </div>
                            <div className='btn-cart'>
                                <button className='buycart' onClick={() => removeProduct(product._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
                )
            }
            <div className='total'>
                <h3>Total: $ {total}</h3>
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess}
                />
            </div>
        </>
    )
}

export default Cart