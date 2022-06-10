import React, { useEffect, useState } from 'react'
import { data } from './SliderData'
import { BiRightArrowCircle, BiLeftArrowCircle } from 'react-icons/bi'
import './Slider.css'

function Slider() {
    const [current, setCurrent] = useState(0)
    const length = data.length

    const nextSlider = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const preSlider = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    useEffect(() => {
        let slider = setInterval(() => {
            if (current < 3) {
                setCurrent(current === length - 1 ? 0 : current + 1)
            } else if (current === data.length) {
                setCurrent(current === 0 ? length - 1 : current - 1)
            } else {
                setCurrent(current === 0 ? length - 1 : current - 1)
            }
        }, 5000);
        return () => {
            clearInterval(slider);
        };
    }, [current]);

    if (!Array.isArray(data) || data.length <= 0) {
        return null
    }

    return (
        <>
            <section className='slider'>
                <BiLeftArrowCircle className='left-buttom' onClick={() => nextSlider()} />
                <BiRightArrowCircle className='right-buttom' onClick={() => preSlider()} />
                {
                    data.map((slide, index) => {
                        return (
                            <div key={index} className={index === current ? 'slide active' : 'slide'}>
                                {
                                    index === current && (<img src={slide.image} alt="meal" className='image' />)
                                }
                            </div>
                        )
                    })
                }

            </section>
        </>
    )
}

export default Slider