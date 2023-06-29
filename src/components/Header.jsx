import {Link, NavLink} from  "react-router-dom"
import {AiFillHome, AiFillInfoCircle} from "react-icons/ai"
import {AiFillApple} from 'react-icons/ai'

const Header = () => {
  return (
    <header>
        <Link to="/" className="logo">
            <h3><AiFillApple/>UTS REACT</h3>
        </Link>
        <nav>
            <NavLink to="/"><AiFillHome/> Beranda</NavLink>
            <NavLink to="/about"><AiFillInfoCircle/> Tentang</NavLink>
        </nav>
    </header>
  )
}

export default Header
