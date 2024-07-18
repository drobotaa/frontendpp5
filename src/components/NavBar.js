import React, { useContext } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import styles from '../styles/NavBar.module.css'
import logo from '../assets/logo_resized.png'
import { NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../App'

const NavBar = () => {
    const currentUser = useContext(CurrentUserContext);
    const loggedInIcons = (
    <>
    {currentUser?.username}
    </>
    )
    const loggedOutIcons = (
    <>
        <NavLink
            activeClassName={styles.Active}
            className={styles.NavLink} to="/signin">
            Sign In <i className='fa-solid fa-right-to-bracket'></i>
        </NavLink>
        <NavLink
            activeClassName={styles.Active}
            className={styles.NavLink}
            to='/signup'
        >
            Sign Up <i className='fa-solid fa-user-plus'></i>
        </NavLink>
    </>
    )


    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt='logo' />
                    </Navbar.Brand></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink
                            exact
                            activeClassName={styles.Active}
                            className={styles.NavLink} to="/">
                            Home <i className='fa-solid fa-house'></i></NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar