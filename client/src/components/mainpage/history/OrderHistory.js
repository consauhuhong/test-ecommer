import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import './OrderHistory.css'
import Loading from '../utils/loading/Loading'
import axios from 'axios'


function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callBack, setCallBack] = state.userAPI.callBack


    // Admin history
    useEffect(() => {
        if (token) {
            const getPayment = async () => {
                const res = await axios.get('api/payment', {
                    headers: { Authorization: token }
                })
                console.log("all payment", res.data);
                setHistory(res.data)
            }
            setCallBack(!callBack)
            getPayment()
        }
    }, [token, setCallBack, callBack])

    return (
        <>
            {
                isAdmin ? (<>
                    <div className='history-page'>
                        <h2>Admin</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Date of purchased</th>
                                    <th>Payment ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    history.map((item) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{item.paymentID}</td>
                                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                                <td><Link to={`/history/${item._id}`}>View</Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </>) : (
                    <div className='history-page'>
                        <h2>Your Order</h2>
                        <h4>You have {history.length} orders</h4>

                        <table>
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Date of purchased</th>
                                    <th>Payment ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    history.map((item) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{item.paymentID}</td>
                                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                                <td><Link to={`/history/${item._id}`}>View</Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            {
                history.length === 0 && <Loading />
            }
        </>
    )
}

export default OrderHistory