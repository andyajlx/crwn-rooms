import { Outlet } from "react-router-dom"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
const Navbar = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link class="logo-container" to="/">
                    <CrwnLogo className='logo'/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    <Link className="nav-link" to="/auth">
                        Sign In
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navbar