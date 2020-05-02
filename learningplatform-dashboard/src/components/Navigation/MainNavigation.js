import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import {Navbar, Nav} from 'react-bootstrap';


import './MainNavigation.css'

const mainNavigation = props => {
  const activeItem = {

    background: '#ffffff',
    borderRadius: '5px',
    color: 'rgb(0, 0, 0)',
    padding: '10px'
    }

  const homeButton = {
    textDecoration: 'none',
    color: 'rgb(255, 255, 255)'
  }
    return (
        <AuthContext.Consumer>
            {(context) => {
                return (

                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>
                        <Link style={homeButton} to="/homepage">
                          Learning Platform
                        </Link>
                        
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="mr-auto">
                        <NavLink  className="navItem" to="/homepage" style={{ textDecoration: 'none' }}>My Courses</NavLink>
                        <NavLink activeStyle={activeItem} className="navItem" to="/profile" style={{ textDecoration: 'none' }}>Profile</NavLink>

                                                
                      </Nav>
                      <Nav>
                        <Nav.Link onClick={context.logout}>Logout</Nav.Link>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                    
                
                )
            }}
        </AuthContext.Consumer>
        

    );
}

export default mainNavigation;