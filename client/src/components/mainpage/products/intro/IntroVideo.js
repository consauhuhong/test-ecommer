import React, { useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { VscUnmute, VscMute } from 'react-icons/vsc'

function IntroVideo() {
    const [mute, setMute] = useState(true)
    return (
        <IntroContainer>
            <div className='descriptionVideo'>
                <h2>raspberry cheesecake brownies</h2>
                <p>Chewy, chocalatety cocoa bwonies tukced under a super-rich raspberry cheesecake layer.
                    you, from the bottom of my heart, for letting me be a small part of your day.
                    I love reading your comments, your emails, your tweets, your messages… everything. </p>
            </div>
            <div className='introVideo'>
                <ReactPlayer
                    playing={true}
                    width="100%"
                    height="100%"
                    muted={mute}
                    volume={1}
                    url='https://vimeo.com/394792463'
                    loop={true}
                />
                {
                    mute ? <VscMute className='muteVideo' onClick={() => setMute(!mute)} /> : <VscUnmute className='muteVideo' onClick={() => setMute(!mute)} />
                }
            </div>
        </IntroContainer>
    )
}

export default IntroVideo

const IntroContainer = styled.div`
    padding: 10px 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 24px 0px, rgba(242, 242, 242, 0.8) 0px 0px 0px 1px;
    padding: 10px 20px;
    overflow: hidden;


    .introVideo{
        width: 70%;
        height: 100%;
        border-radius: 40px;
        user-select: none;
        position: relative;

        .muteVideo{
            position: absolute;
            right: 10%;
            top: 50%;
            z-index: 2;
            color: white;
            font-size: 35px;
            cursor: pointer;
        }
    }

    .descriptionVideo{
        width: 30%;
        height: 100%;
        margin: 30px 20px;
        overflow: hidden;
        h2{
            text-transform: capitalize;
            font-size: 35px;
        }
        p{
            font-size: 17px;
        }
    }
`