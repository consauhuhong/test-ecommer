import React, { useContext } from 'react'
import { GlobalState } from '../../../../GlobalState'
import styled from 'styled-components'


function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productAPI.page
    const [result, setResult] = state.productAPI.result

    return (
        <LoadPath>
            {
                result < page * 8 ? '' :
                    <button onClick={() => setPage(page + 1)}>Load More</button>
            }
        </LoadPath>
    )
}

export default LoadMore

const LoadPath = styled.div`
    text-align: center;
    margin-bottom: 20px;
    
    button{
        width:120px;
        height: 40px;
        border-radius: 5px;
        font-size: 20px;
        transition: all 0.2s linear;
        background: #009245;
        color: white;

        &:hover{
            transform: translateY(-5px);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
    }
`