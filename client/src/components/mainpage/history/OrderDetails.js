import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { useParams } from 'react-router-dom'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) {
                    setOrderDetails(item)
                }
            })
        }
    }, [params.id, history])
    console.log("detail order", orderDetails);
    if (orderDetails.length === 0) return null
    return (
        <div className='history-page'>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal cost</th>
                        <th>Country cost</th>
                    </tr>
                </thead>
                <tbody>
                    <td>{orderDetails.address.recipient_name}</td>
                    <td>{orderDetails.address.city}</td>
                    <td>{orderDetails.address.postal_code}</td>
                    <td>{orderDetails.address.country_code}</td>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Meal</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart && orderDetails.cart.length > 0 && orderDetails.cart.map(item => (
                            <>
                                <tr key={item._id}>
                                    <td><img src={item.images.url} alt="" /></td>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price * item.quantity}</td>
                                </tr>
                            </>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails