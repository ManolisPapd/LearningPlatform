import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import '../context/loader';


import './Login.css'

class Login extends Component {

    state = {
      loading : false
    }


    static contextType = AuthContext;

    constructor(props) {
      super(props);
      this.emailEl = React.createRef();
      this.passwordEl = React.createRef();
    }

    //read email and password and send it to the back
    submitHandler = (event) => {
      this.setState({loading : true});
      event.preventDefault(); //prevent requests from being sent
      const email = this.emailEl.current.value;
      const password = this.passwordEl.current.value;

      //TODO better validation
      if(email.trim().length === 0 || password.trim().length === 0){
        return;
      }


      let requestBody = {
          query: `
          query {
            login(email : "${email}", password : "${password}"){
              id
              token
              tokenExpiration
            }
          }
          `
      };

      //request to the backend
      fetch('http://localhost:8080/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.status !== 200 && res.status !== 201){
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if(resData.data.login.token){
          this.context.login(
            resData.data.login.token, 
            resData.data.login.id, 
            resData.data.login.tokenExpiration
            )
        }
      })
      .catch(err => {
        console.log(err);
      });

    };

    render (){
  
      return(
        <React.Fragment>

       
          <hgroup>
            <h1>Learning Platform</h1>
          </hgroup>


          <form onSubmit={this.submitHandler}>
            <div className="group">
              <input type="email" id="email" ref={this.emailEl}></input><span class="highlight"></span><span class="bar"></span>
              <label htmlFor="email">e-mail</label>
            </div>
            <div class="group">
              <input type="password" id="password" ref={this.passwordEl}></input><span class="highlight"></span><span class="bar"></span>
              <label htmlFor="password">password</label>
            </div>
            <button type="submit" class="button buttonBlue">
              Sign In
              <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
            </button>
          </form>

          <footer><a href="https://github.com/mpapd/LearningPlatform" target="_blank"><img src="https://i.imgur.com/4Ly6cGy.png"/></a>
            <p>MSc of Computer Science and Technology <a href="http://msc-cse.ice.uniwa.gr/" target="_blank">University of West Attica</a></p>
          </footer>

          {/* <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-control">
                
              <label htmlFor="email">e-mail</label>
              <input type="email" id="email" ref={this.emailEl} />

            </div>
            <div className="form-control">
                
              <label htmlFor="password">password</label>
              <input type="password" id="password" ref={this.passwordEl}  />
              
            </div>

            <div className="form-actions">
              <button type="submit">Login</button>
            </div>

          </form> */}
  
        </React.Fragment>
        
  
      )
      
  
  
    }
      
  }

export default Login;