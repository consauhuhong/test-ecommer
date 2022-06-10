import React, { useContext, useState } from 'react'
import './ProductItem.css'
import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'

function ProductItem({ product, isAdmin, token, callBack, setCallBack, setProducts, deleteProduct, handleCheck }) {

    return (
        <>
            <div className='product-card'>
                {
                    isAdmin && <input type='checkbox' checked={product.checked} onChange={() => handleCheck(product._id)} />
                }
                <div className='product-img'>
                    {
                        isAdmin ?
                            <Link to="#"><img src={product.images.url} alt={product.title} /></Link>
                            :
                            <Link to={`/detail/${product._id}`}><img src={product.images.url} alt={product.title} /></Link>
                    }
                </div>
                <div className='product-box'>
                    <h2>{product.title}</h2>
                    <span>${product.price}</span>
                    <p>{product.description.substring(0, 60)}</p>
                </div>
                <BtnRender product={product} deleteProduct={deleteProduct} />
            </div>
        </>
    )
}

export default ProductItem