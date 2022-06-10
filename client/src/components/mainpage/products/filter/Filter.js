import React, { useContext } from 'react'
import { GlobalState } from '../../../../GlobalState'
import './Filter.css'
import styled from 'styled-components'
import { BsSearch } from 'react-icons/bs'

function Filter() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productAPI.category
    const [sort, setSort] = state.productAPI.sort
    const [search, setSearch] = state.productAPI.search


    const handleCategory = (e) => {
        setCategory(e.target.value)
        // setSearch('')
    }


    return (
        <FilterPath className='filter-menu'>
            <div className='row'>
                <span>Filter: </span>
                <SelectedPath name='category' value={category} onChange={(e) => handleCategory(e)}>
                    <option value=''>All products</option>
                    {
                        categories.map((category, index) => {
                            return (
                                <option value={"category=" + category._id} key={index}>{category.name}</option>
                            )
                        })
                    }
                </SelectedPath>
            </div>
            {/* <SearchPath type='text' placeholder='Enter your search!' onChange={(e) => setSearch(e.target.value.toLowerCase())} /> */}
            <div className='navSearch'>
                <span>Search</span>
                <BsSearch className='iconSearch' />
                <input type='text' placeholder='Text the title to search' value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} />
            </div>
            <div className='row'>
                <span>Sort by: </span>
                <SelectedPath name='sort' value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-price'>Hight Price</option>
                    <option value='sort=price'>Low Price</option>

                </SelectedPath>
            </div>
        </FilterPath>
    )
}

export default Filter

const SelectedPath = styled.select`
    width: 120px;
    height: 30px;
    border: 0.1px solid #6fa699;
    border-radius: 5px;
    cursor: pointer;

    option{
        width: 120px;
        height: 30px;
        font-size: 13px;
        text-transform: capitalize;
        border-radius: 5px;
        cursor: pointer;
    }
`

const FilterPath = styled.div`
    .navSearch{
            color:white;
            padding-right:20px;
            display:flex;
            justify-content: flex-end;
            span{
                margin-top:5px;
                font-size: 20px;
                color: black;
            }
            &:hover .iconSearch{
                cursor: pointer;
            }

            .iconSearch{
                width:20px;
                height:20px;
                cursor:pointer;
                transform: translateX(23px) translateY(10px);
                color:black;
                user-select: none;
                line-height: 20px;
                user-select: none;
            }

            input{
                font-size:14px;
                color:black;
                width:0;
                padding:10px;
                cursor:pointer;
                opacity:0;
                background:white;
                transition: width 0.5s;
                padding-left: 20px;
                border: 1px solid #6fa699;

                &:focus{
                    padding-left:27px;
                    width:300px;
                    cursor:text;
                    opacity:1;
                    border-radius:5px;
                    color:black;
                    outline:none;
                }
            }
            
        }
`