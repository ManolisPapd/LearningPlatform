import React, { Component, lazy, Suspense } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from '../components/Login/Login'
// import Homepage from '../components/Homepage/Homepage'
import MainNavigation from '../components/Navigation/MainNavigation';
import Profile from '../components/Profile/Profile';
import AuthContext from '../context/auth-context';

import './App.css';

// const Homepage = lazy(() => import('../components/Homepage/Homepage'));
const Homepage = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('../components/Homepage/Homepage')), 1000);
  });
});

class App extends Component {
  state = {
    token: null,
    id: null
  }

  componentDidUpdate = () => {
    window.location.reload();
  }


  login = (token, id, tokenExpiration) =>{
    this.setState({token: token, id: id});
    localStorage.setItem('userId', id);
    localStorage.setItem('token', token);
    localStorage.setItem('courseState',0);

    if(JSON.parse(localStorage.getItem('answeredQuizzes')) === null){
      var quizzesInit = {};
      localStorage.setItem('answeredQuizzes',JSON.stringify(quizzesInit));
    }
    

  }

  logout = () => {
    this.setState({token: null, id: null})
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('courseState');
    
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
          {(this.state.token || localStorage.getItem('token')) && <MainNavigation />}
          <main className="main-content">
            <Switch>
              
              {(this.state.token || localStorage.getItem('token')) &&  <Redirect from="/" to ="/homepage" exact />}
              {(this.state.token || localStorage.getItem('token')) &&  <Redirect from="/auth" to ="/homepage" exact />}
              {(!this.state.token || !localStorage.getItem('token')) &&  <Route exact path="/auth" component={Login} />}
              {(this.state.token || localStorage.getItem('token')) &&  <Route exact path="/profile" component={Profile} />}
              {(this.state.token || localStorage.getItem('token')) && 
              
                <Suspense fallback={<div className="loader">Loading...</div>}>
                    <Route path="/homepage" component={Homepage} />
                </Suspense>
                    
              }
              
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
