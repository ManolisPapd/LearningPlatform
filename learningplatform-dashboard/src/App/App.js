import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from '../Login/Login'
import Homepage from '../Homepage/Homepage'
import MainNavigation from '../components/Navigation/MainNavigation';
import AuthContext from '../context/auth-context';
import './App.css';

class App extends Component {


  state = {
    token: null,
    id: null
  }

  login = (token, id, tokenExpiration) =>{
    this.setState({token: token, id: id});
    localStorage.setItem('userId', JSON.stringify(id));
    localStorage.setItem('token', JSON.stringify(token));
  }

  logout = () => {
    this.setState({token: null, id: null})
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  render (){

    return(

      <BrowserRouter>
        <AuthContext.Provider 
        value={{ 
          token: this.state.token, 
          id: this.state.id, 
          login: this.login, 
          logout: this.logout}}>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              
              { (this.state.token || localStorage.getItem('token')) &&  <Redirect from="/" to ="/homepage" exact />}
              {(this.state.token || localStorage.getItem('token')) &&  <Redirect from="/auth" to ="/homepage" exact />}
              {(!this.state.token || !localStorage.getItem('token')) &&  <Route path="/auth" component={Login} />}
              {(this.state.token || localStorage.getItem('token')) &&  <Route path="/homepage" component={Homepage} />}
              {/* Order is important! You should place this last */}
              {(!this.state.token || !localStorage.getItem('token')) && <Redirect to ="/auth" exact />}

            </Switch>
          </main>
        </AuthContext.Provider>
        
      </BrowserRouter>
      

    )
    


  }
    
}

export default App;
