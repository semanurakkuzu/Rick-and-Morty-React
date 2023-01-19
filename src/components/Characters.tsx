import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setCharacters, setFilterCharacters } from '../redux/charactersSlice'
import type { Character } from '../types/Character'
import { Link, useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Nav from './Nav'

export default function Characters() {
  let { id } = useParams()

  const charactersData = useAppSelector((state) => state.characters.charactersData)
  const filterCharactersData = useAppSelector((state) => state.characters.filterCharacters)

  const dispatch = useAppDispatch()

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
      .then((response) => response.json())
      .then((actualData) => {
        let characterIds = actualData.residents.map((residentUrl: String) => {
          return residentUrl.split('/').pop()
        })

        if (characterIds.length > 0) {
          fetch(`https://rickandmortyapi.com/api/character/${characterIds.join(',')}`)
            .then((response) => response.json())
            .then((characters) => {
              dispatch(setCharacters(characterIds.length === 1 ? [{ ...characters }] : characters))
              dispatch(setFilterCharacters(characterIds.length === 1 ? [{ ...characters }] : characters))
            })
            .catch((err) => {
              console.log(err.message)
            })
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  function filterCharacters(status: String) {
    const filteredCharacters = charactersData?.filter((character) => character.status === status)
    dispatch(setFilterCharacters(filteredCharacters))
  }

  return (
    <>
      <Nav backUrl='/'></Nav>
      <div className='m-sm-15 m-md-46'>
        <h3 className='ml-10 mb-10'>Filter by status:</h3>
        <div>
          <div className='overflow-scroll w-100 ml-10'>
            <button className='btn btn-dead' onClick={() => filterCharacters('Dead')}>
              Dead
            </button>
            <button className='btn btn-alive ml-10' onClick={() => filterCharacters('Alive')}>
              Alive
            </button>
            <button className='btn btn-unknown ml-10' onClick={() => filterCharacters('unknown')}>
              Unknown
            </button>
          </div>

          <div className='md-col-sm-scroll mt-md-46 mt-sm-10'>
            {filterCharactersData?.map((character: Character, i) => (
              <Link to={`/character/${character.id}`} className='link' key={i}>
                <div
                  className='characters-card-img bg-image'
                  style={{ backgroundImage: `url(${character.image || <Skeleton count={1} />})` }}
                ></div>
                <div className='ml-md-0 ml-sm-10'>
                  <h1 className='mt-10 mb-5 truncate'>{character.name}</h1>
                  {character.status === 'Alive' && (
                    <h3 className='text-circle-green mb-50'>
                      <span>{character.status}</span> -<span>{character.species}</span>
                    </h3>
                  )}
                  {character.status === 'Dead' && (
                    <h3 className='text-circle-red mb-50'>
                      <span>{character.status}</span> -<span>{character.species}</span>
                    </h3>
                  )}
                  {character.status === 'unknown' && (
                    <h3 className='text-circle-gray mb-50'>
                      <span>{character.status.charAt(0).toUpperCase() + character.status.slice(1)}</span>-
                      <span>{character.species}</span>
                    </h3>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
