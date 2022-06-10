import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

function Register() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/user/register', { ...user })

            localStorage.setItem("firstLogin", true)

            window.location.href = '/'
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <>
            <div>empty</div>
            <div id='login-container-all'>
                <div className='login-container'>
                    <form onSubmit={(e) => handleSubmit(e)} className='form-container'>
                        <h2>Register Form</h2>

                        <input
                            className='input-login'
                            type="text"
                            name='name'
                            required
                            placeholder='Name'
                            value={user.name}
                            onChange={(e) => handleOnChange(e)}
                        />
                        <input
                            className='input-login'
                            type="email"
                            name='email'
                            required
                            placeholder='Email'
                            value={user.email}
                            onChange={(e) => handleOnChange(e)}
                        />

                        <input
                            className='input-login'
                            type="password"
                            name='password'
                            required
                            placeholder='Password'
                            value={user.password}
                            onChange={(e) => handleOnChange(e)}
                        />

                        <div className='login-buttom'>
                            <button className='btn-login'><Link to='login' className='link-register' >Login</Link></button>
                            <button type='submit' className='btn-register'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register