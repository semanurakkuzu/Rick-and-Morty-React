import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setLocation } from '../redux/locationSlice'
import { clearCharacters, clearFilterCharacters } from '../redux/charactersSlice'
import type { Location } from '../types/Location'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import Nav from './Nav'

export default function Locations() {
  const locationApi = useAppSelector((state) => state.location.locationData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearCharacters())
    dispatch(clearFilterCharacters())

    fetch(`https://rickandmortyapi.com/api/location?page=2`)
      .then((response) => response.json())
      .then((actualData) => {
        dispatch(setLocation(actualData))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const fetchComments = async (currentPage: number) => {
    const res = await fetch(`https://rickandmortyapi.com/api/location?page=${currentPage}`)
    const data = await res.json()
    return data
  }

  const handlePageClick = async (data: { selected: number }) => {
    console.log(data.selected)
    let currentPage: number
    currentPage = data.selected + 1

    const commentsFormServer = await fetchComments(currentPage)
    dispatch(setLocation(commentsFormServer))
  }

  return (
    <>
      <Nav></Nav>
      <div className='container-fluid m-sm-15 m-md-46'>
        <div className='container__row'>
          {locationApi?.results?.map((location: Location, i) => (
            <div key={i} className='container__col-sm-12 container__col-md-4 mb-20'>
              <Link to={`/location/${location.id}`} className='link'>
                <div className='location-card'>
                  <h1>{location.name}</h1>
                  <div className='content mt-15'>
                    <h3 className='text-light'>Type</h3>
                    <h3>: {location.type === 'unknown' ? '-' : location.type}</h3>
                  </div>
                  <div className='content mt-5'>
                    <h3 className='text-light'>Dimension</h3>
                    <h3>: {location.dimension === 'unknown' ? '-' : location.dimension}</h3>
                  </div>
                  <div className='content mt-5'>
                    <h3 className='text-light'>Residents count</h3>
                    <h3>: {location.residents.length}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='pagination-container'>
        <ReactPaginate
          pageCount={locationApi ? locationApi.info.pages : 1}
          previousLabel={'<'}
          nextLabel={'>'}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          pageClassName={'pagination-item'}
          containerClassName={'pagination'}
          pageLinkClassName={'pagination-link'}
          previousClassName={'pagination-item'}
          previousLinkClassName={'pagination-link'}
          nextClassName={'pagination-item'}
          nextLinkClassName={'pagination-link'}
          breakClassName={'pagination-item'}
          breakLinkClassName={'pagination-link'}
          activeClassName={'active'}
        />
      </div>
    </>
  )
}
