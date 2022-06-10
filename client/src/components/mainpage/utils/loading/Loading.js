import React from 'react'
import './Loading.css'

function Loading() {
    return (
        <>
            <div className='loading'>
                {/* <div style={{ color: "red" }}>12313</div> */}
                <div style={{ "--value": "1" }}></div>
                <div style={{ "--value": "2" }}></div>
                <div style={{ "--value": "3" }}></div>
                <div style={{ "--value": "4" }}></div>
                <div style={{ "--value": "5" }}></div>
                <div style={{ "--value": "6" }}></div>
                <div style={{ "--value": "7" }}></div>
                <div style={{ "--value": "8" }}></div>
                <div style={{ "--value": "9" }}></div>
                <div style={{ "--value": "10" }}></div>
            </div>
        </>
    )
}

export default Loading