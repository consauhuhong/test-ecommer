import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import './Categories.css'
import axios from 'axios'

function Categories() {
    const state = useContext(GlobalState)
    const [categories, setCategories] = state.categoriesAPI.categories
    const [category, setCategory] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const [token] = state.token
    const [callBack, setCallBack] = state.categoriesAPI.callBack
    const [id, setId] = useState('')
    const [isEdit, setIsEdit] = useState(false)


    const editCategory = (id, name) => {
        setId(id)
        setCategory(name)
        setIsEdit(true)
    }
    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: { Authorization: token }
            })
            setCallBack(!callBack)
            alert(res.data.msg)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    const createCategory = async (e) => {
        e.preventDefault()
        try {
            if (isEdit) {
                const res = await axios.put(`/api/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })
                setCallBack(!callBack)
                setIsEdit(false)
                setCategory('')
                alert(res.data.msg)
            } else {
                const res = await axios.post('/api/category', { name: category }, {
                    headers: { Authorization: token }
                })
                setCallBack(!callBack)
                setCategory('')
                alert(res.data.msg)
                console.log("new category", res);
            }

        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <>
            <div className="categories">
                <form onSubmit={createCategory}>
                    <label htmlFor="category">Category</label>
                    <div className='form-input'>
                        <input
                            type="text"
                            name="category"
                            value={category}
                            required
                            placeholder='Create a new category!'
                            onChange={e => setCategory(e.target.value)} />

                        <button className='btn-create' type="submit">{isEdit ? "Update" : "Create"}</button>
                    </div>
                </form>

                <div className="col">
                    {
                        categories.map(category => (
                            <div className="row" key={category._id}>
                                <p>{category.name}</p>
                                <div>
                                    <button className='btn-create' onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                    <button className='btn-create' onClick={() => deleteCategory(category._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Categories