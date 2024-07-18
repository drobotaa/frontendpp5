import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import styles from '../styles/NavBar.module.css'
import logo from '../assets/logo_resized.png'

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <Navbar.Brand>
                    <img src={logo} alt='logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link >Home <i className='fa-solid fa-house'></i></Nav.Link>
                        <Nav.Link>Sign In <i className='fa-solid fa-right-to-bracket'></i></Nav.Link>
                        <Nav.Link>Sign Up <i className='fa-solid fa-user-plus'></i></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar