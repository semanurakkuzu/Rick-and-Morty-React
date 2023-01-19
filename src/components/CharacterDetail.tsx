import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setCharacter } from '../redux/characterDetailSlice'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Nav from './Nav'
import { Character } from '../types/Character'

export default function CharacterDetails() {
  let { id } = useParams()
  const character = useAppSelector((state) => state.characterDetail.character)
  const characters = useAppSelector((state) => state.characters.charactersData)

  const dispatch = useAppDispatch()

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((actualData) => {
        dispatch(setCharacter(actualData))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  return (
    <>
      <Nav backUrl={`/location/${id}`}></Nav>
      <div className='container-fluid m-sm-15 m-md-46'>
        <div className='container__row'>
          <div className='container__col-sm-12 container__col-md-4'>
            <div>
              <div
                className='character-detail-card-img bg-image'
                style={{ backgroundImage: `url(${character?.image || <Skeleton count={1} />})` }}
              ></div>
              <div className='ml-md-0 ml-sm-10'>
                <h1 className='mt-10 mb-10'>{character?.name}</h1>
                <div className='container__row justify-between'>
                  <div className='col-6'>
                    {character?.status === 'Dead' && (
                      <h3 className='mb-5 text-circle-red'>
                        <span>{character?.status}</span> - <span>{character?.species}</span>
                      </h3>
                    )}
                    {character?.status === 'Alive' && (
                      <h3 className='mb-5 text-circle-green'>
                        <span>{character?.status}</span> - <span>{character?.species}</span>
                      </h3>
                    )}
                    {character?.status === 'unknown' && (
                      <h3 className='mb-5 text-circle-gray'>
                        <span>{character?.status}</span> - <span>{character?.species}</span>
                      </h3>
                    )}
                  </div>
                  <div className='col-6'>
                    <h3 className='text-color-light-gray text-light font-italic pr-20'>
                      <span>{character?.origin.name}</span> - <span>{character?.gender}</span>
                    </h3>
                  </div>
                </div>
                <h3 className='mt-5 mb-10 text-light'>{character?.location.name}</h3>
              </div>
            </div>
          </div>
          <div className='container__col-sm-12 container__col-md-7'>
            <div>
              <h1 className='ml-10 mb-10'>Other Characters</h1>
            </div>
            <div className='container__row'>
              {characters
                ?.filter(
                  (otherCharacter: Character) =>
                    otherCharacter?.status === character?.status && otherCharacter.id !== character.id
                )
                ?.map((otherCharacter: Character) => (
                  <div className='container__col-sm-12 container__col-md-5 ml-0'>
                    <div className='container__row mb-10'>
                      <div className='container__col-md-2'>
                        <div
                          className='other-character-card-img bg-image'
                          style={{
                            backgroundImage: `url(${otherCharacter.image || <Skeleton count={1} />})`
                          }}
                        ></div>
                      </div>
                      <div className='container__col-md-6'>
                        <h2 className='mt-20 mb-20'>{otherCharacter.name}</h2>
                        <h4 className='mb-10'>{otherCharacter.location.name}</h4>
                        <h4 className='text-color-light-gray text-color-light font-italic pr-10'>
                          <span>{otherCharacter.species}</span> - <span>{otherCharacter.gender}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
