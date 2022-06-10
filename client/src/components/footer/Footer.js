import React, { useContext } from 'react'
import styled from 'styled-components'
import { IoMdPaperPlane } from 'react-icons/io'
import { BsFacebook } from 'react-icons/bs'
import { FaTiktok, FaTwitter } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import { GlobalState } from '../../GlobalState'

function Footer() {
    const state = useContext(GlobalState)
    const [theme] = state.theme

    return (
        <FooterConainer className={`${theme}`} >
            <FooterTop >
                <div>
                    <h1>Get with the brew times</h1>
                </div>
                <div className='from-Input'>
                    <IoMdPaperPlane className='iconPlane' />
                    <input
                        className='input'
                        type='email'
                        name='email'
                        required
                        placeholder='Put your email address here'
                    />
                    <button className='btn-signUp'>Sign Up</button>
                </div>
            </FooterTop>
            <h1>About Us</h1>
            <FooterTBottom>
                <BsFacebook className='icon' />
                <FaTiktok className='icon' />
                <AiFillInstagram className='icon' />
                <FaTwitter className='icon' />
            </FooterTBottom>
            <p>Copyright © 2015-2022 Wholesome Yum®. Registered trademark.

                Wholesome Yum is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, I earn from qualifying purchases.

                By using this website, you agree to the Terms Of Use and Privacy Policy.</p>
        </FooterConainer >
    )
}

export default Footer

const FooterConainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 600px;
    overflow: hidden;

    h1{
        text-align: center;
        font-size: 50px;
    }

    p{
        text-align: center;
    }
`
const FooterTop = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50%;
    border-bottom: 1px solid white;

    @media only screen and (max-width: 820px) {
    flex-direction: column;
  }

    .from-Input{
        width: 50%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        .iconPlane{
            font-size: 60px;
        }
        .input{
            width: 40%;
            height: 100%;
            border-radius: 15px;
            outline: none;
            border: 0.1px solid white;
            margin: 0 20px;
            padding-left: 20px;
            border: 0.1px solid black;
        }
        .btn-signUp{
            width: 20%;
            height: 100%;
            border: 0.2px solid white;
            border-radius: 15px;
            font-size: 20px;
            font-weight: 600;
            transition: all 0.2s linear;
            border: 0.1px solid black;

            &:hover{
                transform: translateY(-5px);
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
        }
    }
`
const FooterTBottom = styled.div`
    width: 40%;
    height: 50px;
    text-align: center;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
   
   .icon{
        font-size: 40px;
        cursor: pointer;
        transition: all 0.3s linear;
        &:hover{
            transform: scale(1.3);
            color: blue;
        }
   }
   
`