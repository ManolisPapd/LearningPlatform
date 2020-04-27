import React from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './MainNavigation.css'

const mainNavigation = props => {
    return (
        <AuthContext.Consumer>
            {(context) => {
                return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>Learning Platform</h1>
                    </div>

                    <nav className="main-navigation__items">
                        <ul>
                            {(!context.token && !localStorage.getItem('token')) && (
                                <li><NavLink to="/auth">Authenticate</NavLink></li>
                            )}
                            {(context.token || localStorage.getItem('token')) && (
                                <React.Fragment>
                                    <li><NavLink to="/homepage">Homepage</NavLink></li>
                                    <li>
                                        <button onClick={context.logout}>Logout</button>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </nav>
        
                </header>
                )
            }}
        </AuthContext.Consumer>
        

    );
}

export default mainNavigation;