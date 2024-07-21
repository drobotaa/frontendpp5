import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from "react-bootstrap/Navbar"
import Container from 'react-bootstrap/Container'
import styles from '../styles/NavBar.module.css'
import logo from '../assets/logo_resized.png'
import { NavLink } from 'react-router-dom'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import UserAvatar from "../components/UserAvatar"
import axios from 'axios'
import useClickOutside from '../hooks/useClickOutside'
import { removeTokenTimeStamp } from '../utilities.js/utilities'

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutside();

    const handleSignOut = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/')
            setCurrentUser(null);
            removeTokenTimeStamp();
        } catch (err) {
            // console.log(err)
        }
    }


    const addPostIcon = (
        <NavLink
            activeClassName={styles.Active}
            className={styles.NavLink} to="/posts/create">
            Add new Offer<i className='fa-solid fa-cart-plus'></i>
        </NavLink>
    )
    const loggedInIcons = (
        <>
            <NavLink
                activeClassName={styles.Active}
                className={styles.NavLink} to="/feed">
                Offers Feed<i className='fa-solid fa-rss'></i>
            </NavLink>
            <NavLink
                activeClassName={styles.Active}
                className={styles.NavLink} to="/valid">
                Valid Offers<i className='fa-solid fa-check'></i>
            </NavLink>
            <NavLink
                className={styles.NavLink} to="/" onClick={handleSignOut}>
                Sign out<i className='fa-solid fa-right-from-bracket'></i>
            </NavLink>
            <NavLink
                className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
                <UserAvatar src={currentUser?.profile_image} text="Profile" height={38} />
            </NavLink>

        </>
    )
    const loggedOutIcons = (
        <>
            <NavLink
                activeClassName={styles.Active}
                className={styles.NavLink} to="/signin">
                Sign in <i className='fa-solid fa-right-to-bracket'></i>
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
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt='logo' />
                    </Navbar.Brand>
                </NavLink>
                {currentUser && addPostIcon}
                <Navbar.Toggle
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav"
                    ref={ref}
                />
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