import React, { useState, useContext, useEffect, useCallback } from 'react'
import { GlobalState } from '../../GlobalState'
import './Header.css'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BsSun, BsFillCloudMoonFill } from 'react-icons/bs'
import { MdFlipCameraAndroid } from 'react-icons/md'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIslogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    // console.log("state ", state);
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [theme, setTheme, toggleTheme] = state.theme

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
            setShow(false);
        } else { // if scroll up show the navbar
            setShow(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        // cleanup function
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY])

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.clear()
        setIsAdmin(false)
        setIslogged(false)
        window.location.href = '/'
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={() => logoutUser()}>Logout</Link></li>
            </>
        )
    }

    return (
        <header className={`headerContainer ${show && 'hideHeader'} ${theme}`} >

            {
                theme === "lightTheme" ?
                    <BsSun className='icon-theme' onClick={toggleTheme}>change</BsSun>
                    :
                    <BsFillCloudMoonFill className='icon-theme' onClick={toggleTheme}>change</BsFillCloudMoonFill>
            }
            {/* <BsSun onClick={() => toggleTheme()}>change</BsSun> */}
            <div className='logo'>
                <div className='icon-logo'>
                    <Link to="/">{isAdmin ? "Admin" : (<><img className='img-logo' src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo-design-template-d2226d4ec9e25417f6f245221cf4aaaa_screen.jpg?ts=1599472291' /></>)}</Link>
                </div>
            </div>
            <ul>
                <li><Link to="/">{isAdmin ? "Products" : "Meal"}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login <MdFlipCameraAndroid /> register</Link></li>
                }
            </ul>
            {
                isAdmin ? "" :
                    <div className='cart-icon'>
                        <span>{cart.length}</span>
                        <Link to="/cart"><FaShoppingCart className='cart' /></Link>
                    </div>
            }
        </header>
    )
}

export default Header