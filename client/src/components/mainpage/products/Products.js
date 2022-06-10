import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productitem/ProductItem'
import './Products.css'
import Slider from './slider/Slider'
import Loading from '../utils/loading/Loading'
import IntroVideo from './intro/IntroVideo'
import Footer from '../../footer/Footer'
import axios from 'axios'
import Filter from './filter/Filter'
import LoadMore from './loadmore/LoadMore'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import { animateScroll as scroll } from 'react-scroll'


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callBack, setCallBack] = state.productAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [theme] = state.theme
    const [scrollY, setScrollY] = useState(0)




    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true)
            await axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            })
            await axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setCallBack(!callBack)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const handleDeleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) {
                product.checked = !product.checked
            }
        })
        setProducts([...products])
    }
    const handleCheckAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        }
        )
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const controlNavbar = () => {
        if (window.scrollY > scrollY) {
            setScrollY(window.scrollY)
        } else if (window.scrollY < 600) {
            setScrollY(600)
        }

    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        // cleanup function
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [scrollY])

    const scrollToTop = () => {
        scroll.scrollToTop()
    }

    if (loading) return <div className='Loading'><Loading /></div>

    return (
        <>

            {
                isAdmin ? null : <Slider />
            }
            {
                isAdmin ? <div className='detele-all'>
                    <span>Selecte All</span>
                    <input type='checkbox' check={isCheck} onChange={() => handleCheckAll()} />
                    <button className='btn-delete-all' onClick={() => handleDeleteAll()}>Detele All</button>
                </div> : null
            }
            <Filter />
            <h1 className='title-menu'>Our Menu</h1>
            <div className={`products ${theme}`}>
                {/* <div className='products'> */}
                {
                    products && products.length > 0 && products.map(product => {
                        return (
                            <ProductItem key={product._id}
                                product={product}
                                isAdmin={isAdmin}
                                token={token}
                                callBack={callBack}
                                setCallBack={setCallBack}
                                setProducts={setProducts}
                                deleteProduct={deleteProduct}
                                handleCheck={handleCheck}
                            />
                        )
                    })
                }
            </div>
            <LoadMore />
            {
                isAdmin ? null : <IntroVideo />
            }
            {
                isAdmin ? null : <Footer />
            }

            <BsFillArrowUpCircleFill className='arrowTop' onClick={() => scrollToTop()} style={{ visibility: `${scrollY > 600 ? 'visible' : 'hidden'}` }} />

            {products.length || <Filter /> === 0 && <Loading />}
        </>
    )
}

export default Products