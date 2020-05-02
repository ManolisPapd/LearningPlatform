import React, { Component } from 'react';
import {NavLink,Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import {Navbar, Nav} from 'react-bootstrap';
import logo from '../../images/logo.png';
import './MainNavigation.css'

class MainNavigation extends Component {
  state = {}

  handleHome = () => {
    //This will be activated when the user is in a course and wants to go to homepage
    if(localStorage.getItem('courseState') === '1'){
      localStorage.setItem('courseState', 0);
      
    }
  }

  render (){
      return(
          <AuthContext.Consumer>
          {(context) => {
              return (

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                  <div id="parentLogo" onClick={this.handleHome}>
                    <Link style={{textDecoration: 'none', color: 'rgb(255, 255, 255)' }} className="homeButton" to="/homepage">
                      <img className="logo" src={logo}/>
                      Learning Platform
                    </Link>
                  </div>
                  
                  
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                  <NavLink activeStyle={{borderBottom: '5px solid white'}} className="navItem" to="/homepage" style={{ textDecoration: 'none' }}><i className="fa fa-book"></i></NavLink>
                  <NavLink activeStyle={{borderBottom: '5px solid white'}} className="navItem" to="/profile" style={{ textDecoration: 'none' }}><i className="fa fa-user"></i></NavLink>
                
                              
                  </Nav>
                  <Nav>
                  <Nav.Link onClick={context.logout}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
                </Navbar>
                  
              
              )
          }}
          </AuthContext.Consumer>
        
      )
    
  }

}
export default MainNavigation;