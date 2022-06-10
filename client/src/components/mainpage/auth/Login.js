import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })

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
                        <h2>Login Form</h2>
                        <input
                            className='input-login'
                            type="email"
                            name='email'
                            required
                            placeholder='Email'
                            value={user.email}
                            onChange={(e) => handleOnChange(e)}
                        />

                        <div className='input-password'>
                            <input
                                className='input-login'
                                type={showPassword ? "text" : "password"}
                                name='password'
                                required
                                placeholder='Password'
                                value={user.password}
                                onChange={(e) => handleOnChange(e)}
                            />
                            {
                                showPassword ?
                                    <AiOutlineEye className='showPassword' onClick={() => setShowPassword(!showPassword)} />
                                    :
                                    <AiOutlineEyeInvisible className='showPassword' onClick={() => setShowPassword(!showPassword)} />
                            }
                        </div>

                        <div className='login-buttom'>
                            <button type='submit' className='btn-login'>Login</button>
                            <button className='btn-register'><Link to='register' className='link-register' >Register</Link></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login