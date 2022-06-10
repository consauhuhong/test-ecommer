import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'


function BtnRender({ product, deleteProduct }) {
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart
    return (
        <div className='btn-box'>
            {
                isAdmin ?
                    <>
                        <Link id="btn-buy" to="#" onClick={() => deleteProduct(product._id, product.images.public_id)} >
                            Delete
                        </Link>
                        <Link id="btn-view" to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </>
                    :
                    <>

                        <Link id="btn-buy" to="#" onClick={() => addCart(product)} >
                            <MdOutlineShoppingBag className='buy-icon' />
                            <span>Buy</span>
                        </Link>
                        <Link id="btn-view" to={`/detail/${product._id}`}>
                            <AiOutlineEye className='view-icon' />
                            &nbsp;
                            <span> View</span>
                        </Link>
                    </>
            }
        </div>
    )
}

export default BtnRender