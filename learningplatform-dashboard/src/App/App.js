import React, { Component, lazy, Suspense } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from '../components/Login/Login'
// import Homepage from '../components/Homepage/Homepage'
import MainNavigation from '../components/Navigation/MainNavigation';
import Profile from '../components/Profile/Profile';
import AuthContext from '../context/auth-context';
import ChatBot from 'react-simple-chatbot';
import ScrollUp from '../context/scrollUp';
import upArrow from '../images/up-arrow.png';


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
    localStorage.setItem('finalModal',false);

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
    localStorage.removeItem('finalQuizzesOrder');
    localStorage.removeItem('finalModal');
    
  }

  render (){
    const scrollCompStyle = {
      position: 'fixed',
      bottom: 100,
      right: 20,
      cursor: 'pointer',
      transitionDuration: '0.5s',
      transitionTimingFunction: 'linear',
      transitionDelay: '0s'
    }

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

        <ChatBot
              floating = {true}
              headerTitle = "Learning Platform Helper"
              hideSubmitButton = {true}
              placeholder = "Choose an option"
              steps={[
                {
                  id: '1',
                  message: 'Welcome to Learning Platform! How can I help you?',
                  trigger: '3',
                },
                {
                  id: '2',
                  message: 'Anything else?',
                  trigger: '3',
                },
                {
                  id: '3',
                  options: [
                    { value: 1, label: 'Login to the platform', trigger: '4' },
                    { value: 2, label: 'Access a course ', trigger: '5' }
                  ],
                },
                
                {
                  id: '4',
                  message: 'asdasdasdasd.',
                  trigger: '2',
                },
                {
                  id: '5',
                  message: 'bbbbbbbbbbbbbbbb',
                  trigger: '2',
                },
              ]}
            />

          <ScrollUp showUnder={160} style={scrollCompStyle}>
            <span><img src={upArrow} className="materialImage" alt="Cinque Terre" width="80" height="80"/><br/></span>
            
          </ScrollUp>

          
        
      </BrowserRouter>
      

    )
    


  }
    
}

export default App;
