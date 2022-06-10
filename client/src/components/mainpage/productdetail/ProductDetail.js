import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import './ProductDetail.css'
import ProductItem from '../utils/productitem/ProductItem'

function ProductDetail() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const [readMore, setReadMore] = useState(false)
    const addCart = state.userAPI.addCart

    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params, products])

    if (detailProduct.length === 0) return null;
    return (
        <>
            <div className='detail-container'>
                <div className='detail-img'>
                    <img src={detailProduct.images.url} alt={detailProduct.title} />
                </div>
                <div className='detail-box'>
                    <div className='detail-title'>
                        <h2>{detailProduct.title}</h2>
                        {/* <h6>{detailProduct.product_id}</h6> */}
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{
                        readMore ? detailProduct.description : `${detailProduct.description.substring(0, 100)}`
                    }
                        <button className='btn-read' onClick={() => setReadMore(!readMore)}>{readMore ? "Show less" : "Read more..."}</button>
                    </p>

                    <p>Sold: {detailProduct.sold}</p>
                    <div className='btn-cart'>
                        <Link className='buycart' to='#' onClick={() => addCart(detailProduct)} >Buy now</Link>
                    </div>
                </div>
            </div>
            <div className='product-related-container'>
                <h2>Related Meal</h2>
                <div className='cart-related-container'>
                    {
                        products.map(product => {
                            return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProductDetail