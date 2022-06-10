import React, { useContext, useEffect, useState } from 'react'
import './CreateProduct.css'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ',
    content: 'content',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories, setCategories] = state.categoriesAPI.categories
    const [products, setProducts] = state.productAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [token] = state.token
    const [isEdit, setIsEdit] = useState(false)
    const [callBack, setCallBack] = state.productAPI.callback

    const history = useHistory()
    const params = useParams()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    useEffect(() => {
        if (params.id) {
            setIsEdit(true)
            products.forEach(product => {
                if (product._id === params.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        } else {
            setIsEdit(false)
            setProduct(initialState)
            setImages(false)

        }
    }, [params.id, products])

    // Upload image
    const handleUpload = async (e) => {
        e.preventDefault()

        try {
            //Validate
            if (!isAdmin) return alert(" You are not Admin!")
            const file = e.target.files[0]
            console.log("file", e.target.files[0]);
            if (!file) return alert("File is not exits!")
            if (file.size > 1024 * 1024) return alert(" Size file is too large!")
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert(" File format is incorrect!")

            //syntax Submit for img
            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'context-type': 'multipart/formData', Authorization: token }
            })
            setLoading(false)
            console.log("img upload", res);
            setImages(res.data)

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    // Delete image
    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert(" You are not admin!")
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    // Add product
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert(" You are not Admin!")
            if (!images) return alert(" No images to upload")

            if (isEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                    headers: { Authorization: token }

                })

            } else {
                await axios.post('/api/products', { ...product, images }, {
                    headers: { Authorization: token }
                })
            }
            setImages(false)
            setProduct(initialState)
            setCallBack(!callBack)
            history.push('/')
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <>
            <h2 className='title-form'>Form update</h2>
            <div className='create_product'>
                <div className='upload'>
                    <input type='file' name='file' id='file_up' onChange={(e) => handleUpload(e)} />
                    {
                        loading ? <div id='loading-img'>
                            <Loading />
                        </div> :
                            <div id='file_img' style={styleUpload}>
                                <img src={images ? images.url : ''} />
                                <span onClick={() => handleDestroy()}>X</span>
                            </div>
                    }
                </div>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>
                        <label className='product_id'>Product ID</label>
                        <input type='text' name='product_id' id='product_id' required value={product.product_id} onChange={handleChangeInput} disabled={product._id} />
                    </div>
                    <div className='row'>
                        <label className='title'>Title</label>
                        <input type='text' name='title' id='product_id' required value={product.title} onChange={handleChangeInput} />
                    </div>
                    <div className='row'>
                        <label className='price'>Price</label>
                        <input type='text' name='price' id='price' required value={product.price} onChange={handleChangeInput} />
                    </div>
                    <div className='row'>
                        <label className='description'>Description</label>
                        <input type='text' name='description' id='description' required value={product.description} onChange={handleChangeInput} />
                    </div>
                    <div className="row">
                        <label htmlFor="content">Content</label>
                        <textarea type="text" name="content" id="content" required
                            value={product.content} onChange={handleChangeInput} />
                    </div>
                    <div className="row">
                        <label htmlFor="categories">Categories: </label>
                        <select name="category" value={product.category} onChange={handleChangeInput} >
                            <option value="">Please select a category</option>
                            {
                                categories.map(category => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <button type='submit'>{isEdit ? "Update" : "Create"}</button>
                </form>
            </div>
        </>
    )
}

export default CreateProduct