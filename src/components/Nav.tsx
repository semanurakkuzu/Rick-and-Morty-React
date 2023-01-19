import logo from '../img/logo.svg'
import arrowBtn from '../img/arrowBtn.svg'
import { Link } from 'react-router-dom'

interface url {
  backUrl?: string
}

export default function Nav(props: url) {
  return (
    <div className='nav'>
      {props.backUrl && (
        <Link to={props.backUrl}>
          <div className='arrow-icon'>
            <img src={arrowBtn} alt='back'></img>
          </div>
        </Link>
      )}
      <Link to='/'>
        <img className='logo' src={logo} alt='rickandmorty'></img>
      </Link>
    </div>
  )
}
