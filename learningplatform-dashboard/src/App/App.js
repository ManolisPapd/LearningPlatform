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
                    { value: 2, label: 'Access a course', trigger: '5' },
                    { value: 3, label: 'Profile Page', trigger: '6' },
                    { value: 4, label: 'Start Learning', trigger: '7' },
                    { value: 5, label: 'Quiz Section', trigger: '8' },
                    { value: 6, label: 'Final Quiz', trigger: '9' },
                    { value: 7, label: 'Statistics', trigger: '10' }
                  ],
                },
                
                {
                  id: '4',
                  message: 'To access the platform you need to login with your email and password.',
                  trigger: '2',
                },
                {
                  id: '5',
                  message: 'On homepage you will find all the courses, click the one you want to access to.',
                  trigger: '2',
                },
                {
                  id: '6',
                  message: 'You can access your profile page by clicking the profile icon on top. You can also write comments.',
                  trigger: '2',
                },
                {
                  id: '7',
                  message: 'You can see on course main page all the sections available. You can click one of them to start reading.',
                  trigger: '2',
                },
                {
                  id: '8',
                  message: 'You can test your knowledge on each section by taking the quiz for each one. It consists of 5 quizzes, multiple choice and coding tests. ',
                  trigger: '2',
                },
                {
                  id: '9',
                  message: 'When you have finished studying all the sections, you can test your skills and take the Final Quiz. It consists of quizzes from all sections. If you fail a section, next time you will receive extra questions about this specific section and also you can study again the section you have failed. ',
                  trigger: '2',
                },
                {
                  id: '10',
                  message: 'You can view all the statistics for the quizzes you have taken on "Statistics" section. ',
                  trigger: '2',
                }
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
