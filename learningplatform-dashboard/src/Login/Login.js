import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import './Login.css'

class Login extends Component {

    static contextType = AuthContext;

    constructor(props) {
      super(props);
      this.emailEl = React.createRef();
      this.passwordEl = React.createRef();
    }

    //read email and password and send it to the back
    submitHandler = (event) => {
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

        <form className="auth-form" onSubmit={this.submitHandler}>
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

        </form>
  
        
  
      )
      
  
  
    }
      
  }

export default Login;